import { Link, NavLink } from "react-router-dom";
import imgUrl from "/src/assets/images/avatar-icon.png";

export default function Header() {
  return (
    <>
      <header>
        <Link className="site-logo" to="/">
          #Vanlife
        </Link>
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : "")}
            to="/host"
          >
            Host
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : "")}
            to="/vans"
          >
            Vans
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : "")}
            to="/about"
          >
            About
          </NavLink>
          <Link to="login" className="login-link">
            <img src={imgUrl} className="login-icon" />
          </Link>
        </nav>
      </header>
    </>
  );
}
