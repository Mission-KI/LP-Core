import React from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import { Globe2 } from "react-bootstrap-icons";

function LanguageSelector() {
  const { i18n } = useTranslation();

  const lngs = {
    en: { nativeName: "English" },
    de: { nativeName: "German" },
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      window.location.reload();
    });
  };

  return (
    <Dropdown className="">
      <Dropdown.Toggle
        variant=""
        className="btn-hover txt-regular px-2 h-100 d-flex align-items-center"
        id="language-dropdown"
      >
        <Globe2 className="h5 mb-0" />
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="border-0 shadow-sm mt-3 pointy-dropdown"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        {Object.keys(lngs).map((lng) => (
          <Dropdown.Item key={lng} onClick={() => handleChangeLanguage(lng)}>
            {lngs[lng].nativeName}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
