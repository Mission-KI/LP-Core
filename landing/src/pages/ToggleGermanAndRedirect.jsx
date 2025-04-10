import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const ToggleGermanAndRedirect = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  i18n.changeLanguage("de").then(() => {
    navigate("/");
  });
};

export default ToggleGermanAndRedirect;
