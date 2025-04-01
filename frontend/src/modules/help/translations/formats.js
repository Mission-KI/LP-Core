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
                <div class="col-md-10" id="asset-properties-topic">

                    Über die EDP Asset Eigenschaften werden wesentliche Asset Eigenschaften angezeigt. Dazu gehören folgende Elemente:
                    
                    <ul>
                    <li class="py-2">
                        EDP Quick-View: Mit Klick auf dieses Icon öffnet sich der EDP-Quick View, der alle wesentlichen Data Science Informationen zu einem Asset beinhaltet (siehe auch EDP Quick View).                     </li>
                    <li class="py-2" id="open-access-section">
                        Open Access: Dieses Icon zeigt an, das auf ein Asset ohne Registrierung über die EDP-Data Source zugegriffen werden kann. 
                    </li>
                    <li class="py-2" id="closed-access-section">
                        Closed Access: Dieses Icon zeigt an, das auf ein Asset nur nach Registrierung über die EDP-Data Source zugegriffen werden kann. 
                    </li>
                    <li class="py-2" id="date-time-attribute-section">
                        Date Time Attribute: Dieses Icon zeigt an, ob eine Zeitangabe im Asset erkannt wurde. Falls ja, wird versucht, die zeitliche Abdeckung (von, bis) und die Frequenz der Datenpunkte im Asset zu ermitteln. 
                    </li>
                    <li class="py-2" id="temporal-frequency-section">
                        Temporal Frequency: Dieses Icon zeigt an, ob eine Frequenz ermittelt werden konnte, in der die Datenpunkte im Asset erzeugt wurden. Falls ja, wird untersucht, ob Lücken vorhanden sind und wenn ja wieviele. 
                    </li>
                    <li class="py-2" id="data-type-consistency-section">
                        Data Type Consistency: Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset alle Werte in einer Spalte vom gleichen Typ sind. Falls nicht, kann über den EDP Detail View (siehe EDP Detail View) eingesehen werden, für welche Attribute Inkonsistenzen ermittelt wurden. 
                    </li>
                    <li class="py-2" id="attribute-integrity-section">
                        Attribute Integrity: Dieses Icon zeigt an, ob in einem strukturierten Textdaten Asset für jede Spalte und Reihe ein Wert existiert. Falls nicht, kann über den EDP Detail View (siehe EDP Detail View) eingesehen werden, wie viele Werte für pro Spalte fehlen. 
                    </li>
                    <li class="py-2" id="significant-variance-section">
                        Significant Variance: Dieses Icon zeigt an, ob eine signifikante Varianz in dem Daten des Asset gefunden werden konnte. Falls ja, wird das Asset auf unterschiedliche Verteilungen untersucht. Die Ergebnisse werden im EDP Detail View (siehe EDP Detail View) in grafischer und tabellarischer Form dokumentiert. 
                    </li>
                    <li class="py-2" id="geo-location-section">
                        Geo Location Attribute: Dieses Icon zeigt an, ob ein Asset Geolokationsinformationen enthält. 
                    </li>
                    <li class="py-2" id="personal-data-section">
                        Personal Data: Dieses Icon zeigt an, ob ein Asset personenbezogene Daten beinhaltet. Falls ja, wird die vom Datenanbieter bereitgestellte Auftragsdatenvereinbarung verlinkt, sofern diese vorliegt. 
                    </li>

                    <li class="py-2" id="asset-processing-status-section">
                        <span class="bold">Asset Verarbeitungszustand:</span> Der Asset Verarbeitungszustand gibt den Datenreifegrad an. Es wird zwischen folgenden Zuständen unterschieden:
                        <ul class="circles-list">
                            <li class="py-2"><strong>Original Data:</strong> Der Inhalt des Assets wurde nach der Erzeugung nicht verändert.</li>
                            <li class="py-2"><strong>Processed Data:</strong> Der Inhalt des Assets wurde nach der Erzeugung Ganz oder in Teilen re-definiert, konvertiert, semantisch bereinigt und/oder transformiert, um die Asset-Struktur zu verbessern und/oder die -Konsistenz zu erhöhen. Die vorgenommenen Änderungen werden im EDP Data Log protokolliert (siehe auch EDP Data Log) und der Original Data EDP zur Nachverfolgbarkeit referenziert.</li>
                            <li class="py-2"><strong>Refined Data:</strong> Bei Assets mit dem Reifegrad Refined Data handelt es sich um optimierte KI-Trainingsdatensätze, die Daten aus einem oder mehreren Assets zusammenfassen. Im EDP Data Log werden die Feature Engineering Regeln und vorgenommenen Aggregationen dokumentiert und die Processed Data bzw. Original Data EDP zur Nachverfolgbarkeit referenziert.</li>
                            <li class="py-2"><strong>AI/ML Result Data:</strong> Bei Assets mit dem Reifegrad AI/ML Result Data handelt es sich um Daten, die durch eine KI bzw. durch einen ML Algorithmus erzeugt wurden. Im EDP Data Log werden sowohl die KI/ML Informationen referenziert als auch die EDP der für das Training bzw. die Inferenz herangezogenen Refined Data/Processes Data und/oder Original Data Assets.</li>
                        </ul>            
                    </li>
                    
                </div>
            `
    }
};

export default formatsHelpText;
