const formatsHelpText = {
    en: {
        fullContent:
            `
                <div class="col-md-10" id="asset-properties-topic">
                    More content for English help pages will follow soon.
                    Essential asset properties are displayed via the EDP asset properties. These include the following elements:
                    <ul>
                    <li class="py-2">
                        <span class="bold">EDP Quick View:</span> Clicking on this icon opens the EDP Quick View, which contains all the key data science information about an asset (see also EDP Quick View).
                    </li>
                    <li class="py-2" id="open-access-section">
                        <span class="bold">Open Access:</span> This icon indicates that an asset can be accessed via the EDP data source without registration.
                    </li>
                    <li class="py-2" id="closed-access-section">
                        <span class="bold">Closed Access:</span> This icon indicates that an asset can only be accessed via the EDP data source after registration.
                    </li>
                    <li class="py-2" id="date-time-attribute-section">
                        <span class="bold">Date Time Attribute:</span> This icon shows whether a time specification has been recognized in the asset. If yes, an attempt is made to determine the temporal coverage (from, to) and the frequency of the data points in the asset.
                    </li>
                    <li class="py-2" id="temporal-frequency-section">
                        <span class="bold">Temporal Frequency:</span> This icon shows whether a frequency could be determined in which the data points in the asset were generated. If so, the system checks whether there are any gaps and if so, how many.
                    </li>
                    <li class="py-2" id="data-type-consistency-section">
                        <span class="bold">Data Type Consistency:</span> This icon shows whether all values in a column of a structured text data asset are of the same type. If not, the EDP Detail View (see EDP Detail View) can be used to see for which attributes inconsistencies have been determined.
                    </li>
                    <li class="py-2" id="attribute-integrity-section">
                        <span class="bold">Attribute integrity:</span> This icon shows whether a value exists for each column and row in a structured text data asset. If not, the EDP Detail View (see EDP Detail View) can be used to see how many values have been determined for each column and row.
                    </li>
                    <li class="py-2" id="significant-variance-section">
                        <span class="bold">Significant Variance:</span> This icon indicates whether a significant variance was found in the asset data. If so, the asset is examined for different distributions. The results are documented in graphical and tabular form in the EDP Detail View (see EDP Detail View).
                    </li>
                    <li class="py-2" id="geo-location-section">
                        <span class="bold">Geo Location Attribute:</span> This icon indicates whether an asset contains geolocation information.
                    </li>
                    <li class="py-2" id="personal-data-section">
                        <span class="bold">Personal Data:</span> This icon indicates whether an asset contains personal data. If so, the order data agreement provided by the data provider is linked, if available.
                    </li>
                    <li class="py-2" id="asset-processing-status-section">
                        <span class="bold">Asset processing status:</span> The asset processing status indicates the degree of data maturity. A distinction is made between the following states:
                        <ul class="circles-list">
                            <li class="py-2"><strong>Original Data:</strong> The content of the asset has not been changed after creation.</li>
                            <li class="py-2"><strong>Processed Data:</strong> The content of the asset was redefined, converted, semantically cleansed and/or transformed in whole or in part after creation in order to improve the asset structure and/or increase consistency. The changes made are logged in the EDP Data Log (see also EDP Data Log) and the Original Data EDP is referenced for traceability.</li>
                            <li class="py-2"><strong>Refined Data:</strong> Assets with the maturity level Refined Data are optimized AI training data sets that combine data from one or more assets. The feature engineering rules and aggregations performed are documented in the EDP Data Log and the Processed Data or Original Data EDP is referenced for traceability.</li>
                            <li class="py-2"><strong>AI/ML Result Data:</strong> Assets with the maturity level AI/ML Result Data are data generated by an AI or an ML algorithm. Both the AI/ML information and the EDP of the Refined Data/Processes Data and/or Original Data Assets used for training or inference are referenced in the EDP Data Log.</li>
                        </ul>            
                    </li>
                </ul>           
            </div>
            `
    },
    de: {
        fullContent:
            `
                <div class="col-md-10">
                <h4 class="bold mt-4">Unterstützte Datenformate</h4>
                Es wird nach folgenden Datenformaten unterschieden: 
                <ul>
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
                <p>Die Analyse eines Data Assets erfolgt im EDPS auf Basis der in der nachfolgenden Illustration dargestellten Analyseverfahren:</p>
                <img src="analysis.png" alt="Analyseverfahren"> 
                <h4 class="bold mt-4">Datenstrukturen</h4>
                <p>Archive und Dokumente können weitere Elemente jedes oben gelisteten Formats beinhalten.</p>
                <p>Semi-strukturierter Text kann weitere strukturierte Text-Elemente beinhalten. Text kann weitere strukturierte Text-Elemente beinhalten.</p>
                <h4 class="bold mt-4">Analysen</h4>
                <p>Für alle Datenformate enthalten die entsprechenden EDP eine Basis an einheitlichen Informationen. Darüber hinaus gibt es zusätzliche Analysen und bereitgestellte Informationen je nach Datenformat.</p>
                <h5 class="bold mt-4">Generelle Analysen für alle Datenformate</h5>
                <h6 class="bold mt-4" id="asset-properties-general">Asset Eigenschaften</h6>
                <h7 class="bold mt-3" id="open-access-section">Open Access</h7>
                <p>Dieses Icon zeigt an, dass auf ein Asset ohne Registrierung über die EDP-Data Source zugegriffen werden kann. </p>
                <h7 class="bold mt-3" id="closed-access-section">Closed Access</h7>
                <p>Dieses Icon zeigt an, dass auf ein Asset nur nach Registrierung über die EDP-Data Source zugegriffen werden kann. </p>
                <h7 class="bold mt-3" id="asset-processing-status-section">Asset Verarbeitungszustand</h7>
                <p>Der Asset Verarbeitungszustand gibt den Datenreifegrad an.</p>
                <p>Es wird zwischen folgenden Zuständen unterschieden:</p>
                <ul>
                    <li><strong>Original Data:</strong> Der Inhalt des Assets wurde nach der Erzeugung nicht verändert.</li>
                    <li><strong>Processed Data:</strong> Der Inhalt des Assets wurde nach der Erzeugung ganz oder in Teilen re-definiert, konvertiert, semantisch bereinigt und/oder transformiert, um die Asset-Struktur zu verbessern und/oder die -Konsistenz zu erhöhen.</li>
                    <li><strong>Refined Data:</strong> Bei Assets mit dem Reifegrad Refined Data handelt es sich um optimierte KI-Trainingsdatensätze, die Daten aus einem oder mehreren Assets zusammenfassen.</li>
                    <li><strong>AI/ML Result Data:</strong> Bei Assets mit dem Reifegrad AI/ML Result Data handelt es sich um Daten, die durch eine KI bzw. durch einen ML Algorithmus erzeugt wurden.</li>
                </ul>            
                <h7 class="bold mt-3">Versionsangaben</h7>
                <p>Es sind unterschiedliche Versionsinformationen zu einem Asset zu unterscheiden:</p>
                <ul>
                    <li><strong>EDP Version:</strong> Versionsnummer innerhalb von daseen. Anhand dieser lässt sich erkennen, wie oft das EDP erfolgreich in daseen hochgeladen/geupdated wurde (initiale Version: 1).</li>
                    <li><strong>Asset Version:</strong>Vom Datenanbieter übermittelte Versionsnummer des Asset im Datenraum. Diese ist optional.</li>
                    <li><strong>Schema Version:</strong> Version des EDP Schemas, die zur Erstellung des EDP genutzt wurde. Ein Download des entsprechenden Schemas ist auf der Detailseite des EDP möglich.</li>
                    <li><strong>EDP Service Version:</strong> Version der Toolchain, die zur Generierung des EDP benutzt wurde.</li>
                </ul>
                <h7 class="bold mt-3">Datenformat-spezifische Asset Eigenschaften</h7>
                <p>Für strukturierte Daten werden zusätzliche Asset Eigenschaften ermittelt [<a href="/help#asset-properties-structured">mehr erfahren</a>].</p>
                <h6 class="bold mt-4" id="data-science-info-general">Bereich Data Science Info</h6>
                <h7 class="bold mt-3">Datenformat</h7>
                <p>Hier wird das Datenformat des EDP bzw. bei geschachtelten Strukturen des ausgewählten Elements angezeigt.</p>
                <h7 class="bold mt-3">Dateityp</h7>
                <p>Neben der Kategorisierung des Datenformats wird auch der eigentliche Dateityp angezeigt.</p>
                <h7 class="bold mt-3">Volumen</h7>
                <p>Angezeigt wird hier die Größe des Assets bei der Verarbeitung. Bei Archiven handelt es sich somit um die komprimierte Größe.</p> 
                <h7 class="bold mt-3">Sprachen</h7>
                <p>Das Asset wird auf die darin enthaltenen Sprachen geprüft.</p> 
                <h7 class="bold mt-3">Übertragungsart</h7>
                <p>Unterschieden wird hier zwischen statischen (“static”) und inflationären Daten (“inflationary“).</p> 
                <h7 class="bold mt-3">Unveränderlichkeit</h7>
                <p>Hierbei handelt es sich um die semantische Information, ob damit gerechnet werden kann, dass der Datensatz in Zukunft geändert werden wird (“mutable”) oder nicht (“immutable”). </p>
                <h7 class="bold mt-3">Datenformat-spezifische Angaben in der Data Science Info</h7>
                <p>Für die folgenden Datenformate gibt es zusätzliche Angaben in der Data Science Info:
                <ul>
                    <li><a href="/help#data-science-info-archive">Archive</a></li>
                    <li><a href="/help#data-science-info-structured">Strukturierte Daten</a></li>
                </ul></p>
                <h5 class="bold mt-4">Zusätzliche Analysen für Archive</h5>
                <h6 class="bold mt-4" id="data-science-info-archive">Bereich Data Science Info</h6>
                <h7 class="bold mt-3">Komprimierung</h7>
                <p>Hier wird der zur Komprimierung angewendete Algorithmus angezeigt.</p>
                <h7 class="bold mt-3">Unkomprimiertes Volumen</h7>
                <p>Als Ergänzung zum weiter oben angezeigten Volumen, das die komprimierte Größe anzeigt, ist an dieser Stelle die Größe des entpackten Archivs sichtbar.</p>
                <h6 class="bold mt-4">Tab: Asset Struktur</h6>
                <p>Dieser Tab bietet eine Übersicht über die Struktur des Archivs. Über einen Klick auf die eingebetteten Dateien springt man in die jeweiligen Details zum ausgewählten Element (Sicht entsprechend des jeweiligen Datenformats).</p>
                <h5 class="bold mt-4">Zusätzliche Analysen für Dokumente</h5>
                <h6 class="bold mt-4">Tab: Dokument</h6>
                <p>Dieser Tab bietet eine Übersicht mit den folgenden Details: 
                <ul>
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
                <h6 class="bold mt-4">Tab: Asset Struktur</h6>
                <p>Dieser Tab bietet eine Übersicht über die Struktur des Dokuments. Über einen Klick auf die eingebettete Tabellen und Bilder springt man in den jeweiligen Tab, der weitere Details enthält. Über einen Klick auf andere eingebetteten Elemente springt man in die jeweilige Detailsicht zum ausgewählten Element.</p>
                <h6 class="bold mt-4">Tab: Eingebettete Tabellen</h6>
                <p>Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument enthaltenen Tabellen.</p>
                <h6 class="bold mt-4">Tab: Eingebettete Bilder</h6>
                <p>Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument enthaltenen Bildern (Daten analog zu <a href="/help#tab-image">Datentyp Bilder -> Tab: Bild</a>).</p>
                <h5 class="bold mt-4">Zusätzliche Analysen für strukturierte Daten</h5>
                <h6 class="bold mt-4" id="asset-properties-structured">Asset Eigenschaften</h6>
                <h7 class="bold mt-3" id="date-time-attribute-section">Date Time Attribute</h7> 
                <p>Dieses Icon zeigt an, ob eine Zeitangabe im Asset erkannt wurde. Falls ja, wird versucht, die zeitliche Abdeckung (von, bis) und die Frequenz der Datenpunkte im Asset zu ermitteln. </p>
                <h7 class="bold mt-3" id="temporal-frequency-section">Temporal Frequency</h7> 
                <p>Dieses Icon zeigt an, ob eine Frequenz ermittelt werden konnte, in der die Datenpunkte im Asset erzeugt wurden. Falls ja, wird untersucht, ob Lücken vorhanden sind und wenn ja wieviele. </p>
                <h7 class="bold mt-3" id="data-type-consistency-section">Data Type Consistency</h7> 
                <p>Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset alle Werte in einer Spalte vom gleichen Typ sind. Falls nicht, kann über den entsprechenden Tab in der Detailansicht eingesehen werden, für welche Attribute Inkonsistenzen ermittelt wurden.</p> 
                <h7 class="bold mt-3" id="attribute-integrity-section">Attribute Integrity</h7> 
                <p>Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset für jede Spalte und Reihe ein Wert existiert. Falls nicht, kann über den entsprechenden Tab in der Detailansicht eingesehen werden, wie viele Werte für welche Spalte fehlen.</p> 
                <h7 class="bold mt-3" id="significant-variance-section">Significant Variance</h7> 
                <p>Dieses Icon zeigt an, ob eine signifikante Varianz in den Daten des Asset gefunden werden konnte. Falls ja, wird das Asset auf unterschiedliche Verteilungen untersucht. Die Ergebnisse werden im entsprechenden Tab in der EDP Detailansicht in grafischer und tabellarischer Form dokumentiert. </p>
                <h7 class="bold mt-3" id="allowed-for-ai-section">Allowed for AI Training</h7> 
                <p>Dieses Icon zeigt an, ob das Asset für AI Training genutzt werden darf. Für das AI/KI-Training mit öffentlich bereitgestellten Daten (eGov-Daten) werden Lizenzen wie Deutschland 2.0-Zero, PDDL und cc-zero empfohlen, da sie die notwendige Analyse und Bearbeitung der Daten erlauben, um die KI-Compliance sicherzustellen. Dafür sind qualitativ-validierte / kuratierte Daten nötig: Für einfache KI-Systeme nach ErwG 27 der KI-VO; bzw. für Hoch-Risiko nach Art. 10 KI-VO. </p>
                <h6 class="bold mt-4" id="data-science-info-structured">Bereich Data Science Info</h6>
                <p>Neben den generellen Angaben im Bereich Data Science Info für alle Datenformate, werden im Fall strukturierter Daten noch weitere Informationen hervorgehoben. </p>
                <h7 class="bold mt-3">Datentypen</h7>
                <p>Hier wird je im Asset vorhandenen Typ aus <i>numeric</i>, <i>string</i> und <i>date/time</i> angezeigt, wie viele Spalten dieses Typs im Asset enthalten sind. Eine detaillierte Ansicht zu den einzelnen Spalten ist im Tab Attributliste zu finden.</p>
                <h7 class="bold mt-3">Zeitliche Abdeckung</h7>
                <p>Falls Datums-/Zeitspalten im Asset vorhanden sind, wird hier der in den Daten abgedeckte Zeitraum angegeben.</p>
                <h7 class="bold mt-3">Zeitliche Konsistenz</h7>
                <p>Falls Datums-/Zeitspalten im Asset vorhanden sind, wird hier die niedrigste, lückenlos vorhandene Zeiteinheit hervorgehoben. Detailliertere Informationen sind im zugehörigen, gleichnamigen Tab zu finden. </p>
                <h7 class="bold mt-3">Anzahl der Spalten</h7>
                <p>Hier findet sich die Anzahl aller im Asset enthaltenen Spalten.</p>
                <h7 class="bold mt-3">Anzahl der Zeilen</h7>
                <p>Hier findet sich die Anzahl aller im Asset enthaltenen Zeilen.</p>
                <h7 class="bold mt-3">Top 3 numerische Verteilungen</h7>
                <p>Die häufigsten in diesem Asset aufgetretenen numerischen Werteverteilungen werden an dieser Stelle hervorgehen. Eine Gesamtübersicht der Werteverteilungen je numerischer Spalte ist im <i>Tab Numerische Werteverteilungen</i> zu finden. </p>
                <h7 class="bold mt-3">String-Werteverteilung</h7>
                <p>Hier wird zusammengefasst, ob die im Asset enthaltenen String-Spalten komplett (“all”) oder überwiegend (“many”) homogen oder herogen verteilt sind. Detaillierte Angaben sind im zugehörigen Tab zu finden.</p>
                <h7 class="bold mt-3">Numerische Korrelationsanalyse</h7>
                <p>Die detaillierten paarweise bestimmten Korrelationen zwischen numerischen Attributen in einem Asset sind im zugehörigen Tab zu finden. In der Data Science Info wird darüber zur vereinfachten Suche und Filterung eine Zusammenfassung gebildet:</p>
                <ul>
                    <li>“no correlation”: Es liegt keine solche Korrelation im EDP vor.</li>
                    <li>“partial correlation”: Es liegt mindestens eine solche Korrelation vor, die über 0,5 oder unter -0,5 liegt.</li>
                    <li>“strong correlation”: Es liegt mindestens eine solche Korrelation vor, die über 0,8 oder unter -0,8 liegt.</li>
                </ul>
                <h7 class="bold mt-3">Numerische Anomalieanalyse</h7>
                <p>Zur vereinfachten Suche und Filterung liefert der <i>outlierRelativeCount</i> den durchschnittlicher Anteil der Anomalien über Perzentil, zScore und IQR, deren Details im zugehörigen Tab einzusehen sind. </p>
                <ul>
                    <li>“no outliers”: Es sind keine Anomalien vorhanden.</li>
                    <li>“few outliers”: Der durchschnittlicher Anteil der Anomalien beträgt bis zu 5%.</li>
                    <li>“many outliers”: Der durchschnittlicher Anteil der Anomalien beträgt mehr als 5%.</li>
                </ul>
                <h7 class="bold mt-3">Daten-Saisonalität</h7>
                <p>Aktuell befindet sich diese Auswertung im Umbau.</p>
                <h6 class="bold mt-4">Tab: Attributliste</h6>
                <p>Die Attributliste gibt zu jeder im Asset enthaltenen Spalte den Namen, Typ (<i>numeric, string, date/time</i>), die Spezifikation sowie eine ggf. ermittelte Periodizität an. Die Periodizität beschreibt ein für Datums-/Zeitspalten ermitteltes Interval, in dem Daten erfasst werden.</p>
                <h6 class="bold mt-4">Tab: Vollständigkeit</h6>
                <p>Die Tabelle zur Attributvollständigkeit gibt zu jeder im Asset enthaltenen Spalte an, ob und wie viele Werte fehlen.</p>
                <h6 class="bold mt-4">Tab: Zeitliche Konsistenz</h6>
                <p>Die Tabelle zur zeitlichen Konsistenz liefert für alle im Asset enthaltenen Datums-/Zeitspalten Angaben zur Lückenlosigkeit je Zeiteinheit. </p>
                <h6 class="bold mt-4">Tab: Numerische Werteverteilung</h6> 
                <p>Dieser Tab enthält Grafiken sowie eine Tabelle zur statistischen Werteverteilung je numerischem Attribut. Angegeben werden jeweils die ermittelte statistische Verteilung sowie ein Zähler, wie viele unterschiedliche Werte pro Attribut in einem Asset gefunden wurden. Die häufigsten in diesem Asset aufgetretenen Werteverteilungen werden darüber hinaus in der Data Science Info hervorgehoben.</p>
                <p>Geprüft wird dabei auf die folgenden Verteilungen: 
                <ul>
                    <li>Cauchy</li>
                    <li>Exponpow</li>
                    <li>Gamma</li>
                    <li>Norm</li>
                    <li>Powerlaw</li>
                    <li>Rayleigh</li>
                    <li>Uniform</li>
                    <li>Maxwell</li>
                </ul></p>
                <h6 class="bold mt-4">Tab: String-Werteverteilung</h6>
                <p>Dieser Tab enthält Grafiken sowie eine Tabelle zur kategorischen Häufigkeit von Werten pro String-basiertem Attribut in einem Asset. Unterschieden wird zwischen einer homogenen oder heterogenen Verteilung. Eine aufsummierte Angabe zur vorherrschenden Werteverteilung im gesamten Asset wird darüber hinaus in der Data Science Info hervorgehoben.</p>
                <h6 class="bold mt-4">Tab: Numerische Korrelationsanalyse</h6> 
                <p>Dieser Tab enthält eine Grafik zur paarweisen Bestimmung von Korrelationen zwischen numerischen Attributen in einem Asset. Eine rosa Färbung bedeutet eine starke positive Korrelation, die Werte beider Attribute bewegen sich in gleicher Richtung. Bei einer blauen Färbung liegt eine stark negative Korrelation vor, die Werte der Attribute bewegen sich in entgegengesetzte Richtungen. Bei einer grauen Färbung liegt keine bzw. kaum eine Korrelation vor.</p>
                <h6 class="bold mt-4">Tab: Numerische Anomalie-Analyse</h6>
                <p>Dieser Tab enthält Grafiken sowie eine Tabelle zur Erkennung von Anomalien in den Werten der numerischen Attribute des Assets. Zur Ermittlung dieser wurden mehrere Verfahren durchgeführt (Perzentil-basiert, Z-Score und Inter-Quartile-Range). Die Liste liefert die statistischen, quantisierten Anomalie-Verteilungen pro Verfahren sowie die Anzahl der ermittelten Anomalien pro Attribut in einem Asset.</p>
                <h6 class="bold mt-4">Tab: Daten-Saisonalität</h6> 
                <p>Dieser Tab bietet Grafiken zu Wachstum/Trends, Saisonalität und Abweichungen/Anomalien über die Zeit. Jede numerische Spalte wurde dazu gegen jede Datums-/Zeitspalte auf Saisonalität analysiert. </p>
                <h5 class="bold mt-4">Zusätzliche Analysen für semi-strukturierte Texte</h5>
                <h6 class="bold mt-4">Tab: Asset Struktur</h6>
                <p>Dieser Tab bietet eine Übersicht über die Struktur des Assets. Ein semi-strukturierter Text kann eine beliebige Anzahl strukturierter Texte enthalten. Über einen Klick auf eines dieser eingebetteten strukturierten Elemente springt man in die jeweilige Detailsicht.</p>
                <h6 class="bold mt-4">Tab: Schema</h6>
                <p>Dieser Tab bietet eine Übersicht über das Schema des Assets.</p>
                <h5 class="bold mt-4">Zusätzliche Analysen für unstrukturierte Texte</h5>
                <h6 class="bold mt-4">Tab: Unstrukturierter Text</h6>
                <p>Dieser Tab bietet eine Übersicht mit den folgenden Details: 
                <ul>
                    <li>Sprachen</li>
                    <li>Anzahl Zeilen</li>
                    <li>Anzahl Wörter</li>
                </ul></p>
                <h6 class="bold mt-4">Tab: Eingebettete Tabellen</h6>
                <p>Falls vorhanden, bietet dieser Tab weitere Details zu den im Dokument enthaltenen Tabellen.</p>
                <h5 class="bold mt-4">Zusätzliche Analysen für Bilder</h5>
                <h6 class="bold mt-4">Tab: Bild</h6>
                <p>Dieser Tab bietet eine Übersicht mit den folgenden Details: 
                <ul>
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
                <h5 class="bold mt-4">Zusätzliche Analysen für Videos - ab 14.04.2025</h5>
                <h6 class="bold mt-4">Tab: Video</h6>
                <p>Details hierzu folgen.</p>
                <h5 class="bold mt-4">Zusätzliche Analysen für Audiodaten - ab 14.04.2025</h5>
                <h6 class="bold mt-4">Tab: Audio</h6>
                <p>Details hierzu folgen.</p>
                </div>
            `
    }
};

export default formatsHelpText;
