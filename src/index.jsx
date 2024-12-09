import React from "react";
import ReactDom from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login, { loader as loginLoader } from "./pages/Login";
import requireAuth from "./utils";
localStorage.clear();

import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} loader={loginLoader} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />
      <Route path="host" element={<HostLayout />}>
        <Route
          index
          loader={async ({ request }) => await requireAuth(request)}
          element={<Dashboard />}
        />
        <Route
          path="income"
          loader={async ({ request }) => await requireAuth(request)}
          element={<Income />}
        />
        <Route
          path="reviews"
          loader={async ({ request }) => await requireAuth(request)}
          element={<Reviews />}
        />
        <Route
          path="vans"
          errorElement={<Error />}
          loader={hostVansLoader}
          element={<HostVans />}
        />
        <Route
          path="vans/:id"
          loader={hostVanDetailLoader}
          element={<HostVanDetail />}
          errorElement={<Error />}
        >
          <Route
            index
            loader={async ({ request }) => await requireAuth(request)}
            element={<HostVanInfo />}
          />
          <Route
            path="pricing"
            loader={async ({ request }) => await requireAuth(request)}
            element={<HostVanPricing />}
          />
          <Route
            path="photos"
            loader={async ({ request }) => await requireAuth(request)}
            element={<HostVanPhotos />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDom.createRoot(document.getElementById("root")).render(<App />);
