import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

import "./login.css";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { username, password } = formData;

    const predefinedUsername = "demdemo";
    const predefinedPassword = "demo123456789";

    if (username === predefinedUsername && password === predefinedPassword) {
      setUser(username);
      navigate("/HomePage");
    } else {
      console.error("Invalid credentials");
    }
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <Link to="/">
          <h1 className="logo-name">First Revision</h1>
        </Link>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="off"
          className="login-input"
        />
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
          className="login-input"
        />
        <br />
        <button type="submit" className="login-button">
          Login
        </button>
        <Link to={"/register"} className="register-link">
          <button className="register-button">Register Now</button>
        </Link>
        <div className="demo-account">
          <p className="para-login">Demo Account:</p>
          <p className="para-login"> Username: demdemo</p>
          <p className="para-login">Password: demo123456789</p>
        </div>
      </form>
    </div>
  );
}
