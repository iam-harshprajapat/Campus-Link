import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../Services/API";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  //api/auth/login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/admin/adminpanel");
  }, []);
  const handleLogin = async () => {
    if (email && password) {
      const response = await API.post("/auth/login", { email, password });
      if (response.data.success === false) {
        return toast.error("Invalid username or password");
      }
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin/adminpanel");
      }
    } else {
      return toast.error("Please enter all the fields");
    }
  };
  return (
    <>
      <div className="a-container">
        <div className="a-box">
          <input
            type="text"
            className="a-input"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="a-input"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="a-btn">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
