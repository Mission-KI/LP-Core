import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function LegalLayout() {
  return (
    <>
      <div className="main-content-wrapper">
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
          <div className="d-flex flex-column mb-5">
            <a
              href="/"
              className="text-decoration-none h2 bold"
              style={{ width: "fit-content" }}
            >
              Dataset Search Engine
            </a>
          </div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LegalLayout;
