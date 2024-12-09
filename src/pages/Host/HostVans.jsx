import { defer, Link, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { getHostVans } from "../../api";
import requireAuth from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  const vansPromise = useLoaderData();

  function renderVanElements(vans) {
    const hostVansList = vans.map((van) => (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
    return (
      <div className="host-vans-list">
        <section>{hostVansList}</section>
      </div>
    );
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h2>Loading vans</h2>}>
        <Await resolve={vansPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </section>
  );
}
