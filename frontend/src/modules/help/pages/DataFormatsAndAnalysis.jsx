import { useTranslation } from "react-i18next";
import InfoAlert from "../../common/components/InfoAlert";
import analysisImg from '../assets/img/analysis.png'

const DataFormatsAndAnalysis = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    if (currentLanguage === "de") {
        return (
            <div className="col-md-10">
                <h2 className="bold mb-5">Datenformate und Analysen</h2>
                <h5 className="mt-5 mb-3">Unterstützte Datenformate</h5>
                Es wird nach folgenden Datenformaten unterschieden:
                <ul className="regular text-justify">
                    <li>Archive</li>
                    <li>Dokumente</li>
                    <li>Strukturierter Text</li>
                    <li>Semi-strukturierter Text</li>
                    <li>Unstrukturierter Text</li>
                    <li>Bilder</li>
                    <li>Videos (ab 14.04.2025 unterstützt)</li>
                    <li>Audiodaten (ab 14.04.2025 unterstützt)</li>
                    <li>Graphen (noch nicht unterstützt, Roadmap)</li>
                </ul>
                <p className="regular text-justify">Die Analyse eines Data Assets erfolgt im EDPS auf Basis der in der nachfolgenden Illustration dargestellten Analyseverfahren:</p>
                <img src={analysisImg} className="w-100" alt="Analyseverfahren" />
                <h5 className="mt-5 mb-3">Datenstrukturen</h5>
                <p className="regular text-justify">Archive und Dokumente können weitere Elemente jedes oben gelisteten Formats beinhalten.</p>
                <p className="regular text-justify">Semi-strukturierter Text kann weitere strukturierte Text-Elemente beinhalten. Text kann weitere strukturierte Text-Elemente beinhalten.</p>
                <h5 className="mt-5 mb-3">Analysen</h5>
                <p className="regular text-justify">Für alle Datenformate enthalten die entsprechenden EDP eine Basis an einheitlichen Informationen. Darüber hinaus gibt es zusätzliche Analysen und bereitgestellte Informationen je nach Datenformat.</p>
                <h5 className="mt-5 mb-3">Generelle Analysen für alle Datenformate</h5>
                <h6 className="bold mt-4" id="asset-properties-general">Asset Eigenschaften</h6>
                <p className="fw-500 regular mt-3" id="open-access-section">Open Access</p>
                <p className="regular text-justify">Dieses Icon zeigt an, dass auf ein Asset ohne Registrierung über die EDP-Data Source zugegriffen werden kann. </p>
                <p className="fw-500 regular mt-3" id="closed-access-section">Closed Access</p>
                <p className="regular text-justify">Dieses Icon zeigt an, dass auf ein Asset nur nach Registrierung über die EDP-Data Source zugegriffen werden kann. </p>
                <p className="fw-500 regular mt-3" id="asset-processing-status-section">Asset Verarbeitungszustand</p>
                <p className="regular text-justify">Der Asset Verarbeitungszustand gibt den Datenreifegrad an.</p>
                <p className="regular text-justify">Es wird zwischen folgenden Zuständen unterschieden:</p>
                <ul className="regular text-justify">
                    <li><span className="fw-500">Original Data:</span> Der Inhalt des Assets wurde nach der Erzeugung nicht verändert.</li>
                    <li><span className="fw-500">Processed Data:</span> Der Inhalt des Assets wurde nach der Erzeugung ganz oder in Teilen re-definiert, konvertiert, semantisch bereinigt und/oder transformiert, um die Asset-Struktur zu verbessern und/oder die -Konsistenz zu erhöhen.</li>
                    <li><span className="fw-500">Refined Data:</span> Bei Assets mit dem Reifegrad Refined Data handelt es sich um optimierte KI-Trainingsdatensätze, die Daten aus einem oder mehreren Assets zusammenfassen.</li>
                    <li><span className="fw-500">AI/ML Result Data:</span> Bei Assets mit dem Reifegrad AI/ML Result Data handelt es sich um Daten, die durch eine KI bzw. durch einen ML Algorithmus erzeugt wurden.</li>
                </ul>
                <p className="fw-500 regular mt-3" id="allowed-for-ai-section">Allowed for AI Training</p>
                <p className="regular text-justify">Dieses Icon zeigt an, ob das Asset für AI Training genutzt werden darf. Für das AI/KI-Training mit öffentlich bereitgestellten Daten (eGov-Daten) werden Lizenzen wie Deutschland 2.0-Zero, PDDL und cc-zero empfohlen, da sie die notwendige Analyse und Bearbeitung der Daten erlauben, um die KI-Compliance sicherzustellen. Dafür sind qualitativ-validierte / kuratierte Daten nötig: Für einfache KI-Systeme nach ErwG 27 der KI-VO; bzw. für Hoch-Risiko nach Art. 10 KI-VO. </p>
                <p className="fw-500 regular mt-3">Versionsangaben</p>
                <p className="regular text-justify">Es sind unterschiedliche Versionsinformationen zu einem Asset zu unterscheiden:</p>
                <ul className="regular text-justify">
                    <li><span className="fw-500">EDP Version:</span> Versionsnummer innerhalb von daseen. Anhand dieser lässt sich erkennen, wie oft das EDP erfolgreich in daseen hochgeladen/geupdated wurde (initiale Version: 1).</li>
                    <li><span className="fw-500">Asset Version:</span>Vom Datenanbieter übermittelte Versionsnummer des Asset im Datenraum. Diese ist optional.</li>
                    <li><span className="fw-500">Schema Version:</span> Version des EDP Schemas, die zur Erstellung des EDP genutzt wurde. Ein Download des entsprechenden Schemas ist auf der Detailseite des EDP möglich.</li>
                    <li><span className="fw-500">EDP Service Version:</span> Version der Toolchain, die zur Generierung des EDP benutzt wurde.</li>
                </ul>
                <p className="fw-500 regular mt-3">Datenformat-spezifische Asset Eigenschaften</p>
                <p className="regular text-justify">Für strukturierte Daten werden zusätzliche Asset Eigenschaften ermittelt [<a href="/help#asset-properties-structured">mehr erfahren</a>].</p>
                <h6 className="bold mt-4" id="data-science-info-general">Bereich Data Science Info</h6>
                <p className="fw-500 regular mt-3">Datenformat</p>
                <p className="regular text-justify">Hier wird das Datenformat des EDP bzw. bei geschachtelten Strukturen des ausgewählten Elements angezeigt.</p>
                <p className="fw-500 regular mt-3">Dateityp</p>
                <p className="regular text-justify">Neben der Kategorisierung des Datenformats wird auch der eigentliche Dateityp angezeigt.</p>
                <p className="fw-500 regular mt-3">Volumen</p>
                <p className="regular text-justify">Angezeigt wird hier die Größe des Assets bei der Verarbeitung. Bei Archiven handelt es sich somit um die komprimierte Größe.</p>
                <p className="fw-500 regular mt-3">Sprachen</p>
                <p className="regular text-justify">Das Asset wird auf die darin enthaltenen Sprachen geprüft.</p>
                <p className="fw-500 regular mt-3">Übertragungsart</p>
                <p className="regular text-justify">Unterschieden wird hier zwischen statischen (“static”) und inflationären Daten (“inflationary“).</p>
                <p className="fw-500 regular mt-3">Unveränderlichkeit</p>
                <p className="regular text-justify">Hierbei handelt es sich um die semantische Information, ob damit gerechnet werden kann, dass der Datensatz in Zukunft geändert werden wird (“mutable”) oder nicht (“immutable”). </p>
                <p className="fw-500 regular mt-3">Datenformat-spezifische Angaben in der Data Science Info</p>
                <p className="regular text-justify">Für die folgenden Datenformate gibt es zusätzliche Angaben in der Data Science Info:
                    <ul className="regular text-justify">
                        <li><a href="/help#data-science-info-archive">Archive</a></li>
                        <li><a href="/help#data-science-info-structured">Strukturierte Daten</a></li>
                    </ul></p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für Archive</h5>
                <h6 className="bold mt-4" id="data-science-info-archive">Bereich Data Science Info</h6>
                <p className="fw-500 regular mt-3">Komprimierung</p>
                <p className="regular text-justify">Hier wird der zur Komprimierung angewendete Algorithmus angezeigt.</p>
                <p className="fw-500 regular mt-3">Unkomprimiertes Volumen</p>
                <p className="regular text-justify">Als Ergänzung zum weiter oben angezeigten Volumen, das die komprimierte Größe anzeigt, ist an dieser Stelle die Größe des entpackten Archivs sichtbar.</p>
                <h6 className="bold mt-4">Tab: Asset Struktur</h6>
                <p className="regular text-justify">Dieser Tab bietet eine Übersicht über die Struktur des Archivs. Über einen Klick auf die eingebetteten Dateien springt man in die jeweiligen Details zum ausgewählten Element (Sicht entsprechend des jeweiligen Datenformats).</p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für Dokumente</h5>
                <h6 className="bold mt-4">Tab: Dokument</h6>
                <p className="regular text-justify">Dieser Tab bietet eine Übersicht mit den folgenden Details:
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
                    </ul></p>
                <h6 className="bold mt-4">Tab: Asset Struktur</h6>
                <p className="regular text-justify">Dieser Tab bietet eine Übersicht über die Struktur des Dokuments. Über einen Klick auf die eingebettete Tabellen und Bilder springt man in den jeweiligen Tab, der weitere Details enthält. Über einen Klick auf andere eingebetteten Elemente springt man in die jeweilige Detailsicht zum ausgewählten Element.</p>
                <h6 className="bold mt-4">Tab: Eingebettete Tabellen</h6>
                <p className="regular text-justify">Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument enthaltenen Tabellen.</p>
                <h6 className="bold mt-4">Tab: Eingebettete Bilder</h6>
                <p className="regular text-justify">Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument enthaltenen Bildern (Daten analog zu <a href="/help#tab-image">Datentyp Bilder -{">"} Tab: Bild</a>).</p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für strukturierte Daten</h5>
                <h6 className="bold mt-4" id="asset-properties-structured">Asset Eigenschaften</h6>
                <p className="fw-500 regular mt-3" id="date-time-attribute-section">Date Time Attribute</p>
                <p className="regular text-justify">Dieses Icon zeigt an, ob eine Zeitangabe im Asset erkannt wurde. Falls ja, wird versucht, die zeitliche Abdeckung (von, bis) und die Frequenz der Datenpunkte im Asset zu ermitteln. </p>
                <p className="fw-500 regular mt-3" id="temporal-frequency-section">Temporal Frequency</p>
                <p className="regular text-justify">Dieses Icon zeigt an, ob eine Frequenz ermittelt werden konnte, in der die Datenpunkte im Asset erzeugt wurden. Falls ja, wird untersucht, ob Lücken vorhanden sind und wenn ja wieviele. </p>
                <p className="fw-500 regular mt-3" id="data-type-consistency-section">Data Type Consistency</p>
                <p className="regular text-justify">Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset alle Werte in einer Spalte vom gleichen Typ sind. Falls nicht, kann über den entsprechenden Tab in der Detailansicht eingesehen werden, für welche Attribute Inkonsistenzen ermittelt wurden.</p>
                <p className="fw-500 regular mt-3" id="attribute-integrity-section">Attribute Integrity</p>
                <p className="regular text-justify">Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset für jede Spalte und Reihe ein Wert existiert. Falls nicht, kann über den entsprechenden Tab in der Detailansicht eingesehen werden, wie viele Werte für welche Spalte fehlen.</p>
                <p className="fw-500 regular mt-3" id="significant-variance-section">Significant Variance</p>
                <p className="regular text-justify">Dieses Icon zeigt an, ob eine signifikante Varianz in den Daten des Asset gefunden werden konnte. Falls ja, wird das Asset auf unterschiedliche Verteilungen untersucht. Die Ergebnisse werden im entsprechenden Tab in der EDP Detailansicht in grafischer und tabellarischer Form dokumentiert. </p>
                <h6 className="bold mt-4" id="data-science-info-structured">Bereich Data Science Info</h6>
                <p className="regular text-justify">Neben den generellen Angaben im Bereich Data Science Info für alle Datenformate, werden im Fall strukturierter Daten noch weitere Informationen hervorgehoben. </p>
                <p className="fw-500 regular mt-3">Datentypen</p>
                <p className="regular text-justify">Hier wird je im Asset vorhandenen Typ aus <i>numeric</i>, <i>string</i> und <i>date/time</i> angezeigt, wie viele Spalten dieses Typs im Asset enthalten sind. Eine detaillierte Ansicht zu den einzelnen Spalten ist im Tab Attributliste zu finden.</p>
                <p className="fw-500 regular mt-3">Zeitliche Abdeckung</p>
                <p className="regular text-justify">Falls Datums-/Zeitspalten im Asset vorhanden sind, wird hier der in den Daten abgedeckte Zeitraum angegeben.</p>
                <p className="fw-500 regular mt-3">Zeitliche Konsistenz</p>
                <p className="regular text-justify">Falls Datums-/Zeitspalten im Asset vorhanden sind, wird hier die niedrigste, lückenlos vorhandene Zeiteinheit hervorgehoben. Detailliertere Informationen sind im zugehörigen, gleichnamigen Tab zu finden. </p>
                <p className="fw-500 regular mt-3">Anzahl der Spalten</p>
                <p className="regular text-justify">Hier findet sich die Anzahl aller im Asset enthaltenen Spalten.</p>
                <p className="fw-500 regular mt-3">Anzahl der Zeilen</p>
                <p className="regular text-justify">Hier findet sich die Anzahl aller im Asset enthaltenen Zeilen.</p>
                <p className="fw-500 regular mt-3">Top 3 numerische Verteilungen</p>
                <p className="regular text-justify">Die häufigsten in diesem Asset aufgetretenen numerischen Werteverteilungen werden an dieser Stelle hervorgehen. Eine Gesamtübersicht der Werteverteilungen je numerischer Spalte ist im <i>Tab Numerische Werteverteilungen</i> zu finden. </p>
                <p className="fw-500 regular mt-3">String-Werteverteilung</p>
                <p className="regular text-justify">Hier wird zusammengefasst, ob die im Asset enthaltenen String-Spalten komplett (“all”) oder überwiegend (“many”) homogen oder herogen verteilt sind. Detaillierte Angaben sind im zugehörigen Tab zu finden.</p>
                <p className="fw-500 regular mt-3">Numerische Korrelationsanalyse</p>
                <p className="regular text-justify">Die detaillierten paarweise bestimmten Korrelationen zwischen numerischen Attributen in einem Asset sind im zugehörigen Tab zu finden. In der Data Science Info wird darüber zur vereinfachten Suche und Filterung eine Zusammenfassung gebildet:</p>
                <ul className="regular text-justify">
                    <li>“no correlation”: Es liegt keine solche Korrelation im EDP vor.</li>
                    <li>“partial correlation”: Es liegt mindestens eine solche Korrelation vor, die über 0,5 oder unter -0,5 liegt.</li>
                    <li>“strong correlation”: Es liegt mindestens eine solche Korrelation vor, die über 0,8 oder unter -0,8 liegt.</li>
                </ul>
                <p className="fw-500 regular mt-3">Numerische Anomalieanalyse</p>
                <p className="regular text-justify">Zur vereinfachten Suche und Filterung liefert der <i>outlierRelativeCount</i> den durchschnittlicher Anteil der Anomalien über Perzentil, zScore und IQR, deren Details im zugehörigen Tab einzusehen sind. </p>
                <ul className="regular text-justify">
                    <li>“no outliers”: Es sind keine Anomalien vorhanden.</li>
                    <li>“few outliers”: Der durchschnittlicher Anteil der Anomalien beträgt bis zu 5%.</li>
                    <li>“many outliers”: Der durchschnittlicher Anteil der Anomalien beträgt mehr als 5%.</li>
                </ul>
                <p className="fw-500 regular mt-3">Daten-Saisonalität</p>
                <p className="regular text-justify">Aktuell befindet sich diese Auswertung im Umbau.</p>
                <h6 className="bold mt-4">Tab: Attributliste</h6>
                <p className="regular text-justify">Die Attributliste gibt zu jeder im Asset enthaltenen Spalte den Namen, Typ (<i>numeric, string, date/time</i>), die Spezifikation sowie eine ggf. ermittelte Periodizität an. Die Periodizität beschreibt ein für Datums-/Zeitspalten ermitteltes Interval, in dem Daten erfasst werden.</p>
                <h6 className="bold mt-4">Tab: Vollständigkeit</h6>
                <p className="regular text-justify">Die Tabelle zur Attributvollständigkeit gibt zu jeder im Asset enthaltenen Spalte an, ob und wie viele Werte fehlen.</p>
                <h6 className="bold mt-4">Tab: Zeitliche Konsistenz</h6>
                <p className="regular text-justify">Die Tabelle zur zeitlichen Konsistenz liefert für alle im Asset enthaltenen Datums-/Zeitspalten Angaben zur Lückenlosigkeit je Zeiteinheit. </p>
                <h6 className="bold mt-4">Tab: Numerische Werteverteilung</h6>
                <p className="regular text-justify">Dieser Tab enthält Grafiken sowie eine Tabelle zur statistischen Werteverteilung je numerischem Attribut. Angegeben werden jeweils die ermittelte statistische Verteilung sowie ein Zähler, wie viele unterschiedliche Werte pro Attribut in einem Asset gefunden wurden. Die häufigsten in diesem Asset aufgetretenen Werteverteilungen werden darüber hinaus in der Data Science Info hervorgehoben.</p>
                <p className="regular text-justify">Geprüft wird dabei auf die folgenden Verteilungen:
                    <ul className="regular text-justify">
                        <li>Cauchy</li>
                        <li>Exponpow</li>
                        <li>Gamma</li>
                        <li>Norm</li>
                        <li>Powerlaw</li>
                        <li>Rayleigh</li>
                        <li>Uniform</li>
                        <li>Maxwell</li>
                    </ul></p>
                <h6 className="bold mt-4">Tab: String-Werteverteilung</h6>
                <p className="regular text-justify">Dieser Tab enthält Grafiken sowie eine Tabelle zur kategorischen Häufigkeit von Werten pro String-basiertem Attribut in einem Asset. Unterschieden wird zwischen einer homogenen oder heterogenen Verteilung. Eine aufsummierte Angabe zur vorherrschenden Werteverteilung im gesamten Asset wird darüber hinaus in der Data Science Info hervorgehoben.</p>
                <h6 className="bold mt-4">Tab: Numerische Korrelationsanalyse</h6>
                <p className="regular text-justify">Dieser Tab enthält eine Grafik zur paarweisen Bestimmung von Korrelationen zwischen numerischen Attributen in einem Asset. Eine rosa Färbung bedeutet eine starke positive Korrelation, die Werte beider Attribute bewegen sich in gleicher Richtung. Bei einer blauen Färbung liegt eine stark negative Korrelation vor, die Werte der Attribute bewegen sich in entgegengesetzte Richtungen. Bei einer grauen Färbung liegt keine bzw. kaum eine Korrelation vor.</p>
                <h6 className="bold mt-4">Tab: Numerische Anomalie-Analyse</h6>
                <p className="regular text-justify">Dieser Tab enthält Grafiken sowie eine Tabelle zur Erkennung von Anomalien in den Werten der numerischen Attribute des Assets. Zur Ermittlung dieser wurden mehrere Verfahren durchgeführt (Perzentil-basiert, Z-Score und Inter-Quartile-Range). Die Liste liefert die statistischen, quantisierten Anomalie-Verteilungen pro Verfahren sowie die Anzahl der ermittelten Anomalien pro Attribut in einem Asset.</p>
                <h6 className="bold mt-4">Tab: Daten-Saisonalität</h6>
                <p className="regular text-justify">Dieser Tab bietet Grafiken zu Wachstum/Trends, Saisonalität und Abweichungen/Anomalien über die Zeit. Jede numerische Spalte wurde dazu gegen jede Datums-/Zeitspalte auf Saisonalität analysiert. </p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für semi-strukturierte Texte</h5>
                <h6 className="bold mt-4">Tab: Asset Struktur</h6>
                <p className="regular text-justify">Dieser Tab bietet eine Übersicht über die Struktur des Assets. Ein semi-strukturierter Text kann eine beliebige Anzahl strukturierter Texte enthalten. Über einen Klick auf eines dieser eingebetteten strukturierten Elemente springt man in die jeweilige Detailsicht.</p>
                <h6 className="bold mt-4">Tab: Schema</h6>
                <p className="regular text-justify">Dieser Tab bietet eine Übersicht über das Schema des Assets.</p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für unstrukturierte Texte</h5>
                <h6 className="bold mt-4">Tab: Unstrukturierter Text</h6>
                <p className="regular text-justify">Dieser Tab bietet eine Übersicht mit den folgenden Details:
                    <ul className="regular text-justify">
                        <li>Sprachen</li>
                        <li>Anzahl Zeilen</li>
                        <li>Anzahl Wörter</li>
                    </ul></p>
                <h6 className="bold mt-4">Tab: Eingebettete Tabellen</h6>
                <p className="regular text-justify">Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument enthaltenen Tabellen.</p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für Bilder</h5>
                <h6 className="bold mt-4">Tab: Bild</h6>
                <p className="regular text-justify">Dieser Tab bietet eine Übersicht mit den folgenden Details:
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
                        <li>geringer Kontrast (lowContrast) - hier wird zwischen false und true unterschieden</li>
                        <li>elaScore</li>
                    </ul></p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für Videos - ab 14.04.2025</h5>
                <h6 className="bold mt-4">Tab: Video</h6>
                <p className="regular text-justify">Details hierzu folgen.</p>
                <h5 className="mt-5 mb-3">Zusätzliche Analysen für Audiodaten - ab 14.04.2025</h5>
                <h6 className="bold mt-4">Tab: Audio</h6>
                <p className="regular text-justify">Details hierzu folgen.</p>
            </div>
        );
    }

    return (
        <div className="col-md-10">
            <h2 className="bold mb-3">Data Formats and Analysis</h2>
            <InfoAlert text="More content for English help pages will follow soon." />
            <p className="regular text-justify mt-5">
                Essential asset properties are displayed via the EDP asset properties. These include the following elements:
            </p>
            <ul className="regular text-justify">
                <li className="py-2">
                    <span className="fw-500">EDP Quick View:</span> Clicking on this icon opens the EDP Quick View, which contains all the key data science information about an asset (see also EDP Quick View).
                </li>
                <li className="py-2" id="open-access-section">
                    <span className="fw-500">Open Access:</span> This icon indicates that an asset can be accessed via the EDP data source without registration.
                </li>
                <li className="py-2" id="closed-access-section">
                    <span className="fw-500">Closed Access:</span> This icon indicates that an asset can only be accessed via the EDP data source after registration.
                </li>
                <li className="py-2" id="date-time-attribute-section">
                    <span className="fw-500">Date Time Attribute:</span> This icon shows whether a time specification has been recognized in the asset. If yes, an attempt is made to determine the temporal coverage (from, to) and the frequency of the data points in the asset.
                </li>
                <li className="py-2" id="temporal-frequency-section">
                    <span className="fw-500">Temporal Frequency:</span> This icon shows whether a frequency could be determined in which the data points in the asset were generated. If so, the system checks whether there are any gaps and if so, how many.
                </li>
                <li className="py-2" id="data-type-consistency-section">
                    <span className="fw-500">Data Type Consistency:</span> This icon shows whether all values in a column of a structured text data asset are of the same type. If not, the EDP Detail View (see EDP Detail View) can be used to see for which attributes inconsistencies have been determined.
                </li>
                <li className="py-2" id="attribute-integrity-section">
                    <span className="fw-500">Attribute integrity:</span> This icon shows whether a value exists for each column and row in a structured text data asset. If not, the EDP Detail View (see EDP Detail View) can be used to see how many values have been determined for each column and row.
                </li>
                <li className="py-2" id="significant-variance-section">
                    <span className="fw-500">Significant Variance:</span> This icon indicates whether a significant variance was found in the asset data. If so, the asset is examined for different distributions. The results are documented in graphical and tabular form in the EDP Detail View (see EDP Detail View).
                </li>
                <li className="py-2" id="geo-location-section">
                    <span className="fw-500">Geo Location Attribute:</span> This icon indicates whether an asset contains geolocation information.
                </li>
                <li className="py-2" id="personal-data-section">
                    <span className="fw-500">Personal Data:</span> This icon indicates whether an asset contains personal data. If so, the order data agreement provided by the data provider is linked, if available.
                </li>
                <li className="py-2" id="asset-processing-status-section">
                    <span className="fw-500">Asset processing status:</span> The asset processing status indicates the degree of data maturity. A distinction is made between the following states:
                    <ul className="regular text-justify circles-list">
                        <li className="py-2"><span className="fw-500">Original Data:</span> The content of the asset has not been changed after creation.</li>
                        <li className="py-2"><span className="fw-500">Processed Data:</span> The content of the asset was redefined, converted, semantically cleansed and/or transformed in whole or in part after creation in order to improve the asset structure and/or increase consistency. The changes made are logged in the EDP Data Log (see also EDP Data Log) and the Original Data EDP is referenced for traceability.</li>
                        <li className="py-2"><span className="fw-500">Refined Data:</span> Assets with the maturity level Refined Data are optimized AI training data sets that combine data from one or more assets. The feature engineering rules and aggregations performed are documented in the EDP Data Log and the Processed Data or Original Data EDP is referenced for traceability.</li>
                        <li className="py-2"><span className="fw-500">AI/ML Result Data:</span> Assets with the maturity level AI/ML Result Data are data generated by an AI or an ML algorithm. Both the AI/ML information and the EDP of the Refined Data/Processes Data and/or Original Data Assets used for training or inference are referenced in the EDP Data Log.</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default DataFormatsAndAnalysis;
