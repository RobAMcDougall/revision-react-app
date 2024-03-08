import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../../context/dark-theme context";
import { useAuth } from "../../context/Auth";
import "./wrapper.css";

function PageWrapper() {
  const { toggleTheme } = useTheme();
  const { logout } = useAuth;
  const handleClick = () => {
    toggleTheme();
  };
  const handleLogout = () => {
    logout();
    // eslint-disable-next-line no-undef
    navigate("/");
  };
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <NavLink to="/">
            <img className="logo" src="/First Revision (2).svg" />
          </NavLink>
          <NavLink to="/">
            <h1 className="logo-name">First Revision</h1>
          </NavLink>
        </div>
        <nav className="navLink">
          <NavLink className="link" to="/HomePage">
            DashBoard
          </NavLink>
          <NavLink className="link" to="VideoTaking">
            Notes
          </NavLink>
          <NavLink className="link" to="#">
            Coming Soon
          </NavLink>

          <NavLink className="link" to="/" onClick={handleLogout}>
            LogOut
          </NavLink>

          <input
            type="checkbox"
            onClick={handleClick}
            name="checkbox"
            className="switch"
          />
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default PageWrapper;
