const About_De = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-5">Über daseen</h1>
      <h5 className="mt-5 mb-3" id="version-info">
        Versionsinformationen
      </h5>
      <p className="regular text-justify">10.06.2025</p>
      <h5 className="mt-5 mb-3" id="latest-changes">
        Neueste Änderungen
      </h5>
      <p>
        - Mehrere neue Datenräume, Datenportale und Datenanbieter zu Landing
        Page Kategorien hinzugefügt
      </p>
      <p>
        - Fehler in Filtern behoben, der zu Teilergebnissen führte, wenn mehrere
        Elemente in Dropdown-Filtern ausgewählt wurden
      </p>
      <p>
        - Fehler behoben, der zu falschen Ansichten in verschachtelten
        Strukturen führte, wenn untergeordnete Elemente identische Namen hatten
      </p>
      <p> - Kosmetische Optimierungen</p>
      <h5 className="mt-5 mb-3" id="registration-section">
        Registrierung
      </h5>
      <p>
        Datenanbieter sowie Datenraum- und Datenportalbetreiber können sich über
        den folgenden Kontakt verbinden: &nbsp;
        <a href="https://beebucket.ai/en/contact/" target="_blank">
          Beebucket
        </a>
      </p>
    </div>
  );
};

export default About_De;
