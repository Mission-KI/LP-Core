const basicsHelpText = {
    en: {
        fullContent:
            `
            <div class="col-md-10">
                English help pages will follow soon.
            </div>
            `
    },
    de: {
        fullContent:
            `
            <div class="col-md-10">
                <h4 class="bold mb-5">Motivation</h4>
                <p>Vertrauenswürdige künstliche Intelligenz (“KI”) benötigt für effektives Training und präzise Vorhersagen vor allem qualitativ hochwertige Daten. Obwohl täglich enorme Datenmengen entstehen, liegt nur ein Teil davon in verwertbarer, kuratierter Form vor. Eine zentrale Herausforderung besteht darin, dass bisher keine Suchfunktion existiert, mit der man über verschiedene Datenräume und -portale hinweg gezielt nach Datensätzen anhand von analytischen Eigenschaften und unabhängig der zahlreichen domänenspezifischen Onthologien suchen kann. </p>
                <p>Hier setzt die Dataset Search Engine (“daseen”) in Verbindung mit dem verteilten Microservice Dienst Extended Dataset Profile Service (“EDPS”) an. Daten Assets werden mit Hilfe des EDPS so nah wie möglich und so nah wie nötig beim Datenanbieter auf ihre analytischen Eigenschaften untersucht. Diese werden dann standardisiert und maschinenlesbar in einem Extended Dataset Profile (“EDP”) zusammengefasst. Dabei kann der EDP flexibel durch Datenanbieter und Onthologie spezifische Metadaten wie z.B. eine Beschreibung, den Verarbeitungsstatus oder Datenlizenzbestimmungen erweitert werden. Nach Freigabe durch den Datenanbieter kann der EDP dann auf daseen veröffentlicht werden und das Daten Asset Datenportal- und Datenraum-übergreifend anhand aller im EDP gespeicherten Metadaten gefunden werden. Das eigentliche Asset verbleibt dabei immer beim Anbieter.</p>
                <p>Um den Einstieg in die Welt der Daten zu vereinfachen, sind die EDP nach folgenden Kategorien in einer vorgeschalteten Landing Page vorsortiert.</p>
                <ul>
                    <li>Mobilität</li>
                    <li>Verwaltung und öffentliche Hand</li>
                    <li>Industrie und Produktion</li>
                    <li>Geodaten und Wetter</li>
                    <li>Umwelt, Ernährung und Landwirtschaft</li>
                    <li>Energie</li>
                    <li>Kultur und Medien</li>
                    <li>Gesundheit, Pharma und Medizin</li>
                    <li>Bildung, Forschung und Wissenschaft</li>
                    <li>Immobilien und Finanzen</li>
                </ul>
                <p>Über den Link <a href="https://app.daseen.de/" target="_blank"> kann die Suche direkt aufgerufen werden.</p>
                <p>Nachfolgende Grafik illustriert die zugrundeliegende Zielarchitektur. </p>
                
                TO DO: ADD IMAGE HERE (see Confluence)

                <h4 class="bold mb-5">Zielgruppen und Anwendungsfälle</h4>
                <p>Nachfolgender Absatz beschreibt die unterschiedlichen Zielgruppen und Anwendungsfälle. </p>
                <p>Dabei werden folgende drei Benutzergruppen und Hauptanwendungsfälle unterschieden:</p>
                <ul>
                    <li>Datennutzer: Gezielte Suche nach inhaltlich, kommerziell, rechtlich und analytisch passenden Datensätzen für datenbasierte Analysen, trainieren und von KI-Modellen oder eines anderen Datendienstes.</li>
                    <li>Datenanbieter: Eine automatisierte und einheitliche Erstellung einer umfassenden Metadatenbeschreibung für eigene Datensätze sorgt für eine bessere Auffindbarkeit und Bewertung – ohne dass der Datennutzer auf den eigentlichen Datensatz zugreifen muss.</li>
                    <li>Für Betreiber: Durch Listen auf daseen wird mehr Reichweite und neue Kundengruppen durch höhere Sichtbarkeit erzielt. Bei geschlossenen Datenräumen kann das Datenangebot der Allgemeinheit präsentiert werden, ohne das ein Zugriff auf die eigentlichen Datensätze erfolgt und die Datensouveränität des Datenanbieters verletzt wird.</li>
                </ul>
                <h5 class="bold mb-5">Zielgruppe Datennutzer</h5>
                <p>Der Datennutzer (“Data User”) ist eine Person, Organisation oder Software, die aktiv nach Daten sucht um diese für das Trainieren eines KI-Modells, eine Datenanalyse oder das Bereitstellen eines anderen Datendienstes zu nutzen.</p>
                <h6 class="bold mb-5">Vorteile für den Datennutzer</h6>
                <ul>
                    <li>Die Landing Page bietet einen einfachen Einstieg in die Welt von daseen mittels Filterung über Kategorien [<a href="/help#landingpage">mehr erfahren</a>].</li>
                    <li>Über daseen kann der Nutzer datenraum- und datenportalübergreifend effizient anhand beschreibender, analytischer, kommerzieller und rechtlicher Eigenschaften tief in die Datensätze eintauchen ohne diese selber laden und analysieren zu müssen. Dabei stehen ihm eine einfache Freitextsuche, filterbasierte Suchen sowie ein Expertenmodus zur Verfügung [<a href="/help#search">mehr erfahren</a>].</li>
                    <li>Der EDP liefern neben typischen beschreibenden Meta-Informationen komplexe analytische Eigenschaften, beispielsweise zur statistischen Verteilungsfunktion, potenziellen Datenlücken sowie Zeitreihen und Varianzen. So kann der Nutzer evaluieren, ob die Daten für seinen Anwendungsfall geeignet sind, ohne die Daten vorab abrufen zu müssen [<a href="/help#formats">mehr erfahren</a>]. Über den integrierten Data-Log werden alle rechtlich notwendigen Informationen zu Provenienz, Lizenz und Verarbeitungsstands eines Datensatzes dokumentiert.</li>
                </ul>
                <h5 class="bold mb-5">Zielgruppe Datenanbieter</h5>
                <p>Ein Datenanbieter (“Data Publisher“) oder Veröffentlicher ist eine Person, Organisation oder Institution, die Daten in einem Datenraum bereitstellt oder in über ein Datenportal veröffentlicht [<a href="/help#dataspace-dataportal">mehr erfahren</a>].</p>
                <p>Bei einer Veröffentlichung über einen Datenraum, ist der Zugriff auf die Daten und den Datenkatalog in der Regel Zugriffsbeschränkt. Der Datenanbieter kontrolliert über die im Datenraum implementierten Sicherheitsmechanismen sowohl den Umfang des Zugriffs sowie die Nutzung der angebotenen Daten durch einen Datennutzer.</p>
                <p>daseen und EPDS unterstützen in der aktuellen Version die Integration in EDC und Gaia-X basierte Datenräume.</p>
                <p>Im offenen Datenportal veröffentlicht der Datenanbieter die Daten über das Portal, sodass andere Nutzer die Möglichkeit haben, diese zu suchen, anzusehen und abzurufen.</p> 
                <h6 class="bold mb-5">Vorteile für den Datenanbieter</h6>
                <ul>
                    <li>Datenportal- und Datenraum-übergreifende Sichtbarkeit von Datenangeboten, ohne die Datensätze herausgeben zu müssen.</li>
                    <li>Feedback zur Datenqualität und dem analytischen Wert der eigenen Datenangebote
                    Die Datensatz-Steckbriefe geben auch dem Datenanbieter wertvolle Informationen, anhand derer er seine Daten weiter optimieren kann.</li>
                    <li>Wertsteigerung und Monetarisierung
                    Die Veredelung (Erstellung von Steckbriefen) von Daten erhöht deren Wert: Sorgfältig analysierte und aufbereitete Daten besitzen einen deutlich höheren Marktwert als unstrukturierte Rohdaten.</li>
                    <li>Überzeugende Verkaufsargumente 
Kunden ziehen gut strukturierte und interpretierbare Daten vor, da diese ihnen wertvolle Einblicke bieten [<a href="/help#formats">mehr zu den umfangreichen Analysen</a>].</li>
                    <li>Innovative Produkte und Dienstleistungen 
                    Die Ergebnisse aus der Datenanalyse können in Form von Berichten, Dashboards oder KI-gestützten Prognosen vermarktet werden.</li>
                    <li>Lizenzierung und Partnerschaften 
                    Unternehmen sowie Forschungseinrichtungen sind bereit, für den Zugang zu bereits analysierten Daten zu bezahlen.</li>
                </ul>
                <h5 class="bold mb-5">Zielgruppe Betreiber</h5>
                <p>Ein Betreiber verfügt über geschlossene Datenräume [<a href="/help#dataspace">mehr erfahren</a>] oder offene Datenportale [<a href="/help#dataportal">mehr erfahren</a>].</p>
                <h6 class="bold mb-5">Vorteile für den Betreiber</h6>
                <ul>
                    <li>Sichtbarkeit, Bekanntheit und Reputation seiner Plattform werden erhöht.</li>
                    <li>Der Betreiber kann die Voraussetzungen schaffen, damit Datenanbieter ihre Daten (Asset) analysieren lassen können um die Ergebnisse in daseen zu veröffentlichen.</li>
                    <li>Indem er Teil von daseen wird, gehört er zu einem wachsenden Daten-Ökosystem.</li>
                </ul>
                <h4 class="bold mb-5">Begrifflichkeiten kurz erklärt</h4>
                <h5 class="bold mb-5">Was ist ein Asset?</h5>
                Ein Asset (“Data Asset“) bezeichnet ein im Datenraum oder Datenportal bereitgestelltes Datenangebot. 
                <h5 class="bold mb-5">Was ist ein Datensatz?</h5>
                Ein Data Asset kann aus einem oder mehreren Datensätzen bestehen. Ein Datensatz (“Dataset”) ist ein Objekt, dem eine eindeutige Datenformat zugeordnet werden kann [mehr zu den in daseen unterstützten Datenformaten]. 
                <h5 class="bold mb-5">Was ist ein EDP?</h5>
                <p>Ein erweitertes Datensatzprofil (“Extended Dataset Profile“) verwenden Sie im Kontext von Datenräumen, Datenkatalogen oder Dateninfrastrukturen.</p>
                <p>Ein EDP stellt dabei eine maschinenlesbare, umfassende und erweiterbare Beschreibung eines Assets auf Metadatenbasis dar. </p>
                <p>Es beinhaltet nicht nur den Namen des Assets und klassische Meta-Informationen wie dessen Ersteller, sondern bietet zudem zahlreiche zusätzliche Informationen, die es ermöglichen, das Asset und die darin enthaltenen Datensätze einfacher zu finden und deren Inhalte besser zu verstehen. Je nach Datenformat der Datensätze werden unterschiedliche Analysen durchgeführt [mehr erfahren].</p>
                <p>Welche Informationen sind üblicherweise enthalten?</p>
                <ul>
                    <li>Grundinformationen: Der Name des Assets, der Inhalt, der Ersteller sowie die geltenden Nutzungsbedingungen (Datenlizenz sowie optional eine Geheimhaltungsvereinbarung und/oder Auftragsdatenverarbeitung).</li>
                    <li>Qualitätsaspekte: Informationen über analytischen Wert, Umfang, Aktualität und Vollständigkeit der Daten.</li>
                    <li>Technische Informationen: Das Dateiformat, in dem die Daten vorliegen, die Struktur der Daten und die Zugriffsmodalitäten.</li>
                    <li>Schlagwörter oder Kategorien zur besseren Klassifizierung des Datensatzes.</li>
                    <li>Verarbeitungsstand der Daten und welche Vorverarbeitungsschritte ggf. bereits durchgeführt wurden.</li>
                </ul>
                Warum ist das wichtig?
                <ul>
                    <li>Anbieter von Daten können demonstrieren, welche Möglichkeiten ihr Datensatz bietet.</li>
                    <li>Personen, die nach Daten suchen, können rascher feststellen, ob die Daten analytisch, rechtlich und kommerziell für ihre Projekte, beispielsweise im Bereich der Künstlichen Intelligenz, geeignet sind.</li>
                    <li>Es fördert die Auffindbarkeit von Daten auf umfangreichen Datenplattformen und erleichtert deren integrierte Nutzung.</li>
                </ul>
                <h5 class="bold mb-5" id="dataspace-dataportal">Was ist ein Datenraum bzw ein Datenportal?</h5>
                <h6 class="bold mb-5" id="dataspace">Datenraum</h6>
                <p>Ein geschlossener Datenraum (“Data Space”) kann als ein gemeinsamer digitaler Raum betrachtet werden, in dem verschiedene Organisationen oder Individuen Daten Assets austauschen können – jedoch auf eine sichere, gerechte und kontrollierte Weise. Man könnte sich diesen Raum wie einen Marktplatz für Daten vorstellen: Jeder Teilnehmer bringt seine eigenen Assets ein, und es bestehen klare Regelungen hinsichtlich der Berechtigungen, wer welche Informationen einsehen, nutzen und weitergeben darf. Die Assets verbleiben an ihrem Ursprungsort, sind jedoch zugänglich, sofern der entsprechende digitale Vertrag vorliegt.</p>
                Wesentliche Merkmale eines Datenraums sind:
                <ul>
                    <li>Vertrauen: Alle Beteiligten sind sich der Tatsache bewusst, dass ihre Daten geschützt sind und gerecht verwendet werden.</li>
                    <li>Interoperabilität: Die Daten sind so beschrieben und technisch vorbereitet, dass sie in unterschiedlichen Systemen verwendet werden können.</li>
                    <li>Selbstbestimmung: Jeder Datenanbieter hat die Freiheit, zu entscheiden, welche Nutzung seiner Daten für wen gestattet ist.</li>
                    <li>Standardisierte Metadaten: Diese ermöglichen ein leichteres Verständnis darüber, worum es sich bei den Daten handelt und wie sie genutzt werden können.</li>
                </ul>
                Welche Bedeutung hat ein Datenraum?
                <ul>
                    <li>Er unterstützt Unternehmen, Behörden oder Forschende dabei, Daten zu teilen und gemeinsam zu nutzen, und zwar ohne dabei die Kontrolle über ihre Daten zu verlieren. </li>
                    <li>Zudem ermöglicht er Innovationen, beispielsweise im Bereich der Künstlichen Intelligenz, bei smarten Städten oder in der Gesundheitsforschung. </li>
                    <li>Darüber hinaus fördert er Zusammenarbeit, Vertrauen und Transparenz.</li>
                </ul>
                <h6 class="bold mb-5" id="dataportal">Datenportal/h6>
                <p>Ein offenes Datenportal (“Data Portal“) ist eine Webseite oder Plattform, die es ermöglicht, Daten zu finden, einzusehen und herunterzuladen. Man kann es sich als eine Art Katalog oder Online-Shop für Daten vorstellen, wobei hier nicht Produkte erworben werden, sondern Informationen und Datensätze gesucht und genutzt werden.</p>
                <p>Was zeichnet ein Datenportal aus?</p>
                <ul>
                    <li>Es präsentiert eine Übersicht der verfügbaren Assets. </li>
                    <li>Darüber hinaus beinhaltet es Suchfunktionen und Filter, die eine schnelle Auffindbarkeit der relevanten Daten ermöglichen.</li>
                    <li>Des Weiteren informiert es darüber, ob und unter welchen Bedingungen die Daten verwendet werden dürfen.</li>
                    <li>Häufig besteht die Möglichkeit, die Daten direkt von der Plattform herunterzuladen oder über Schnittstellen (APIs) zu beziehen.</li>
                </ul>
                Wozu dient ein Datenportal?
                <ul>
                    <li>Ein Datenportal ermöglicht es Einzelpersonen oder Unternehmen, zügig die benötigten Daten zu finden, beispielsweise für Forschungszwecke, die Entwicklung neuer Produkte oder für analytische Zwecke. </li>
                    <li>Zudem fördert es die Sichtbarkeit und Zugänglichkeit von Daten</li>
                    <li>und unterstützt Transparenz sowie offene Dateninitiativen.</li>
                </ul>
            </div>
            `
    }
};

export default basicsHelpText;
