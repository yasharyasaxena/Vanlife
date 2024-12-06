import { Link, NavLink } from "react-router-dom";

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
        </nav>
      </header>
    </>
  );
}
