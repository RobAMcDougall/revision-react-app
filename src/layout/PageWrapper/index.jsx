import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../../context/dark-theme context";
import { useAuth } from "../../context/Auth";

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
      <header className="header">
        <h1 className="logo">First Revision</h1>
        <nav>
          <NavLink className="link" to="/HomePage">
            DashBoard
          </NavLink>
          <NavLink className="link" to="VideoTaking">
            Notes
          </NavLink>
          <NavLink className="link" to="#">
            Coming Soon
          </NavLink>
          <NavLink className="link" to="#">
            Coming Soon
          </NavLink>
          <NavLink className="link" to="#">
            Coming Soon
          </NavLink>
          <input
            type="checkbox"
            onClick={handleClick}
            name="checkbox"
            className="switch"
          />
          <NavLink className="link" to="/" onClick={handleLogout}>
            LogOut
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default PageWrapper;
