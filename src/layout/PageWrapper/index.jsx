import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../../context/dark-theme context";

function PageWrapper() {
  const theme = useTheme();
  const handleClick = () => {
    toggleTheme(theme);
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
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default PageWrapper;
