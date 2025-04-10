import React, { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [expertMode, setExpertMode] = useState(() => {
    const savedExpertPreference = localStorage.getItem("expertPreference");
    return savedExpertPreference !== null
      ? savedExpertPreference === "true"
      : false;
  });

  const [alwaysExpandFilters, setAlwaysExpandFilters] = useState(() => {
    const savedExpandPreference = localStorage.getItem(
      "expandFiltersPreference",
    );
    return savedExpandPreference !== null
      ? savedExpandPreference === "true"
      : false;
  });

  useEffect(() => {
    localStorage.setItem("expertPreference", expertMode.toString());
  }, [expertMode]);

  useEffect(() => {
    localStorage.setItem(
      "expandFiltersPreference",
      alwaysExpandFilters.toString(),
    );
  }, [alwaysExpandFilters]);

  return (
    <SettingsContext.Provider
      value={{
        expertMode,
        setExpertMode,
        alwaysExpandFilters,
        setAlwaysExpandFilters,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
