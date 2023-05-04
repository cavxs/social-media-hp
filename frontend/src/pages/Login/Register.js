import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

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
    <div>
      <form
        id="registrationform"
        onSubmit={submitForm}
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
