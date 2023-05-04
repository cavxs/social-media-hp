import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { SERVER_ENDPOINT } from "../consts";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const saveTokens = (tokens, accessOnly = false) => {
    setAuthTokens(
      !accessOnly ? tokens : { ...authTokens, access: tokens.access }
    );
    const jwtDecode = jwt_decode(tokens.access);
    setUser(jwtDecode);
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  };
  const loginUser = async (username, password) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      saveTokens(data);
      // request user info from the server
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const registerUser = async (
    username,
    password,
    password2,
    firstname,
    lastname
  ) => {
    const response = await fetch(`${SERVER_ENDPOINT}api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        username,
        password,
        password2,
      }),
    });
    if (response.status === 201) {
      const resJson = await response.json();
      saveTokens({ refresh: resJson.refresh, access: resJson.token });
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const logoutUser = (login = false) => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("uInfo");
    if (login) return navigate("/login");
    navigate("/");
  };

  const refreshToken = async (cb) => {
    console.log("getting refresh");
    const res = await fetch(`${SERVER_ENDPOINT}api/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens["refresh"],
      }),
    });
    try {
      if (res.status === 401) logoutUser();
      const resJson = await res.json();
      console.log(resJson);
      if (resJson?.code === "token_not_valid") logoutUser(true); // logout
      console.log(resJson);
      saveTokens(resJson, true);
      return cb(resJson["access"]);
    } catch (err) {
      console.error(err);
      logoutUser(true);
    }
  };
  const api = async (
    url,
    cb,
    err,
    params = { method: "GET", body: undefined, ctype: undefined }
  ) => {
    const func = async (retryTk = null) => {
      const headers = new Headers();

      if (authTokens?.access) {
        headers.set(
          "Authorization",
          `Bearer ${!retryTk ? authTokens["access"] : retryTk}`
        );
      }

      if (params?.ctype) headers.set("Content-Type", params.ctype);

      console.log(headers);
      if (retryTk) console.log("retrying with ", retryTk);
      const res = await fetch(`${SERVER_ENDPOINT}${url}`, {
        method: params.method,
        headers: headers,
        body: params.body,
      });

      if (res.status === 404) {
        return err(404);
      } else if (res.status === 401) {
        const resJson = await res.json();
        if (resJson.code === "token_not_valid") {
          // get a new token from the refresh token
          return await refreshToken(func);
        }
      } else {
        return await res.json();
      }
    };

    const res = await func();
    cb(res);
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    api,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
