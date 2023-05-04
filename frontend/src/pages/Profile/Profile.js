import styles from "./Profile.module.css";
import Pen from "../../components/svgs/Pen";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useLocation, useOutletContext, useParams } from "react-router-dom";

import Post from "../../components/Post/Post";

const Profile = () => {
  const { api } = useContext(AuthContext);
  const { username } = useParams();

  const { username: myUsername, pfp: myPfp } = useOutletContext();

  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState("posts");
  const [isMe, setIsMe] = useState(false);

  const loadPosts = () => {
    api(
      "api/post/?page=1&user=" +
        username +
        (selected === "likes" ? "&likes=true" : ""),
      (res) => {
        console.log(res);
        setPosts(res.results);
      }
    );
  };
  useEffect(() => {
    api("api/user/?username=" + username, (res) => {
      console.log(res);
      setProfileData(res);
    });
    // get the profile data
    loadPosts();
  }, [selected]);

  useEffect(() => {
    setIsMe(myUsername === username);
  }, []);
  const select = (e, param) => {
    e.target.parentElement
      .querySelectorAll("li")
      .forEach((p) => p.classList.remove("selected"));
    e.target.classList.add("selected");
    // setPage(1);
    setSelected(param);
  };
  return (
    <div className={styles["container"]}>
      <div className={styles["profile-info-section"]}>
        <div className={styles["header"]}>
          <img className={styles["profile-banner"]} src="" />
          <button className={styles["p-btn"]}>
            <Pen color={"#ddd"} width="25" height="25" />
          </button>
        </div>
        <div className={styles["p-info-sct"]}>
          <div
            className={styles["pfp-container"]}
            onClick={() => {
              if (isMe) {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = (e) => {
                  var file = e.target.files[0];
                  const formData = new FormData();
                  formData.append("pfp", file);

                  api(
                    `/api/user/pfp/`,
                    (res) => {
                      console.log("saved:");
                      console.log(res);
                    },
                    undefined,
                    {
                      method: "PUT",
                      body: formData,
                      ctype: "multipart/form-data",
                    }
                  );
                };
                input.click();
              }
            }}
          >
            <img
              className={styles["pfp"]}
              src={profileData && profileData?.profile_picture}
              onError={(e) =>
                (e.target.src =
                  process.env.PUBLIC_URL + "/images/placeholder-face.png")
              }
            />
            {isMe ? <Pen color="#555" width="100" height="100" /> : null}
          </div>
          <h2>
            {profileData && profileData["first_name"]}{" "}
            {profileData && profileData["last_name"]}
          </h2>
          <p className={styles["p-username"]}>
            @{profileData && profileData["username"]}
          </p>
          <p className={styles["bio"]}>Bio</p>
          <div className={styles["p-ff-sct"]}>
            <h5>
              <span>{profileData && profileData["followers_count"]}</span>{" "}
              Followers
            </h5>
            <h5>
              <span>{profileData && profileData?.following?.length}</span>{" "}
              Following
            </h5>
            <h5>
              <span>{profileData && profileData?.posts_count}</span> Posts
            </h5>
          </div>
        </div>
        <div className={styles["follow-buttons-container"]}>
          <button
            className={profileData?.is_following ? styles["unfollow"] : null}
            onClick={(e) => {
              e.target.classList.toggle("unfollow");
              api(
                "api/user/relation/",
                (res) => {
                  console.log(res);
                  setProfileData(res);
                },
                undefined,
                {
                  method: "PUT",
                  body: JSON.stringify({ username: profileData?.username }),
                  ctype: "application/json",
                }
              );
            }}
          >
            {profileData?.is_following ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className={styles["tweets-container"]}>
          <div>
            <ul className="choicer">
              <li
                onClick={(e) => {
                  select(e, "posts");
                }}
                className="selected"
              >
                Posts
              </li>
              <li
                onClick={(e) => {
                  select(e, "likes");
                }}
              >
                Likes
              </li>
            </ul>
          </div>
          <div style={{ width: "100%" }}>
            {posts &&
              posts.map((post, i) => (
                <Post
                  key={i}
                  pid={post.id}
                  creator={post.creator}
                  pfp={post.profile_picture}
                  body={post.body}
                  likes={post.like_count}
                  isLiked={post.is_liked}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={styles["following-section"]}></div>
    </div>
  );
};

export default Profile;
