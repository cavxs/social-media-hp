const Post = ({ creator, body, likes }) => {
  return (
    <div class="post">
      <div class="post-main">
        <div class="img-container">
          <img alt="pfp" src="" />
        </div>
        <div class="post-content">
          <h3 class="post-name">{creator.username}</h3>
          <p class="post-data">{body}</p>
        </div>
      </div>
      <div class="liking">
        <h5>
          <span class="like-count">{likes}</span> - Like
        </h5>
      </div>
    </div>
  );
};

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [postMsg, setPostMsg] = useState("");
  const onclick = () => {
    fetch("/following")
      .then((res) => res.json())
      .then((res) => {
        // load the posts received
        console.log(res.posts);
        setPosts(res.posts);
      });
  };

  const createPost = (e) => {
    e.preventDefault();
    fetch("/newpost", {
      method: "post",
      headers: {
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ post_txt: postMsg }),
    }).then((res) => {
      if (res.status === 200) {
        // make the new post
        res.json().then((res) => {
          setPosts([res.post, ...posts]);
        });
      }
    });
  };
  return (
    <div>
      <div class="index-header">
        <h2>Home</h2>
        <a id="following" class="nav-link" onClick={onclick}>
          Following
        </a>
        <a id="following" class="nav-link" onClick={onclick}>
          All posts
        </a>
      </div>
      <div class="input-container">
        <div class="img-container">
          <img alt="pfp" src="" />
        </div>
        <form id="post-form" onSubmit={createPost}>
          <textarea
            id="text-inp"
            wrap="hard"
            maxlength="280"
            rows="2"
            placeholder="What are you thinking?"
            value={postMsg}
            onChange={(e) => setPostMsg(e.target.value)}
          ></textarea>
          <div class="extras">
            <input id="submit-btn" type="submit" value="Post" />
          </div>
        </form>
      </div>

      <div class="posts-container">
        {posts.map((post) => (
          <Post creator={post.creator} body={post.body} likes={0} />
        ))}
      </div>
    </div>
  );
};

window.require.Index = Index;
