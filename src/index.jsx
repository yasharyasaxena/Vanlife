import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">
          #Vanlife
        </Link>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDom.createRoot(document.getElementById("root")).render(<App />);
