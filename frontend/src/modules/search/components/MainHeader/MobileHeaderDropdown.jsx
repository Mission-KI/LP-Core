import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../../common/components/widgets/LanguageSelector";

const MobileHeaderDropdown = ({ landingRedirectUrl }) => {
  const { t } = useTranslation();

  return (
    <div
      id="custom-nav-dropdown"
      className="d-md-none w-100 container shadow-sm px-4 py-2"
    >
      <Nav className="flex-column">
        <a href={landingRedirectUrl} className="nav-link py-2">
          Landing Page
        </a>
        <Nav.Link as={NavLink} to="/" className="py-2">
          {t("header.search")}
        </Nav.Link>
        <Nav.Link as={NavLink} to="/bookmarks" className="py-2">
          {t("header.bookmarks")}
        </Nav.Link>
        <Nav.Link as={NavLink} to="/help" className="py-2">
          {t("header.help")}
        </Nav.Link>
        <LanguageSelector />
        <a
          href="https://beebucket.ai/kontakt/"
          className="btn fw-500 rounded-lg medium py-2 px-3 btn-contrast mt-2"
        >
          {t("auth.register")}
        </a>
      </Nav>
    </div>
  );
};

export default MobileHeaderDropdown;
