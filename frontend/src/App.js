import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index/Index";
import Profile from "./pages/Profile/Profile";
import Navigation from "./components/Navigation";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<Navigation />}>
          <Route path=":username" element={<Profile />} />
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
