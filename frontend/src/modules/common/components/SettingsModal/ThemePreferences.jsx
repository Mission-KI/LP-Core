import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const ThemePreferences = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { t } = useTranslation();

  const handleThemeChange = (mode) => {
    setDarkMode(mode === "dark");
  };

  return (
    <div>
      <p className="bold" style={{ fontSize: 17 }}>
        {t("settings.theme")}
      </p>
      <div className="py-4 d-flex gap-3">
        <div
          onClick={() => handleThemeChange("light")}
          className={`card bgc-body p-3 align-items-center ${!darkMode ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: !darkMode
              ? "2px solid var(--color-primary)"
              : "1px solid #ddd",
            boxShadow: !darkMode
              ? "0px 0px 5px rgba(0, 123, 255, 0.86)"
              : "none",
            textAlign: "center",
          }}
        >
          <SunFill
            size={24}
            className="text-warning"
            style={{ marginBottom: "10px" }}
          />
          <p className="txt-regular">{t("settings.lightTheme")}</p>
        </div>
        <div
          onClick={() => handleThemeChange("dark")}
          className={`card p-3 align-items-center ${darkMode ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: darkMode
              ? "2px solid var(--color-primary)"
              : "1px solid #ddd",
            boxShadow: darkMode
              ? "0px 0px 5px rgba(0, 123, 255, 0.86)"
              : "none",
            textAlign: "center",
          }}
        >
          <MoonFill
            size={24}
            className="txt-primary-darker"
            style={{ marginBottom: "10px" }}
          />
          <p className="txt-regular">{t("settings.darkTheme")}</p>
        </div>
      </div>
    </div>
  );
};

export default ThemePreferences;
