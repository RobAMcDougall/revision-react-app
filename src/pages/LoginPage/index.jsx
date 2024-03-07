import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import axios from "axios";

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
    try {
      await axios.post('http://localhost:8080/account/login', formData);
      setUser(formData.username);
      navigate("/HomePage");
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="off"
        />
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>
        <button>Register Now</button>
      </Link>
      <p>Demo Account:</p>
    </>
  );
}
