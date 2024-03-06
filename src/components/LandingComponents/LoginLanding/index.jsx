import "./Login.css";
import { Link } from "react-router-dom";
function LoginLanding() {
  return (
    <>
      <div className="Join">
        <h2>Would you like to Join us?</h2>
        <Link to="/register">
          <button className="landing">register</button>
        </Link>
        <Link to="/login">
          <button className="landing">Login</button>
        </Link>
      </div>
    </>
  );
}

export default LoginLanding;
