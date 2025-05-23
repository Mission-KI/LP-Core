import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDown } from "react-bootstrap-icons";

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
    <Dropdown className="px-0 mx-0 text-left">
      <Dropdown.Toggle
        variant="text"
        className="bg-transparent px-0 nav-link"
        id="language-dropdown"
      >
        {i18n.language} <ChevronDown />
      </Dropdown.Toggle>

      <Dropdown.Menu className="border-0 shadow">
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
