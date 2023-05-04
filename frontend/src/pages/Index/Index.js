import { useState, useEffect, useContext } from "react";
import { csrftoken } from "../../utils";

import AuthContext from "../../context/AuthContext";

import styles from "./Index.module.css";

import Post from "../../components/Post/Post";
import { useOutletContext, useSearchParams } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [postMsg, setPostMsg] = useState("");
  const [sending, setSending] = useState(false);
  const { api } = useContext(AuthContext);
  const [pageInfo, setPageInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const outletContext = useOutletContext();
  const [pfdata, setPfdata] = useState({
    username: outletContext?.username || "",
    pfp: outletContext?.pfp || "",
  });

  const [selected, setSelected] = useState("all");
  const currpage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const loadPosts = () => {
    api(
      "api/post/?page=" +
        currpage +
        (selected === "following" ? "&following=true" : ""),
      (res) => {
        console.log(res.results);
        setPageInfo({
          total: res.count,
          next: res.next,
          prev: res.previous,
        });
        setPosts(res.results);
      }
    );
  };

  const select = (e, param) => {
    e.target.parentElement
      .querySelectorAll("li")
      .forEach((p) => p.classList.remove("selected"));
    e.target.classList.add("selected");
    setPage(1);
    setSelected(param);
  };

  const createPost = (e) => {
    e.preventDefault();
    setSending(true);
    api(
      "api/post/",
      (res) => {
        console.log(res);
        setPostMsg("");
        setPosts([res, ...posts]);
        setSending(false);
      },
      () => {
        setSending(false);
      },
      {
        method: "POST",
        body: JSON.stringify({ body: postMsg }),
        ctype: "application/json",
      }
    );
  };

  useEffect(() => {
    loadPosts();
  }, [searchParams, selected]);

  const textAreaChanged = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";

    if (textarea.scrollHeight <= 150) {
      textarea.style.height = textarea.scrollHeight + "px";
    } else {
      textarea.style.height = "150px";
    }
  };

  const setPage = (page) => {
    setSearchParams({ page });
  };

  return (
    <>
      <div className={styles["index-header"]}>
        <h2>Home</h2>
        <ul className="choicer">
          <li
            onClick={(e) => {
              select(e, "all");
            }}
            className="selected"
          >
            All posts
          </li>
          <li
            onClick={(e) => {
              select(e, "following");
            }}
          >
            Following
          </li>
        </ul>
      </div>
      <div className={styles["input-container"]}>
        <div className={styles["img-container"]}>
          <img
            alt="pfp"
            src={pfdata.pfp}
            onError={(e) =>
              (e.target.src =
                process.env.PUBLIC_URL + "/images/placeholder-face.png")
            }
          />
        </div>
        <form id="post-form" onSubmit={createPost}>
          <textarea
            id={styles["text-inp"]}
            wrap="hard"
            maxLength="280"
            rows="2"
            placeholder="What are you thinking?"
            value={postMsg}
            onChange={(e) => {
              textAreaChanged(e);
              setPostMsg(e.target.value);
            }}
          ></textarea>
          <div className={styles["extras"]}>
            <input
              disabled={sending}
              className="button primary"
              type="submit"
              value="Post"
            />
          </div>
        </form>
      </div>

      <div className={styles["posts-container"]}>
        {posts?.map((post, i) => (
          <Post
            key={i}
            pid={post.id}
            creator={{
              ...post.creator,
              me: post.creator.username === pfdata.username,
            }}
            body={post.body}
            likes={post.like_count}
            isLiked={post.is_liked}
          />
        )) ?? null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {pageInfo["prev"] && (
          <button
            className="button primary"
            style={{ margin: "10px 10px" }}
            onClick={() => {
              setPage(currpage - 1);
            }}
          >
            Previous
          </button>
        )}
        {pageInfo["next"] && (
          <button
            className="button primary"
            style={{ margin: "10px 10px" }}
            onClick={() => {
              setPage(currpage + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Index;
