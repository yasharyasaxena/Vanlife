import { Link, NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const activestyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <>
      <nav className="host-nav">
        <NavLink
          style={({ isActive }) => (isActive ? activestyles : null)}
          end
          to="."
        >
          Dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activestyles : null)}
          to="income"
        >
          Income
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activestyles : null)}
          to="vans"
        >
          Vans
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activestyles : null)}
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
