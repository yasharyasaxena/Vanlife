import {
  NavLink,
  Link,
  Outlet,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getHostVans } from "../../api";
import requireAuth from "../../utils";
import { Suspense } from "react";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ currentVan: getHostVans(params.id) });
}

export default function HostVanDetail() {
  const activestyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  const currentVanPromise = useLoaderData();

  function renderCurrentVan(currentVan) {
    return (
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            style={({ isActive }) => (isActive ? activestyles : null)}
            to="."
            end
          >
            Details
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activestyles : null)}
            to="pricing"
          >
            Pricing
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activestyles : null)}
            to="photos"
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    );
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h2>Loading van details</h2>}>
        <Await resolve={currentVanPromise.currentVan}>{renderCurrentVan}</Await>
      </Suspense>
    </section>
  );
}
