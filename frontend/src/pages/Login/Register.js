import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

import styles from "./Auth.module.css";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
  });
  const formDataChanged = (e) => {
    const newObj = { ...formData };
    newObj[e.target.name] = e.target.value;
    setFormData(newObj);
  };
  const submitForm = (e) => {
    e.preventDefault();
    registerUser(
      formData.username,
      formData.password,
      formData.password2,
      formData.first_name,
      formData.last_name
    );
  };
  return (
    <div className={styles["auth"]}>
      <form
        onSubmit={submitForm}
        className={styles["authform"]}
        // style={{
        //   display: "flex",
        //   width: "100%",
        //   height: "100%",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
      >
        <input
          type="text"
          name="first_name"
          onChange={formDataChanged}
          value={formData["first_name"]}
          placeholder="First name"
          autoFocus
        />
        <input
          type="text"
          name="last_name"
          onChange={formDataChanged}
          value={formData["last_name"]}
          placeholder="Last name"
        />
        <input
          type="text"
          name="username"
          onChange={formDataChanged}
          value={formData["username"]}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          onChange={formDataChanged}
          value={formData["password"]}
          placeholder="Password"
        />
        <input
          type="password"
          name="password2"
          onChange={formDataChanged}
          value={formData["password2"]}
          placeholder="Password Again"
        />
        <input type="submit" className="button primary" value="Register" />
        <p>
          Already have an account?{" "}
          <a style={{ color: "#ee9b6f" }} href="/login">
            Login.
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
