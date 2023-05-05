import styles from "./Post.module.css";
import Heart from "../svgs/Heart";

import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Edit from "../svgs/Edit";
import { getTimeAgo } from "../../utils";

const TextArea = ({ body, setTextAreaText, textAreaText }) => {
  const textareaRef = useRef(null);
  const textAreaChanged = (e) => {
    const textarea = e;
    textarea.style.height = "auto";

    if (textarea.scrollHeight <= 150) {
      textarea.style.height = textarea.scrollHeight + "px";
    } else {
      textarea.style.height = "150px";
    }
  };

  useEffect(() => {
    setTextAreaText(body);
  }, []);
  useEffect(() => {
    textAreaChanged(textareaRef.current);
  }, [textAreaText]);
  return (
    <textarea
      ref={textareaRef}
      className={styles["textarea"]}
      maxLength={280}
      rows={2}
      wrap="hard"
      onChange={(e) => {
        textAreaChanged(e.target);
        setTextAreaText(e.target.value);
      }}
      value={textAreaText}
    ></textarea>
  );
};

const Post = ({
  pid,
  creator,
  created_at,
  body,
  likes = 0,
  isLiked = false,
}) => {
  const { api } = useContext(AuthContext);
  const [forceLike, setForceLike] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [textAreaText, setTextAreaText] = useState("");
  const [bodyT, setBody] = useState(body);

  const { logged: loggedIn } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    setBody(body);
  }, [body]);

  const like = () => {
    setForceLike(forceLike + 1);
    api(
      "api/post/" + pid + "/like/",
      (res) => {
        console.log(res);
      },
      () => {},
      { method: "POST", body: null }
    );
  };
  const unlike = () => {
    setForceLike(forceLike - 1);
    api(
      "api/post/" + pid + "/unlike/",
      (res) => {
        console.log(res);
      },
      () => {},
      { method: "POST", body: null }
    );
  };

  return (
    <div className={styles["post"]}>
      <div className={styles["post-main"]}>
        <div className={styles["img-container"]}>
          <Link to={"/" + creator?.username} reloadDocument>
            <img
              alt="pfp"
              src={creator.profile_picture ?? ""}
              onError={(e) =>
                (e.target.src =
                  process.env.PUBLIC_URL + "/images/placeholder-face.png")
              }
            />
          </Link>
        </div>
        <div className={styles["post-content"]}>
          <h3 className={styles["post-name"]}>
            <Link to={"/" + creator?.username} reloadDocument>
              {" "}
              {creator.first_name}
              <span>{getTimeAgo(created_at)}</span>
            </Link>
          </h3>
          {editMode ? (
            <TextArea
              body={body}
              setTextAreaText={setTextAreaText}
              textAreaText={textAreaText}
            />
          ) : (
            <p className={styles["post-data"]}>{bodyT}</p>
          )}
        </div>
      </div>
      {!editMode ? (
        <div className={styles["post-options"]}>
          <div className={styles["option"]}>
            <h5
              onClick={() => {
                if (loggedIn) {
                  if (forceLike === 1) {
                    unlike();
                  } else if (forceLike === -1) {
                    like();
                  } else if (forceLike === 0) {
                    if (isLiked) return unlike();
                    like();
                  }
                } else {
                  navigate("/login");
                }
              }}
            >
              <div className={styles["expander"] + " " + styles["heart"]}></div>
              <Heart
                width={"20"}
                height={"20"}
                filled={
                  !(forceLike === 0)
                    ? forceLike === 1
                      ? true
                      : false
                    : isLiked
                }
              />
              <span className={styles["like-count"]}>
                {!(forceLike === 0) ? likes + forceLike : likes}
              </span>
            </h5>
          </div>
          {creator.me && (
            <div className={styles["option"]}>
              <h5 onClick={() => setEditMode(true)}>
                <div className={styles["expander"]}></div>

                <Edit width={"20"} height={"20"} filled={"#ffffff"} />
                {/* <span className={styles["like-count"]}>
              {!(forceLike === 0) ? postData.likes + forceLike : postData.likes}
            </span> */}
              </h5>
            </div>
          )}
        </div>
      ) : (
        <div className={styles["editor"]}>
          <button
            className="button secondary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
          <button
            className="button primary"
            onClick={() => {
              api(
                `api/post/${pid}/`,
                (res) => {
                  console.log(res);
                  setBody(res.body);
                  setEditMode(false);
                },
                undefined,
                {
                  method: "PUT",
                  body: JSON.stringify({ body: textAreaText }),
                  ctype: "application/json",
                }
              );
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
