import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { t } from "i18next";

function LegalLayout() {
  return (
    <>
      <div className="main-content-wrapper">
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
          <div className='d-flex justify-content-between mb-5'>
            <a href="/" className='text-decoration-none h2' style={{ width: 'fit-content' }}>{t('page.title')}</a>
          </div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LegalLayout;
