import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { t } from "i18next";
import LanguageSelector from "../components/widgets/LanguageSelector";

function LegalLayout() {
  return (
    <>
      <div className="main-content-wrapper">
        <div className="container pb-4" style={{ maxWidth: 1050 }}>
          <div className='d-flex justify-content-between mb-5'>
            <div className='d-flex align-items-center'>
              <a href="/" className='text-decoration-none h2 mb-0' style={{ width: 'fit-content' }}>{t('page.title')}</a>
              <span className='badge badge-primary bg-danger ms-2'>Alpha</span>
            </div>            
            <LanguageSelector />
          </div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LegalLayout;
