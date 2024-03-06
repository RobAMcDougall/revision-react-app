import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setUser(username);
    navigate("/HomePage");
  }
  // try {
  //   const response = await axios.post('/api/register', formData);
  //   console.log('Registration successful', response.data);
  //   navigate('/LoginPage');
  // } catch (error) {
  //   console.error('Registration failed', error);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          autoComplete="off"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
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
