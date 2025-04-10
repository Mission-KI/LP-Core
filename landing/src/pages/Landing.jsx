import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import "../../node_modules/react-tiles-dnd/esm/index.css";
import Footer from "../components/Footer/Footer";
import WelcomePopup from "../components/WelcomePopup/WelcomePopup";
import BMDV from "../assets/img/BMDV.svg?react";
import MKI from "../assets/img/MKI.svg?react";
import Categories from "../components/Categories";

const Landing = () => {
  return (
    <>
      <Header />
      <div className="main-content-wrapper bg-white">
        <HeroSection />
        <hr />
        <div className="container">
          <Categories />

          <div className="d-flex justify-content-center align-items-center my-5">
            <div className="px-5 mx-4">
              <MKI style={{ maxWidth: 230 }} className="w-100" />
            </div>

            <div className="px-5 mx-4">
              <BMDV style={{ maxWidth: 230 }} className="w-100" />
            </div>
          </div>
        </div>
        <Footer />
        <WelcomePopup />
      </div>
    </>
  );
};

export default Landing;
