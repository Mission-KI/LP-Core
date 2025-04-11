import React from "react";
import { useSettings } from "../../contexts/SettingsContext";
import { useTranslation } from "react-i18next";

const SearchPreferences = () => {
  const {
    expertMode,
    setExpertMode,
    alwaysExpandFilters,
    setAlwaysExpandFilters,
  } = useSettings();
  const { t } = useTranslation();

  const toggleExpertMode = () => {
    setExpertMode(!expertMode);
  };

  const toggleAlwaysExpandFilters = () => {
    setAlwaysExpandFilters(!alwaysExpandFilters);
  };

  return (
    <div>
      <p className="bold" style={{ fontSize: 17 }}>
        {t("settings.searchSettings")}
      </p>

      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={expertMode}
            onChange={toggleExpertMode}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>{t("settings.expertMode")}</span>
        <p className="txt-lighter small mt-1">
          {t("settings.expertModeDescription")}
        </p>
      </div>

      <div className="pt-2 pb-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={alwaysExpandFilters}
            onChange={toggleAlwaysExpandFilters}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>
          {t("settings.alwaysExpandFilters")}
        </span>
        <p className="txt-lighter small mt-1">
          {t("settings.alwaysExpandFiltersDescription")}
        </p>
      </div>
    </div>
  );
};

export default SearchPreferences;
