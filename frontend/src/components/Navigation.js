import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const tc = (t) => {
  try {
    return t();
  } catch {
    return null;
  }
};

const Navigation = () => {
  const { logoutUser, api, user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(
    tc(() => JSON.parse(localStorage.getItem("uInfo"))) || {
      username: "",
      pfp: "",
    }
  );

  console.log(userInfo);
  useEffect(() => {
    if (user) {
      api(`api/user/${user["user_id"]}/`, (res) => {
        const d = { username: res.username, pfp: res.profile_picture };
        setUserInfo(d);
        localStorage.setItem("uInfo", JSON.stringify(d));
      });
    }
  }, []);

  return (
    <>
      <nav>
        <div className="nav-contents">
          <Link className="navbar-brand" to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/orange.png"}
              style={{ width: 50 }}
            />
          </Link>

          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <a className="nav-link" href="/" onClick={logoutUser}>
                    Log Out
                  </a>
                ) : (
                  <a className="nav-link" href="/login">
                    Log In
                  </a>
                )}
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/login">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to={userInfo.username} className="nav-link">
                  <strong>{user ? "@" + userInfo.username : null}</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="body">
        <Outlet context={userInfo} />
      </div>
    </>
  );
};
export default Navigation;
