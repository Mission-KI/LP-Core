import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (currentLanguage === "de") {
    return (
      <div className="col-md-10">
        <h2 className="bold mb-5">Über daseen</h2>
        <p className="fw-500 mt-3">Versionsinformationen</p>
        <p className="regular text-justify">31.03.2025</p>
        <p className="fw-500 mt-3">Neueste Änderungen</p>
        <p> - Erweiterter Hilfebereich</p>
        <p className="fw-500 mt-3" id="registration-section">
          Registrierung
        </p>
        Datenanbieter sowie Datenraum- und Datenportalbetreiber können sich über
        den folgenden Kontakt verbinden: &nbsp;
        <a href="https://beebucket.ai/en/contact/" target="_blank">
          Beebucket
        </a>
      </div>
    );
  }

  return (
    <div className="col-md-10">
      <h2 className="bold mb-5">About daseen</h2>
      <p className="fw-500 mt-3">Version information</p>
      <p className="regular text-justify">31.03.2025</p>
      <p className="fw-500 mt-3">Latest changes</p>
      <p> - extended help area</p>
      <p className="fw-500 mt-3" id="registration-section">
        Registration
      </p>
      Data publishers as well as data space and data portal operators can
      connect via the following contact: &nbsp;
      <a href="https://beebucket.ai/en/contact/" target="_blank">
        Beebucket
      </a>
    </div>
  );
};

export default About;
