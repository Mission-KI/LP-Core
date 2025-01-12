import React, { createContext, useContext, useEffect, useState } from 'react';

const ExpertContext = createContext();

export const ExpertProvider = ({ children }) => {
  const [expertMode, setExpertMode] = useState(() => {
    const savedExpertPreference = localStorage.getItem('expertPreference');
    if (savedExpertPreference !== null) {
      return savedExpertPreference === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('expertPreference', expertMode.toString());
  }, [expertMode]);

  return (
    <ExpertContext.Provider value={{ expertMode, setExpertMode }}>
      {children}
    </ExpertContext.Provider>
  );
};

export const useExpert = () => useContext(ExpertContext);
