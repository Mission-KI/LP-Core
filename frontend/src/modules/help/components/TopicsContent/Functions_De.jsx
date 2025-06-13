export const Functions_De = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-5">Funktionen</h1>
      <h4 className="mt-5 mb-3" id="landingpage">
        Landing Page
      </h4>
      <p className="regular text-justify">
        Die Landing Page bietet einen einfachen Einstieg in die Welt von
        daseen.{" "}
      </p>
      <p className="regular text-justify">
        Der Nutzer kann dort zunächst eine Datenkategorie und im zweiten Schritt
        einen Datenraum oder Datenanbieter wählen, der Daten in dieser Kategorie
        bereitstellt. Nach dieser Auswahl landet der Nutzer in der entsprechend
        vorgefilterten Suche.
      </p>
      <h4 className="mt-5 mb-3" id="search">
        Suche
      </h4>
      <p className="regular text-justify">
        Sie können auf daseen nach sogenannten Extended Dataset Profiles (EDP)
        suchen. Ein EDP ist eine standardisierte Metadatenbeschreibung eines von
        einem Datenanbieter (Data Publisher/Data Provider) direkt oder über ein
        Datenportal bzw. einen Datenraum (Data Source) angebotenen Datensatzes
        (Asset). Ein Asset besteht aus einer oder mehreren komprimierten Dateien
        eines Formates und einer Datenstruktur [
        <a href="/help/data-formats-and-analysis#formats">
          mehr zu Datenformaten und -strukturen
        </a>
        ].
      </p>
      <p className="regular text-justify">
        daseen verweist dabei in den Suchergebnissen typischerweise immer auf
        die Data Source, über die das im EDP referenzierte Asset geladen werden
        kann. Eine Ausnahme bilden die Assets, bei denen die von der Data Source
        bereitgestellten Metainformationen nur einen direkten Download-Link
        beinhalten. Für solche Assets verweist der EDP auf den direkten
        Download-Link des Assets.
      </p>
      <h5 className="mt-4" id="free-text-search">
        Freitext Suche (einfach)
      </h5>
      <p className="regular text-justify">
        Sie können daseen durch Eingabe beliebiger Stichwörter in das Suchfeld
        nach EDP durchsuchen. Der eingegebene Suchbegriff wird dabei gegen
        folgende Metainformationen abgeglichen und durchsucht:{" "}
      </p>
      <ul className="regular">
        <li>
          EDP-Titel: Ein vom Datenanbieter vergebener Freitext-String für das
          referenzierte Asset. Falls kein Titel angegeben wurde, zeigt der EDP
          den Dateinamen des Assets an.{" "}
        </li>
        <li>
          EDP-Beschreibung: Ein vom Datenanbieter vergebener Freitext-String,
          der Art und Inhalt des Assets beschreibt. Falls keine Beschreibung
          angegeben wurde, ist die EDP-Beschreibung leer.{" "}
        </li>
      </ul>
      <h5 className="mt-4" id="search-in-expert-mode">
        Suche im Expertenmodus (Query Language)
      </h5>
      <p className="regular text-justify">
        Der Expertenmodus ist eine erweiterte Suchfunktion in Daseen, die Ihr
        Sucherlebnis verbessert, indem sie Autovervollständigungsvorschläge für
        das Schreiben natürlicher Sprachabfragen in Elasticsearch bietet.
        Dadurch können Sie komplexe Abfragen effizienter erstellen und präzise
        Ergebnisse basierend auf einer strukturierten Suchlogik abrufen.
      </p>
      <p className="regular text-justify">
        Standardmäßig ist der Expertenmodus deaktiviert, um den Einstieg in
        daseen zu erleichtern. Nutzer mit Kenntnissen in der Elasticsearch Query
        Language können den Modus über die Sucheinstellungen aktivieren [
        <a href="/help/functions#expert-mode">mehr erfahren</a>].
      </p>
      <h6 className="bold mt-4" id="query-language">
        Hilfestellungen zur Query Language
      </h6>
      <p>
        Der Expertenmodus verwendet die Elasticsearch Query Language. Eine
        umfangreiche Dokumentation ist unter{" "}
        <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/esql.html">
          Elasticsearch Guide
        </a>{" "}
        zu finden.{" "}
      </p>
      <p className="bold mt-4">Escaping</p>
      <p>
        Bei Verwendung der Standardsuche wird das Escapen automatisch
        angewendet. Im Expertenmodus muss der Benutzer für ein ordnungsgemäßes
        Escapen sorgen. Die folgenden Zeichen müssen entsprechend escaped oder
        vermieden werden, wenn sie nicht absichtlich als Operatoren verwendet
        werden: &#43; &#45; = && || &#62; &#60; ! &#40; &#41; &#123; &#125;
        &#91; &#93; ^ " ~ * ? : &#92; &#47;
      </p>
      <p className="bold mt-4">Feld-spezifische Hinweise</p>
      <ul className="regular">
        <li>
          Zur Suche nach Tags müssen diese in Anführungszeichen gesetzt werden,
          z.B.: <i>tags:'BSRN'</i>
        </li>
        <li>
          Datumsangaben folgen dem Format YYYY-MM-DD, eine entsprechende Abfrage
          wäre z.B. <i>publishDate: [2024-06-01 TO 2024-12-31]</i>
        </li>
      </ul>
      Weitere Hilfestellungen folgen in Kürze.
      <h5 className="mt-4" id="filter-based-search">
        Filterbasierte Suche
      </h5>
      <p className="regular text-justify">
        Neben der Freitext Suche bietet daseen auch eine filterbasierte Suche
        an. Diese kann entweder alleine oder in Kombination mit der Freitext
        Suche genutzt werden. Um eine filterbasierte Suche zu starten, klicken
        Sie unter dem Suchfeld auf “Filter”. Alle Filter sind einer
        Filterkategorie zugeordnet. Dabei wird zwischen Datenstruktur
        unabhängigen Filtern (“Allgemeine Filter“) und Datenstruktur
        spezifischen Filtern unterschieden.
      </p>
      <p className="regular text-justify">
        Sobald ein Filter ausgewählt wurde, wird dieser unterhalb des Freitext
        Suchfelds als Filtertag angezeigt. Ein Filter kann deaktiviert werden,
        indem man den Filter wieder abwählt oder auf das “x” im Filtertag
        klickt.{" "}
      </p>
      <p className="regular text-justify">
        Aktuell stehen folgende Filter zur Verfügung:
      </p>
      <h6 className="bold mt-4" id="general-filters">
        Allgemeine Filter
      </h6>
      <ul className="regular">
        <li>
          Datenräume/Datenportale: Über die Drop-Down Liste können ein oder
          mehrere Datenräume/Datenportale ausgewählt werden, auf die die Suche
          beschränkt werden soll.
        </li>
        <li>
          Publisher: Über die Drop-Down Liste können ein oder mehrere Publisher
          die Daten in einem Datenraum/Datenportal veröffentlichen ausgewählt
          werden, auf die die Suche beschränkt werden soll.
        </li>
        <li>
          Verarbeitungszustand: Über die Drop-Down Liste können ein oder mehrere
          Verarbeitungszustände ausgewählt werden, auf die die Suche beschränkt
          werden soll. [
          <a href="/help/data-formats-and-analysis#asset-processing-status-section">
            mehr zu Verarbeitungszuständen
          </a>
          ]
        </li>
        <li>
          Lizenzen: Über die Drop-Down Liste können ein oder mehrere Lizenzen
          ausgewählt werden, auf die die Suche beschränkt werden soll.
        </li>
        <li>
          Datenformat: Über die Drop-Down Liste können ein oder mehrere
          Datenformate ausgewählt werden, auf die die Suche beschränkt werden
          soll.
        </li>
        <li>
          Open/Closed Access: Über diese Icons kann ausgewählt werden, ob die
          Suche auf Assets beschränkt sein soll, die keine (open) oder eine
          (closed) Registrierung über die EDP-Data Source erfordern.
        </li>
        <li>
          Größenbereich: Über die Schieberegler kann eingestellt werden, welche
          minimale und/oder maximale Größe ein Asset haben muss/darf, um in die
          Suche eingeschlossen zu werden. Im Fall von Archiven bezieht sich dies
          auf die komprimierte Größe des Assets.{" "}
        </li>
      </ul>
      <h6 className="bold mt-4" id="filters-for-structured-data">
        Filter für strukturierte Daten
      </h6>
      <ul className="regular">
        <li>
          Zeilen: Über die Schieberegler kann eingestellt werden, welche
          minimale und/oder maximale Anzahl an Zeilen ein Asset haben muss/darf,
          um in die Suche eingeschlossen zu werden.
        </li>
        <li>
          Spalten: Über die Schieberegler kann eingestellt werden, welche
          minimale und/oder maximale Anzahl an Spalten ein Asset haben
          muss/darf, um in die Suche eingeschlossen zu werden.
        </li>
        <li>
          Date Time Attribute: Über das Icon kann die Suche auf Assets
          beschränkt werden, in denen eine Zeitangabe erkannt wurde. [
          <a href="/help/data-formats-and-analysis#date-time-attribute-section">
            mehr zum Date Time Attribute
          </a>
          ]
        </li>
        <li>
          Temporal Frequency: Über das Icon kann die Suche auf Assets beschränkt
          werden, bei denen eine Frequenz ermittelt werden konnte, in der die
          Datenpunkte im Asset erzeugt wurden. [
          <a href="/help/data-formats-and-analysis#temporal-frequency-section">
            mehr zur Temporal Frequency
          </a>
          ]{" "}
        </li>
        <li>
          Data Type Consistency: Über das Icon kann die Suche auf Assets
          beschränkt werden, in denen alle Werte einer Spalte vom gleichen Typ
          sind. [
          <a href="/help/data-formats-and-analysis#data-type-consistency-section">
            mehr zur Data Type Consistency
          </a>
          ]
        </li>
        <li>
          Significant Variance: Über das Icon kann die Suche auf Assets
          beschränkt werden, in denen eine signifikante Varianz erkannt wurde. [
          <a href="/help/data-formats-and-analysis#significant-variance-section">
            mehr zur Significant Variance
          </a>
          ]
        </li>
      </ul>
      <h5 className="mt-4" id="search-results">
        Suchergebnisse
      </h5>
      <p className="regular text-justify">
        Alle durch einen Data Publisher freigegebenen EDP können anhand der
        erhobenen EDP-Metadaten auf daseen gefunden werden. Jeder EDP wird dabei
        als ein EDP-Eintrag in der EDP-Ergebnisliste (EDP-Liste) angezeigt. Die
        Sortierung erfolgt dabei immer nach Vollständigkeit der ermittelbaren
        Metainformationen und der zeitlicher Aktualität der Veröffentlichung des
        EDP. Wurde keine EDP-Suche oder Filterung aktiviert, werden alle EDP in
        der EDP-Liste angezeigt. Pro Seite werden maximal 12 EDP-Einträge
        angezeigt. Ist die EDP-Liste größer, kann über eine Blätterfunktion am
        Seitenende in der EDP-Liste vor- und zurück geblättert werden. Neben
        einer EDP-Listenansicht kann auch eine EDP-Kachelansicht gewählt werden.
        Auch diese enthält maximal 12 EDP-Einträge pro Seite.{" "}
      </p>
      <h6 className="bold mt-4" id="edp-list-view">
        EDP-Listenansicht
      </h6>
      In der EDP-Listenansicht besteht jeder EDP-Eintrag aus folgenden,
      durchsuchbaren Informationen:
      <ul className="regular">
        <li>
          EDP-Titel: Der EDP-Titel ist ein vom Data Publisher vergebener
          Freitext. Wurde kein EDP-Titel vergeben, wird der Dateiname des Assets
          angezeigt. Klickt man auf den EDP-Titel, gelangt man zur
          EDP-Detailansicht.
        </li>
        <li>
          EDP-Beschreibung: Die Beschreibung ist ein vom Data Publisher
          eingegebener Freitext, zur Beschreibung des Inhalts des Assets. Wurde
          keine EDP-Beschreibung vergeben, ist das Feld leer.
        </li>
        <li>
          EDP Data Source: Das Data Source Feld gibt den Namen und die URL an,
          über welche Datenquelle das Asset geladen werden kann.
        </li>
        <li>
          EDP-Datenanbieter: Das EDP-Datenanbieter Feld gibt den Namen und die
          URL des Datenanbieters an, der das Asset anbietet und den EDP
          veröffentlich hat.{" "}
        </li>
        <li>
          EDP-Datenstruktur: Das EDP-Datenstruktur Feld gibt die erkannte
          Datenstruktur des Assets an sowie die Dateiendung (in Klammern).{" "}
        </li>
        <li>
          EDP Size: Das EDP Size Feld gibt die Dateigröße des Assets an. Falls
          das Asset komprimiert angeboten wird, wird die Größe des komprimierten
          Assets angezeigt.
        </li>
        <li>
          EDP-Lizenz: Das EDP-Lizenz Feld gibt den Namen und falls vorhanden die
          URL zu der Datenlizenz an, unter der das Asset vom EDP-Datenanbieter
          angeboten wird. Wurde keine Datenlizenz angegeben, steht das Feld auf
          None.
        </li>
        <li>
          EDP-Veröffentlichungsdatum: Das EDP-Veröffentlichungsdatum gibt an,
          wann das Asset vom EDP-Datenanbieter auf der EDP Data Source
          veröffentlicht wurde.
        </li>
        <li>
          Erweitertes Menu: Über die drei Punkte am rechten Rand können weitere
          Aktionen zum EDP ausgelöst werden. Aktuell werden folgende Funktionen
          unterstützt:
          <ul className="regular">
            <li>
              Lesezeichen setzen/Lesezeichen entfernen [
              <a href="/help/functions#bookmarks">mehr erfahren</a>]
            </li>
            <li>
              Datensatz abrufen [
              <a href="/help/functions#get-asset">mehr erfahren</a>]
            </li>
          </ul>
        </li>
        <li>
          EDP Quick-View: Mit Klick auf dieses Icon öffnet sich der EDP-Quick
          View, der alle wesentlichen Data Science Informationen zu einem Asset
          beinhaltet. [
          <a href="/help/data-formats-and-analysis#formats">
            mehr zu den enthaltenen Informationen und Analysen
          </a>
          ]{" "}
        </li>
        <li>
          EDP Asset Eigenschaften: Über die EDP Asset Eigenschaften werden
          wesentliche Asset Eigenschaften angezeigt [
          <a href="/help/data-formats-and-analysis#asset-properties-general">
            mehr zu generellen Asset Eigenschaften
          </a>{" "}
          /{" "}
          <a href="/help/data-formats-and-analysis#asset-properties-structured">
            mehr zu spezifischen Asset Eigenschaften für strukturierte Daten
          </a>
          ].
        </li>
      </ul>
      <h6 className="bold mt-4" id="edp-tile-view">
        EDP-Kachelansicht
      </h6>
      In der EDP-Kachelansicht besteht jeder EDP-Eintrag aus den folgenden,
      durchsuchbaren Informationen (für Details siehe EDP-Listenansicht):
      <ul className="regular">
        <li>EDP-Titel</li>
        <li>EDP-Beschreibung</li>
        <li>EDP Data Source</li>
        <li>EDP-Datenanbieter</li>
        <li>EDP-Datenstruktur</li>
        <li>EDP Size</li>
        <li>EDP Asset Eigenschaften</li>
        <li>Erweitertes Menu</li>
      </ul>
      <h4 className="mt-5 mb-3" id="bookmarks">
        Lesezeichen
      </h4>
      <p className="regular text-justify">
        Über Klick auf „Lesezeichen“ kann ein EDP markiert und in der
        Lesezeichen Liste gespeichert werden. Ist ein EDP-Eintrag mit einem
        Lesezeichen markiert, wird dies über ein Stern Icon angezeigt. Alle mit
        einem Lesezeichen markierten EDP können über die Lesezeichen Seite
        (siehe Lesezeichen Seite) angezeigt werden. Mit Klick auf Lesezeichen
        entfernen, kann ein Lesezeichen für einen EDP-Eintrag gelöscht
        werden.{" "}
      </p>
      <h4 className="mt-5 mb-3" id="functions-per-edp">
        Funktionen je EDP
      </h4>
      <h5 className="mt-4" id="detail-view">
        Detailansicht
      </h5>
      <p className="regular text-justify">
        Die Detailansicht eines EDPs liefert je nach Datentyp unterschiedliche
        Informationen. Neben einigen generischen Metadaten, die für jeden
        Datentyp einheitlich vorhanden sind, werden je nach Struktur und Typ
        weitere Analysen durchgeführt und entsprechend optimierte Sichten
        bereitgestellt{" "}
        <a href="/help/data-formats-and-analysis#formats">mehr erfahren</a>].
      </p>
      <h5 className="mt-4" id="get-asset">
        Datensatz abrufen
      </h5>
      <p className="regular text-justify">
        Mit Klick auf Datensatz abrufen, erfolgt eine Weiterleitung (Referal) zu
        der Download Seite über die das Asset geladen werden kann. Dabei gilt
        folgendes:{" "}
      </p>
      <ul className="regular">
        <li>
          Wurde keine Asset URL der Data Source mitgegeben, sondern nur der
          Download Link des Datenanbieters zum Download des Assets, ist der EDP
          direkt mit der Asset URL verlinkt.{" "}
        </li>
        <li>
          Wurde eine Asset URL der Data Source mitgegeben, ist der EDP mit
          dieser Seite verlinkt, die im Browser über eine neue Seite/Tab
          aufgerufen wird.
        </li>
        <li>
          Wurde keine Asset URL der Data Source mitgegeben (in der Regel bei
          Closed Access Data Sources der Fall), ist der EDP auf die Standard URL
          der Data Source verlinkt.
        </li>
      </ul>
      <h5 className="mt-4" id="get-schema">
        Schema abrufen
      </h5>
      Über diesen Button lässt sich die zur Erstellung des EDP genutzte Version
      des EDP Schemas herunterladen.
      <h5 className="mt-4" id="get-report">
        {" "}
        Bericht abrufen(pdf)
      </h5>
      Über den Button “Bericht(pdf)” kann eine Zusammenfassung der EDP Daten
      heruntergeladen werden.
      <h5 className="mt-4" id="similar-edp">
        {" "}
        Ähnliche EDP finden
      </h5>
      Diese Funktion liefert weitere EDP, die ähnliche Charakteristika
      aufweisen, wie das aktuell ausgewählte EDP.
      <h4 className="mt-5 mb-3" id="settings">
        {" "}
        Einstellungen
      </h4>
      <h5 className="mt-4" id="language">
        Spracheinstellungen
      </h5>
      In den Spracheinstellungen kann zwischen der deutschen und der englischen
      Sprache der Oberfläche gewechselt werden.Einige EDP spezifische Inhalte
      werden auch in der deutschen Variante weiterhin im englischen
      Originalbegriff der Metadaten angezeigt.
      <h5 className="mt-4" id="theme">
        {" "}
        Heller / Dunkler Modus
      </h5>
      Hier kann der Nutzer zwischen einer hellen und einer dunklen Darstellung
      wählen.
      <h5 className="mt-4" id="expert-mode">
        Sucheinstellungen: Expertenmodus
      </h5>
      <h6 className="bold mt-4" id="how-to-use-expert-mode">
        So verwenden Sie den Expertenmodus
      </h6>
      <ul className="regular">
        <li>
          Sie können den Expertenmodus auf der Seite{" "}
          <strong>Einstellungen</strong> aktivieren oder deaktivieren.
        </li>
        <li>
          Wenn der <strong>Expertenmodus AKTIVIERT</strong> ist, bietet die
          Suchleiste Autovervollständigungsvorschläge, um Ihnen beim Schreiben
          präziserer Elasticsearch-Abfragen zu helfen.
        </li>
        <li>
          Wenn der <strong>Expertenmodus DEAKTIVIERT</strong> ist, schlägt die
          Suchleiste nur grundlegende Asset-Namen vor, was es allgemeinen
          Benutzern erleichtert, Datenbestände ohne komplexe Abfragesyntax zu
          finden.
        </li>
      </ul>
      <h6 className="bold mt-4" id="what-happens-if-you-use-wrong-syntax">
        Was passiert, wenn Sie eine falsche Syntax verwenden?
      </h6>
      <ul className="regular">
        <li>
          Wenn Ihre Abfrage falsch formatiert ist, kann Elasticsearch einen
          Fehler oder unerwartete Ergebnisse zurückgeben.
        </li>
        <li>
          Die Autovervollständigungsvorschläge sollen Sie zu gültigen Abfragen
          führen, dennoch ist es wichtig, Ihre Syntax vor dem Start der Suche zu
          überprüfen.
        </li>
        <li>
          Wenn Sie sich nicht sicher sind, wie Sie Ihre Abfrage strukturieren
          sollen, können Sie unsere{" "}
          <strong>Hilfestellungen zur Query Language</strong> [
          <a href="/help/functions#query-language">mehr erfahren</a>]
          konsultieren oder den Expertenmodus deaktivieren, um eine einfachere
          Suche zu ermöglichen.
        </li>
      </ul>
      <h6 className="bold mt-4" id="when-should-you-use-expert-mode">
        Wann sollten Sie den Expertenmodus verwenden?
      </h6>
      <ul className="regular">
        <li>
          Wenn Sie mit der Elasticsearch-Abfragesyntax vertraut sind und mehr
          Kontrolle über Ihre Suchergebnisse haben möchten.
        </li>
        <li>
          Wenn Sie erweiterte Suchen durchführen, die Filter, Aggregationen oder
          benutzerdefinierte Abfragen erfordern.
        </li>
        <li>
          Wenn Sie eine präzisere und leistungsfähigere Suchfunktion benötigen,
          die über einfache Asset-Namenssuchen hinausgeht.
        </li>
      </ul>
      <h5 className="mt-4" id="always-expand-filters">
        Sucheinstellungen: Filter immer ausklappen
      </h5>
      <p className="regular text-justify">
        Ist die Option deaktiviert, so können die Filter über den unterhalb des
        Suchfeldes vorhandenen Filter-Button ein- und ausgeblendet werden.
      </p>
      <p className="regular text-justify">
        Ist die Option aktiviert, so werden die Filter standardmäßig angezeigt.
      </p>
    </div>
  );
};
