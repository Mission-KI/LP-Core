import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { t } from "i18next";
import LanguageSelector from "../components/widgets/LanguageSelector";

function LegalLayout() {
  return (
    <>
      <div className="main-content-wrapper">
        <div className="container pb-4">
          <div className="d-flex justify-content-between mb-5">
            <a
              href="/"
              className="text-decoration-none h2"
              style={{ width: "fit-content" }}
            >
              {t("page.title")}
            </a>
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
