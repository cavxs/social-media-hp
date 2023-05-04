import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

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
    <div>
      <form onSubmit={submitForm}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
