import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const ToggleEnglishAndRedirect = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  i18n.changeLanguage("English").then(() => {
    navigate("/");
  });
};

export default ToggleEnglishAndRedirect;
