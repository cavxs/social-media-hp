import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

import styles from "./Auth.module.css";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const formDataChanged = (e) => {
    const newObj = { ...formData };
    newObj[e.target.name] = e.target.value;
    setFormData(newObj);
  };
  const submitForm = (e) => {
    e.preventDefault();
    loginUser(formData.username, formData.password);
  };
  return (
    <div className={styles["auth"]}>
      <form className={styles["authform"]} onSubmit={submitForm}>
        <input
          type="text"
          name="username"
          onChange={formDataChanged}
          value={formData["username"]}
          placeholder="Username"
          autoFocus
        />
        <input
          type="password"
          name="password"
          onChange={formDataChanged}
          value={formData["password"]}
          placeholder="Password"
        />
        {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
        <input
          type="submit"
          style={{ marginTop: 20 }}
          className="button primary"
          value="Login"
        />
        <p>
          Don't have an account?{" "}
          <a style={{ color: "#ee9b6f" }} href="/register">
            Register.
          </a>
        </p>
        {/* </div> */}
      </form>
    </div>
  );
};

export default Login;
