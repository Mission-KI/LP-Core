import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    if (currentLanguage === "de") {
        return (
            <div className="col-md-10">
                <h2 className="bold mb-5">Über daseen</h2>
                <h5 className="bold mt-3">Versionsinformationen</h5>
                <p className="regular text-justify">31.03.2025</p>
                <h5 className="bold mt-3">Neueste Änderungen</h5>
                <ul className="regular text-justify">
                    <li>Erweiterter Hilfebereich</li>
                </ul>
                <h5 className="bold mt-3" id="registration-section">Registrierung</h5>
                Datenanbieter sowie Datenraum- und Datenportalbetreiber können sich über den folgenden Kontakt verbinden:
                <a href="https://beebucket.ai/en/contact/" target="_blank">Beebucket</a>
            </div>
        );
    }

    return (
        <div className="col-md-10">
            <h2 className="bold mb-5">About daseen</h2>
            <h5 className="bold mt-3">Version information</h5>
            <p className="regular text-justify">31.03.2025</p>
            <h5 className="bold mt-3">Latest changes</h5>
            <ul>
                <li>extended help area</li>
            </ul>
            <h5 className="bold mt-3" id="registration-section">Registration</h5>
            Data publishers as well as data space and data portal operators can connect via the following contact:
            <a href="https://beebucket.ai/en/contact/" target="_blank">Beebucket</a>
        </div>
    );
};

export default About;
