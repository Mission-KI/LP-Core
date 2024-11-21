import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { t } from "i18next";
import LanguageSelector from "../components/widgets/LanguageSelector";
import TitleSection from "../components/TitleSection";

function LegalLayout() {
  return (
    <>
      <div className="main-content-wrapper">
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
          <TitleSection />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LegalLayout;
