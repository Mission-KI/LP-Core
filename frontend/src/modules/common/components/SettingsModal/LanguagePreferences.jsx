import React from "react";
import LanguageSelector from "../widgets/LanguageSelector";
import { useTranslation } from "react-i18next";

const LanguagePreferences = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="bold" style={{ fontSize: 17 }}>
        {t("settings.language")}
      </p>

      <div className="d-flex align-items-center py-4">
        <span className="me-2 py-2">{t("settings.language")}:</span>
        <LanguageSelector />
      </div>
    </div>
  );
};

export default LanguagePreferences;
