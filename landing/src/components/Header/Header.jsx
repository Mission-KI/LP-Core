import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from "react-i18next";
import { appUrl } from "../../api/config";
import { List } from "react-bootstrap-icons";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  var searchPageRedirectUrl;
  if (i18n.language === "en" || i18n.language === "English") {
    searchPageRedirectUrl = appUrl + "/en";
  } else if (i18n.language === "de" || i18n.language === "German") {
    searchPageRedirectUrl = appUrl + "/de";
  } else {
    searchPageRedirectUrl = appUrl + "/en";
  }

  return (
    <Navbar
      bg="white"
      data-bs-theme="light"
      fixed="top"
      expand="md"
      className={`py-3 ${isScrolled ? "shadow" : ""}`}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0 txt-regular"
        >
          <List />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="mb-3 mb-md-0">
          <Nav className="me-auto">
            <a href="/" className="nav-link me-4">
              Landing Page
            </a>
            <a
              style={{ whiteSpace: "nowrap" }}
              href={searchPageRedirectUrl}
              className="nav-link me-3 pe-3"
            >
              {t("header.search")}
            </a>
            <a
              style={{ whiteSpace: "nowrap" }}
              href={appUrl + "/help"}
              className="nav-link d-none d-md-block me-4"
            >
              {t("header.help")}
            </a>
            <div className="me-4">
              <LanguageSelector />
            </div>
            <div className="d-flex align-items-center ps-1 me-4">
              <span
                className="badge badge-primary bgc-danger py-2"
                style={{ fontSize: "10pt" }}
              >
                Beta
              </span>
            </div>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-md-auto">
          <div>
            <a
              href="https://beebucket.ai/kontakt/"
              className="btn fw-500 rounded-lg medium py-2 px-3 btn-dark"
            >
              {t("auth.register")}
            </a>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
