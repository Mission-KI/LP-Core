import analysisImg from "../../assets/img/analysis.png";

export const DataFormatsAndAnalysis_De = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-5">Datenformate und Analysen</h1>
      <h5 className="mt-5 mb-3" id="supported-data-formats">
        Unterstützte Datenformate
      </h5>
      Es wird nach folgenden Datenformaten unterschieden:
      <ul className="regular text-justify">
        <li>Archive</li>
        <li>Dokumente</li>
        <li>Strukturierter Text</li>
        <li>Semi-strukturierter Text</li>
        <li>Unstrukturierter Text</li>
        <li>Bilder</li>
        <li>Videos</li>
        <li>Audiodaten</li>
        <li>Graphen (noch nicht unterstützt, Roadmap)</li>
      </ul>
      <p className="regular text-justify">
        Die Analyse eines Data Assets erfolgt im EDPS auf Basis der in der
        nachfolgenden Illustration dargestellten Analyseverfahren:
      </p>
      <img src={analysisImg} className="w-100" alt="Analyseverfahren" />
      <h5 className="mt-5 mb-3" id="data-structures">
        Datenstrukturen
      </h5>
      <p className="regular text-justify">
        Archive und Dokumente können weitere Elemente jedes oben gelisteten
        Formats beinhalten.
      </p>
      <p className="regular text-justify">
        Semi-strukturierter Text kann weitere strukturierte Text-Elemente
        beinhalten. Text kann weitere strukturierte Text-Elemente beinhalten.
      </p>
      <h5 className="mt-5 mb-3" id="analyses">
        Analysen
      </h5>
      <p className="regular text-justify">
        Für alle Datenformate enthalten die entsprechenden EDP eine Basis an
        einheitlichen Informationen. Darüber hinaus gibt es zusätzliche Analysen
        und bereitgestellte Informationen je nach Datenformat.
      </p>
      <h6 className="bold mt-4" id="general-analyses">
        Generelle Analysen für alle Datenformate
      </h6>
      <h7 className="bold mt-4" id="asset-properties-general">
        Asset Eigenschaften
      </h7>
      <p className="fw-500 regular mt-3" id="open-access-section">
        Open Access
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, dass auf ein Asset ohne Registrierung über die
        EDP-Data Source zugegriffen werden kann.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="closed-access-section">
        Closed Access
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, dass auf ein Asset nur nach Registrierung über die
        EDP-Data Source zugegriffen werden kann.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="asset-processing-status-section">
        Asset Verarbeitungszustand
      </p>
      <p className="regular text-justify">
        Der Asset Verarbeitungszustand gibt den Datenreifegrad an.
      </p>
      <p className="regular text-justify">
        Es wird zwischen folgenden Zuständen unterschieden:
      </p>
      <ul className="regular text-justify">
        <li>
          <span className="fw-500">Original Data:</span> Der Inhalt des Assets
          wurde nach der Erzeugung nicht verändert.
        </li>
        <li>
          <span className="fw-500">Processed Data:</span> Der Inhalt des Assets
          wurde nach der Erzeugung ganz oder in Teilen re-definiert,
          konvertiert, semantisch bereinigt und/oder transformiert, um die
          Asset-Struktur zu verbessern und/oder die -Konsistenz zu erhöhen.
        </li>
        <li>
          <span className="fw-500">Refined Data:</span> Bei Assets mit dem
          Reifegrad Refined Data handelt es sich um optimierte
          KI-Trainingsdatensätze, die Daten aus einem oder mehreren Assets
          zusammenfassen.
        </li>
        <li>
          <span className="fw-500">AI/ML Result Data:</span> Bei Assets mit dem
          Reifegrad AI/ML Result Data handelt es sich um Daten, die durch eine
          KI bzw. durch einen ML Algorithmus erzeugt wurden.
        </li>
      </ul>
      <p className="fw-500 regular mt-3" id="allowed-for-ai-section">
        Allowed for AI Training
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, ob das Asset für AI Training genutzt werden darf.
        Für das AI/KI-Training mit öffentlich bereitgestellten Daten
        (eGov-Daten) werden Lizenzen wie Deutschland 2.0-Zero, PDDL und cc-zero
        empfohlen, da sie die notwendige Analyse und Bearbeitung der Daten
        erlauben, um die KI-Compliance sicherzustellen. Dafür sind
        qualitativ-validierte / kuratierte Daten nötig: Für einfache KI-Systeme
        nach ErwG 27 der KI-VO; bzw. für Hoch-Risiko nach Art. 10 KI-VO.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="version-information">
        Versionsangaben
      </p>
      <p className="regular text-justify">
        Es sind unterschiedliche Versionsinformationen zu einem Asset zu
        unterscheiden:
      </p>
      <ul className="regular text-justify">
        <li>
          <span className="fw-500">EDP Version:</span> Versionsnummer innerhalb
          von daseen. Anhand dieser lässt sich erkennen, wie oft das EDP
          erfolgreich in daseen hochgeladen/geupdated wurde (initiale Version:
          1).
        </li>
        <li>
          <span className="fw-500">Asset Version:</span>Vom Datenanbieter
          übermittelte Versionsnummer des Asset im Datenraum. Diese ist
          optional.
        </li>
        <li>
          <span className="fw-500">Schema Version:</span> Version des EDP
          Schemas, die zur Erstellung des EDP genutzt wurde. Ein Download des
          entsprechenden Schemas ist auf der Detailseite des EDP möglich.
        </li>
        <li>
          <span className="fw-500">EDP Service Version:</span> Version der
          Toolchain, die zur Generierung des EDP benutzt wurde.
        </li>
      </ul>
      <p className="fw-500 regular mt-3">
        Datenformat-spezifische Asset Eigenschaften
      </p>
      <p className="regular text-justify">
        Für strukturierte Daten werden zusätzliche Asset Eigenschaften ermittelt
        [
        <a href="/help/data-formats-and-analysis#asset-properties-structured">
          mehr erfahren
        </a>
        ].
      </p>
      <h7 className="bold mt-4" id="data-science-info-general">
        Bereich Data Science Info
      </h7>
      <p className="fw-500 regular mt-3">Datenformat</p>
      <p className="regular text-justify">
        Hier wird das Datenformat des EDP bzw. bei geschachtelten Strukturen des
        ausgewählten Elements angezeigt.
      </p>
      <p className="fw-500 regular mt-3">Dateityp</p>
      <p className="regular text-justify">
        Neben der Kategorisierung des Datenformats wird auch der eigentliche
        Dateityp angezeigt.
      </p>
      <p className="fw-500 regular mt-3">Volumen</p>
      <p className="regular text-justify">
        Angezeigt wird hier die Größe des Assets bei der Verarbeitung. Bei
        Archiven handelt es sich somit um die komprimierte Größe.
      </p>
      <p className="fw-500 regular mt-3">Sprachen</p>
      <p className="regular text-justify">
        Das Asset wird auf die darin enthaltenen Sprachen geprüft.
      </p>
      <p className="fw-500 regular mt-3">Übertragungsart</p>
      <p className="regular text-justify">
        Unterschieden wird hier zwischen statischen (“static”) und inflationären
        Daten (“inflationary“).
      </p>
      <p className="fw-500 regular mt-3">Unveränderlichkeit</p>
      <p className="regular text-justify">
        Hierbei handelt es sich um die semantische Information, ob damit
        gerechnet werden kann, dass der Datensatz in Zukunft geändert werden
        wird (“mutable”) oder nicht (“immutable”).{" "}
      </p>
      <p className="fw-500 regular mt-3">
        Datenformat-spezifische Angaben in der Data Science Info
      </p>
      <p className="regular text-justify">
        Für die folgenden Datenformate gibt es zusätzliche Angaben in der Data
        Science Info:
        <ul className="regular text-justify">
          <li>
            <a href="/help/data-formats-and-analysis#data-science-info-archive">
              Archive
            </a>
          </li>
          <li>
            <a href="/help/data-formats-and-analysis#data-science-info-structured">
              Strukturierte Daten
            </a>
          </li>
        </ul>
      </p>
      <h6 className="bold mt-4" id="additonal-analyes-archives">
        Zusätzliche Analysen für Archive
      </h6>
      <h7 className="bold mt-4" id="data-science-info-archive">
        Bereich Data Science Info
      </h7>
      <p className="fw-500 regular mt-3">Komprimierung</p>
      <p className="regular text-justify">
        Hier wird der zur Komprimierung angewendete Algorithmus angezeigt.
      </p>
      <p className="fw-500 regular mt-3">Unkomprimiertes Volumen</p>
      <p className="regular text-justify">
        Als Ergänzung zum weiter oben angezeigten Volumen, das die komprimierte
        Größe anzeigt, ist an dieser Stelle die Größe des entpackten Archivs
        sichtbar.
      </p>
      <h7 className="bold mt-4" id="tab-asset-structure-archive">
        Tab: Asset Struktur
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht über die Struktur des Archivs. Über
        einen Klick auf die eingebetteten Dateien springt man in die jeweiligen
        Details zum ausgewählten Element (Sicht entsprechend des jeweiligen
        Datenformats). Über die Breadcrumb-Navigation kann der Nutzer zum
        übergeordneten Element zurückkehren.
      </p>
      <h6 className="bold mt-4" id="additonal-analyes-documents">
        Zusätzliche Analysen für Dokumente
      </h6>
      <h7 className="bold mt-4" id="tab-document">
        Tab: Dokument
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht mit den folgenden Details:
        <ul className="regular text-justify">
          <li>Titel des Dokuments</li>
          <li>Betreff</li>
          <li>Autor</li>
          <li>Toolchain</li>
          <li>Erstellungsdatum</li>
          <li>Letztes Bearbeitungsdatum</li>
          <li>Stichworte</li>
          <li>Dokumenten-Typ</li>
          <li>Anzahl Seiten</li>
          <li>Anzahl Bilder</li>
          <li>Modizifiert</li>
          <li>Verschlüsselt</li>
        </ul>
      </p>
      <h7 className="bold mt-4" id="tab-asset-structure-documents">
        Tab: Asset Struktur
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht über die Struktur des Dokuments. Über
        einen Klick auf die eingebettete Tabellen und Bilder springt man in den
        jeweiligen Tab, der weitere Details enthält. Über einen Klick auf andere
        eingebetteten Elemente springt man in die jeweilige Detailsicht zum
        ausgewählten Element.
      </p>
      <h7 className="bold mt-4" id="tab-embedded-tables-documents">
        Tab: Eingebettete Tabellen
      </h7>
      <p className="regular text-justify">
        Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument
        enthaltenen Tabellen.
      </p>
      <h7 className="bold mt-4" id="tab-embedded-images-documents">
        Tab: Eingebettete Bilder
      </h7>
      <p className="regular text-justify">
        Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument
        enthaltenen Bildern (Daten analog zu{" "}
        <a href="/help/data-formats-and-analysis#tab-image">
          Datentyp Bilder -{">"} Tab: Bild
        </a>
        ).
      </p>
      <h6 className="bold mt-4" id="additonal-analyes-structured">
        Zusätzliche Analysen für strukturierte Daten
      </h6>
      <h7 className="bold mt-4" id="asset-properties-structured">
        Asset Eigenschaften
      </h7>
      <p className="fw-500 regular mt-3" id="date-time-attribute-section">
        Date Time Attribute
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, ob eine Zeitangabe im Asset erkannt wurde. Falls
        ja, wird versucht, die zeitliche Abdeckung (von, bis) und die Frequenz
        der Datenpunkte im Asset zu ermitteln.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="temporal-frequency-section">
        Temporal Frequency
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, ob eine Frequenz ermittelt werden konnte, in der
        die Datenpunkte im Asset erzeugt wurden. Falls ja, wird untersucht, ob
        Lücken vorhanden sind und wenn ja wieviele.{" "}
      </p>
      <p className="fw-500 regular mt-3" id="data-type-consistency-section">
        Data Type Consistency
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset alle
        Werte in einer Spalte vom gleichen Typ sind. Falls nicht, kann über den
        entsprechenden Tab in der Detailansicht eingesehen werden, für welche
        Attribute Inkonsistenzen ermittelt wurden.
      </p>
      <p className="fw-500 regular mt-3" id="attribute-integrity-section">
        Attribute Integrity
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset für
        jede Spalte und Reihe ein Wert existiert. Falls nicht, kann über den
        entsprechenden Tab in der Detailansicht eingesehen werden, wie viele
        Werte für welche Spalte fehlen.
      </p>
      <p className="fw-500 regular mt-3" id="significant-variance-section">
        Significant Variance
      </p>
      <p className="regular text-justify">
        Dieses Icon zeigt an, ob eine signifikante Varianz in den Daten des
        Asset gefunden werden konnte. Falls ja, wird das Asset auf
        unterschiedliche Verteilungen untersucht. Die Ergebnisse werden im
        entsprechenden Tab in der EDP Detailansicht in grafischer und
        tabellarischer Form dokumentiert.{" "}
      </p>
      <h7 className="bold mt-4" id="data-science-info-structured">
        Bereich Data Science Info
      </h7>
      <p className="regular text-justify">
        Neben den generellen Angaben im Bereich Data Science Info für alle
        Datenformate, werden im Fall strukturierter Daten noch weitere
        Informationen hervorgehoben.{" "}
      </p>
      <p className="fw-500 regular mt-3">Datentypen</p>
      <p className="regular text-justify">
        Hier wird je im Asset vorhandenen Typ aus <i>numeric</i>, <i>string</i>{" "}
        und <i>date/time</i> angezeigt, wie viele Spalten dieses Typs im Asset
        enthalten sind. Eine detaillierte Ansicht zu den einzelnen Spalten ist
        im Tab Attributliste zu finden.
      </p>
      <p className="fw-500 regular mt-3">Zeitliche Abdeckung</p>
      <p className="regular text-justify">
        Falls Datums-/Zeitspalten im Asset vorhanden sind, wird hier der in den
        Daten abgedeckte Zeitraum angegeben.
      </p>
      <p className="fw-500 regular mt-3">Zeitliche Konsistenz</p>
      <p className="regular text-justify">
        Falls Datums-/Zeitspalten im Asset vorhanden sind, wird hier die
        niedrigste, lückenlos vorhandene Zeiteinheit hervorgehoben.
        Detailliertere Informationen sind im zugehörigen, gleichnamigen Tab zu
        finden.{" "}
      </p>
      <p className="fw-500 regular mt-3">Anzahl der Spalten</p>
      <p className="regular text-justify">
        Hier findet sich die Anzahl aller im Asset enthaltenen Spalten.
      </p>
      <p className="fw-500 regular mt-3">Anzahl der Zeilen</p>
      <p className="regular text-justify">
        Hier findet sich die Anzahl aller im Asset enthaltenen Zeilen.
      </p>
      <p className="fw-500 regular mt-3">Top 3 numerische Verteilungen</p>
      <p className="regular text-justify">
        Die häufigsten in diesem Asset aufgetretenen numerischen
        Werteverteilungen werden an dieser Stelle hervorgehen. Eine
        Gesamtübersicht der Werteverteilungen je numerischer Spalte ist im{" "}
        <i>Tab Numerische Werteverteilungen</i> zu finden.{" "}
      </p>
      <p className="fw-500 regular mt-3">String-Werteverteilung</p>
      <p className="regular text-justify">
        Hier wird zusammengefasst, ob die im Asset enthaltenen String-Spalten
        komplett (“all”) oder überwiegend (“many”) homogen oder herogen verteilt
        sind. Detaillierte Angaben sind im zugehörigen Tab zu finden.
      </p>
      <p className="fw-500 regular mt-3">Numerische Korrelationsanalyse</p>
      <p className="regular text-justify">
        Die detaillierten paarweise bestimmten Korrelationen zwischen
        numerischen Attributen in einem Asset sind im zugehörigen Tab zu finden.
        In der Data Science Info wird darüber zur vereinfachten Suche und
        Filterung eine Zusammenfassung gebildet:
      </p>
      <ul className="regular text-justify">
        <li>“no correlation”: Es liegt keine solche Korrelation im EDP vor.</li>
        <li>
          “partial correlation”: Es liegt mindestens eine solche Korrelation
          vor, die über 0,5 oder unter -0,5 liegt.
        </li>
        <li>
          “strong correlation”: Es liegt mindestens eine solche Korrelation vor,
          die über 0,8 oder unter -0,8 liegt.
        </li>
      </ul>
      <p className="fw-500 regular mt-3">Numerische Anomalieanalyse</p>
      <p className="regular text-justify">
        Zur vereinfachten Suche und Filterung liefert der{" "}
        <i>outlierRelativeCount</i> den durchschnittlicher Anteil der Anomalien
        über Perzentil, zScore und IQR, deren Details im zugehörigen Tab
        einzusehen sind.{" "}
      </p>
      <ul className="regular text-justify">
        <li>“no outliers”: Es sind keine Anomalien vorhanden.</li>
        <li>
          “few outliers”: Der durchschnittlicher Anteil der Anomalien beträgt
          bis zu 5%.
        </li>
        <li>
          “many outliers”: Der durchschnittlicher Anteil der Anomalien beträgt
          mehr als 5%.
        </li>
      </ul>
      <h7 className="bold mt-4" id="tab-attribute-list">
        Tab: Attributliste
      </h7>
      <p className="regular text-justify">
        Die Attributliste gibt zu jeder im Asset enthaltenen Spalte den Namen,
        Typ (<i>numeric, string, date/time</i>), die Spezifikation sowie eine
        ggf. ermittelte Periodizität an. Die Periodizität beschreibt ein für
        Datums-/Zeitspalten ermitteltes Interval, in dem Daten erfasst werden.
      </p>
      <h7 className="bold mt-4" id="tab-attribute-integrity">
        Tab: Vollständigkeit
      </h7>
      <p className="regular text-justify">
        Die Tabelle zur Attributvollständigkeit gibt zu jeder im Asset
        enthaltenen Spalte an, ob und wie viele Werte fehlen.
      </p>
      <h7 className="bold mt-4" id="tab-temporal-consistency">
        Tab: Zeitliche Konsistenz
      </h7>
      <p className="regular text-justify">
        Die Tabelle zur zeitlichen Konsistenz liefert für alle im Asset
        enthaltenen Datums-/Zeitspalten Angaben zur Lückenlosigkeit je
        Zeiteinheit.{" "}
      </p>
      <h7 className="bold mt-4" id="tab-numeric-value-distribution">
        Tab: Numerische Werteverteilung
      </h7>
      <p className="regular text-justify">
        Dieser Tab enthält Grafiken sowie eine Tabelle zur statistischen
        Werteverteilung je numerischem Attribut. Angegeben werden jeweils die
        ermittelte statistische Verteilung sowie ein Zähler, wie viele
        unterschiedliche Werte pro Attribut in einem Asset gefunden wurden. Die
        häufigsten in diesem Asset aufgetretenen Werteverteilungen werden
        darüber hinaus in der Data Science Info hervorgehoben.
      </p>
      <p className="regular text-justify">
        Geprüft wird dabei auf die folgenden Verteilungen:
        <ul className="regular text-justify">
          <li>Cauchy</li>
          <li>Exponpow</li>
          <li>Gamma</li>
          <li>Norm</li>
          <li>Powerlaw</li>
          <li>Rayleigh</li>
          <li>Uniform</li>
          <li>Maxwell</li>
        </ul>
      </p>
      <h7 className="bold mt-4" id="tab-string-value-distribuion">
        Tab: String-Werteverteilung
      </h7>
      <p className="regular text-justify">
        Dieser Tab enthält Grafiken sowie eine Tabelle zur kategorischen
        Häufigkeit von Werten pro String-basiertem Attribut in einem Asset.
        Unterschieden wird zwischen einer homogenen oder heterogenen Verteilung.
        Eine aufsummierte Angabe zur vorherrschenden Werteverteilung im gesamten
        Asset wird darüber hinaus in der Data Science Info hervorgehoben.
      </p>
      <h7 className="bold mt-4" id="tab-numeric-correlation-analysis">
        Tab: Numerische Korrelationsanalyse
      </h7>
      <p className="regular text-justify">
        Dieser Tab enthält eine Grafik zur paarweisen Bestimmung von
        Korrelationen zwischen numerischen Attributen in einem Asset. Eine rosa
        Färbung bedeutet eine starke positive Korrelation, die Werte beider
        Attribute bewegen sich in gleicher Richtung. Bei einer blauen Färbung
        liegt eine stark negative Korrelation vor, die Werte der Attribute
        bewegen sich in entgegengesetzte Richtungen. Bei einer grauen Färbung
        liegt keine bzw. kaum eine Korrelation vor.
      </p>
      <h7 className="bold mt-4" id="tab-numeric-outlier-analysis">
        Tab: Numerische Anomalie-Analyse
      </h7>
      <p className="regular text-justify">
        Dieser Tab enthält Grafiken sowie eine Tabelle zur Erkennung von
        Anomalien in den Werten der numerischen Attribute des Assets. Zur
        Ermittlung dieser wurden mehrere Verfahren durchgeführt
        (Perzentil-basiert, Z-Score und Inter-Quartile-Range). Die Liste liefert
        die statistischen, quantisierten Anomalie-Verteilungen pro Verfahren
        sowie die Anzahl der ermittelten Anomalien pro Attribut in einem Asset.
      </p>
      <h7 className="bold mt-4" id="tab-data-seasonality">
        Tab: Daten-Saisonalität
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet Grafiken, welche den zeitlichen Verlauf numerischer
        Attribute visualisieren (Original Data). Des Weiteren werden periodische
        Aktivitäten innerhalb dieser Daten analysiert und visualisiert
        (Seasonality). Dies sind Schwankungen eines Attributes, welche in
        zeitlich regelmäßigen Abständen wiederkehren. Der grobe Verlauf eines
        Attributes ohne die periodischen Einflüsse, wird als Trend bezeichnet
        und ist ebenso einsehbar. Alle Anteile eines Attributes, welche nicht
        von Trend und Saisonalität hergeleitet werden können, sind die so
        genannten “Residuals”.
      </p>
      <h6 className="bold mt-4" id="additional-analyses-semi-structured">
        Zusätzliche Analysen für semi-strukturierte Texte
      </h6>
      <h7 className="bold mt-4" id="tab-asset-structure-semi-structured">
        Tab: Asset Struktur
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht über die Struktur des Assets. Ein
        semi-strukturierter Text kann eine beliebige Anzahl strukturierter Texte
        enthalten. Über einen Klick auf eines dieser eingebetteten
        strukturierten Elemente springt man in die jeweilige Detailsicht.
      </p>
      <h7 className="bold mt-4" id="tab-schema-semi-structured">
        Tab: Schema
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht über das Schema des Assets.
      </p>
      <h6 className="bold mt-4" id="additional-analyses-unstructured">
        Zusätzliche Analysen für unstrukturierte Texte
      </h6>
      <h7 className="bold mt-4" id="tab-unstructured">
        Tab: Unstrukturierter Text
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht mit den folgenden Details:
        <ul className="regular text-justify">
          <li>Sprachen</li>
          <li>Anzahl Zeilen</li>
          <li>Anzahl Wörter</li>
          <li>
            Word-Cloud - Grafische Darstellung der Häufigkeit von Schlagwörtern
            im Text
          </li>
        </ul>
      </p>
      <h7 className="bold mt-4" id="tab-embedded-tables-unstructured">
        Tab: Eingebettete Tabellen
      </h7>
      <p className="regular text-justify">
        Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument
        enthaltenen Tabellen.
      </p>
      <h6 className="bold mt-4" id="additional-analyses-images">
        Zusätzliche Analysen für Bilder
      </h6>
      <h7 className="bold mt-4" id="tab-image">
        Tab: Bild
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht mit den folgenden Details:
        <ul className="regular text-justify">
          <li>Dateiformat (Codec)</li>
          <li>Farb-Modus (ColorMode)</li>
          <li>Auflösung (Resolution)</li>
          <li>Breite (Width)</li>
          <li>Höhe (Height)</li>
          <li>DPI (Punkte per Zoll, dots per inch)</li>
          <li>Helligkeit (Brightness)</li>
          <li>Unschärfe (Blurriness)</li>
          <li>Schärfe (Sharpness)</li>
          <li>Brisque</li>
          <li>Rauschen (Noise)</li>
          <li>
            geringer Kontrast (lowContrast) - hier wird zwischen false und true
            unterschieden
          </li>
          <li>elaScore</li>
        </ul>
      </p>
      <h6 className="bold mt-4" id="additional-analyses-videos">
        Zusätzliche Analysen für Videos
      </h6>
      <h7 className="bold mt-4" id="tab-video">
        Tab: Video
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht mit den folgenden Details:
        <ul className="regular text-justify">
          <li>Dateiformat (Codec)</li>
          <li>Auflösung in Pixeln (Resolution)</li>
          <li>Bildfrequenz (Frames per Second, FPS)</li>
          <li>Dauer in Sekunden (Duration)</li>
          <li>Video Pixel Format (PixelFormat)</li>
        </ul>
      </p>
      <h6 className="bold mt-4" id="additional-analyses-audio">
        Zusätzliche Analysen für Audiodaten
      </h6>
      <h7 className="bold mt-4" id="tab-audio">
        Tab: Audio
      </h7>
      <p className="regular text-justify">
        Dieser Tab bietet eine Übersicht mit den folgenden Details:
        <ul className="regular text-justify">
          <li>Dateiformat (Codec)</li>
          <li>Anzahl der Audiokanäle (Channels)</li>
          <li>Dauer in Sekunden (Duration)</li>
          <li>Sample-Rate in Sekunden (SampleRate)</li>
          <li>Bits pro Sekunde (BitRate)</li>
          <li>Bits pro Sample (BitsPerSample)</li>
          <li>Häufigkeitsverteilung über die Zeit (Spectogram)</li>
        </ul>
      </p>
    </div>
  );
};
