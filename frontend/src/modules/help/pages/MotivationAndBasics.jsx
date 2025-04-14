import { useTranslation } from "react-i18next";
import target_architecture from "../assets/img/target_architecture.png";
import InfoAlert from "../../common/components/InfoAlert";

const MotivationAndBasics = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (currentLanguage === "de") {
    return (
      <div className="col-md-10">
        <h2 className="bold mb-5">Motivation und Grundlagen</h2>
        <p className="regular text-justify">
          Vertrauenswürdige künstliche Intelligenz (“KI”) benötigt für
          effektives Training und präzise Vorhersagen vor allem qualitativ
          hochwertige Daten. Obwohl täglich enorme Datenmengen entstehen, liegt
          nur ein Teil davon in verwertbarer, kuratierter Form vor. Eine
          zentrale Herausforderung besteht darin, dass bisher keine Suchfunktion
          existiert, mit der man über verschiedene Datenräume und -portale
          hinweg gezielt nach Datensätzen anhand von analytischen Eigenschaften
          und unabhängig der zahlreichen domänenspezifischen Onthologien suchen
          kann.{" "}
        </p>
        <p className="regular text-justify">
          Hier setzt die Dataset Search Engine (“daseen”) in Verbindung mit dem
          verteilten Microservice Dienst Extended Dataset Profile Service
          (“EDPS”) an. Daten Assets werden mit Hilfe des EDPS so nah wie möglich
          und so nah wie nötig beim Datenanbieter auf ihre analytischen
          Eigenschaften untersucht. Diese werden dann standardisiert und
          maschinenlesbar in einem Extended Dataset Profile (“EDP”)
          zusammengefasst. Dabei kann der EDP flexibel durch Datenanbieter und
          Onthologie spezifische Metadaten wie z.B. eine Beschreibung, den
          Verarbeitungsstatus oder Datenlizenzbestimmungen erweitert werden.
          Nach Freigabe durch den Datenanbieter kann der EDP dann auf daseen
          veröffentlicht werden und das Daten Asset Datenportal- und
          Datenraum-übergreifend anhand aller im EDP gespeicherten Metadaten
          gefunden werden. Das eigentliche Asset verbleibt dabei immer beim
          Anbieter.
        </p>
        <p className="regular text-justify">
          Um den Einstieg in die Welt der Daten zu vereinfachen, sind die EDP
          nach folgenden Kategorien in einer vorgeschalteten Landing Page
          vorsortiert.
        </p>
        <ul className="regular text-justify">
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
        <p className="regular text-justify">
          Über den Link{" "}
          <a href="https://app.daseen.de/" target="_blank">
            app.daseen.de
          </a>{" "}
          kann die Suche direkt aufgerufen werden.
        </p>
        <p className="regular text-justify">
          Nachfolgende Grafik illustriert die zugrundeliegende
          Zielarchitektur.{" "}
        </p>
        <img
          src={target_architecture}
          alt="Zielarchitektur"
          className="w-100 my-4"
        />
        <h5 className="mt-4">Zielgruppen und Anwendungsfälle</h5>
        <p className="regular text-justify">
          Nachfolgender Absatz beschreibt die unterschiedlichen Zielgruppen und
          Anwendungsfälle.{" "}
        </p>
        <p className="regular text-justify">
          Dabei werden folgende drei Benutzergruppen und Hauptanwendungsfälle
          unterschieden:
        </p>
        <ul className="regular text-justify">
          <li>
            Datennutzer: Gezielte Suche nach inhaltlich, kommerziell, rechtlich
            und analytisch passenden Datensätzen für datenbasierte Analysen,
            trainieren und von KI-Modellen oder eines anderen Datendienstes.
          </li>
          <li>
            Datenanbieter: Eine automatisierte und einheitliche Erstellung einer
            umfassenden Metadatenbeschreibung für eigene Datensätze sorgt für
            eine bessere Auffindbarkeit und Bewertung – ohne dass der
            Datennutzer auf den eigentlichen Datensatz zugreifen muss.
          </li>
          <li>
            Für Betreiber: Durch Listen auf daseen wird mehr Reichweite und neue
            Kundengruppen durch höhere Sichtbarkeit erzielt. Bei geschlossenen
            Datenräumen kann das Datenangebot der Allgemeinheit präsentiert
            werden, ohne das ein Zugriff auf die eigentlichen Datensätze erfolgt
            und die Datensouveränität des Datenanbieters verletzt wird.
          </li>
        </ul>
        <h5 className="mt-4">Zielgruppe Datennutzer</h5>
        <p className="regular text-justify">
          Der Datennutzer (“Data User”) ist eine Person, Organisation oder
          Software, die aktiv nach Daten sucht um diese für das Trainieren eines
          KI-Modells, eine Datenanalyse oder das Bereitstellen eines anderen
          Datendienstes zu nutzen.
        </p>
        <h5 className="mt-4">Vorteile für den Datennutzer</h5>
        <ul className="regular text-justify">
          <li>
            Die Landing Page bietet einen einfachen Einstieg in die Welt von
            daseen mittels Filterung über Kategorien [
            <a href="/help/functions#landingpage">mehr erfahren</a>].
          </li>
          <li>
            Über daseen kann der Nutzer datenraum- und datenportalübergreifend
            effizient anhand beschreibender, analytischer, kommerzieller und
            rechtlicher Eigenschaften tief in die Datensätze eintauchen ohne
            diese selber laden und analysieren zu müssen. Dabei stehen ihm eine
            einfache Freitextsuche, filterbasierte Suchen sowie ein
            Expertenmodus zur Verfügung [
            <a href="/help/functions#search">mehr erfahren</a>].
          </li>
          <li>
            Der EDP liefern neben typischen beschreibenden Meta-Informationen
            komplexe analytische Eigenschaften, beispielsweise zur statistischen
            Verteilungsfunktion, potenziellen Datenlücken sowie Zeitreihen und
            Varianzen. So kann der Nutzer evaluieren, ob die Daten für seinen
            Anwendungsfall geeignet sind, ohne die Daten vorab abrufen zu müssen
            [<a href="/help/data-formats-and-analysis#formats">mehr erfahren</a>
            ]. Über den integrierten Data-Log werden alle rechtlich notwendigen
            Informationen zu Provenienz, Lizenz und Verarbeitungsstands eines
            Datensatzes dokumentiert.
          </li>
        </ul>
        <h5 className="mt-4">Zielgruppe Datenanbieter</h5>
        <p className="regular text-justify">
          Ein Datenanbieter (“Data Publisher“) oder Veröffentlicher ist eine
          Person, Organisation oder Institution, die Daten in einem Datenraum
          bereitstellt oder in über ein Datenportal veröffentlicht [
          <a href="/help/motivation-and-basics#dataspace-dataportal">
            mehr erfahren
          </a>
          ].
        </p>
        <p className="regular text-justify">
          Bei einer Veröffentlichung über einen Datenraum, ist der Zugriff auf
          die Daten und den Datenkatalog in der Regel Zugriffsbeschränkt. Der
          Datenanbieter kontrolliert über die im Datenraum implementierten
          Sicherheitsmechanismen sowohl den Umfang des Zugriffs sowie die
          Nutzung der angebotenen Daten durch einen Datennutzer.
        </p>
        <p className="regular text-justify">
          daseen und EPDS unterstützen in der aktuellen Version die Integration
          in EDC und Gaia-X basierte Datenräume.
        </p>
        <p className="regular text-justify">
          Im offenen Datenportal veröffentlicht der Datenanbieter die Daten über
          das Portal, sodass andere Nutzer die Möglichkeit haben, diese zu
          suchen, anzusehen und abzurufen.
        </p>
        <h5 className="mt-4">Vorteile für den Datenanbieter</h5>
        <ul className="regular text-justify">
          <li>
            Datenportal- und Datenraum-übergreifende Sichtbarkeit von
            Datenangeboten, ohne die Datensätze herausgeben zu müssen.
          </li>
          <li>
            Feedback zur Datenqualität und dem analytischen Wert der eigenen
            Datenangebote Die Datensatz-Steckbriefe geben auch dem Datenanbieter
            wertvolle Informationen, anhand derer er seine Daten weiter
            optimieren kann.
          </li>
          <li>
            Wertsteigerung und Monetarisierung Die Veredelung (Erstellung von
            Steckbriefen) von Daten erhöht deren Wert: Sorgfältig analysierte
            und aufbereitete Daten besitzen einen deutlich höheren Marktwert als
            unstrukturierte Rohdaten.
          </li>
          <li>
            Überzeugende Verkaufsargumente Kunden ziehen gut strukturierte und
            interpretierbare Daten vor, da diese ihnen wertvolle Einblicke
            bieten [
            <a href="/help/data-formats-and-analysis#formats">
              mehr zu den umfangreichen Analysen
            </a>
            ].
          </li>
          <li>
            Innovative Produkte und Dienstleistungen Die Ergebnisse aus der
            Datenanalyse können in Form von Berichten, Dashboards oder
            KI-gestützten Prognosen vermarktet werden.
          </li>
          <li>
            Lizenzierung und Partnerschaften Unternehmen sowie
            Forschungseinrichtungen sind bereit, für den Zugang zu bereits
            analysierten Daten zu bezahlen.
          </li>
        </ul>
        <h5 className="mt-4">Zielgruppe Betreiber</h5>
        <p className="regular text-justify">
          Ein Betreiber verfügt über geschlossene Datenräume [
          <a href="/help/motivation-and-basics#dataspace">mehr erfahren</a>]
          oder offene Datenportale [
          <a href="/help/motivation-and-basics#dataportal">mehr erfahren</a>].
        </p>
        <h5 className="mt-4">Vorteile für den Betreiber</h5>
        <ul className="regular text-justify">
          <li>
            Sichtbarkeit, Bekanntheit und Reputation seiner Plattform werden
            erhöht.
          </li>
          <li>
            Der Betreiber kann die Voraussetzungen schaffen, damit Datenanbieter
            ihre Daten (Asset) analysieren lassen können um die Ergebnisse in
            daseen zu veröffentlichen.
          </li>
          <li>
            Indem er Teil von daseen wird, gehört er zu einem wachsenden
            Daten-Ökosystem.
          </li>
        </ul>
        <h5 className="mt-4">Begrifflichkeiten kurz erklärt</h5>
        <h5 className="mt-4">Was ist ein Asset?</h5>
        Ein Asset (“Data Asset“) bezeichnet ein im Datenraum oder Datenportal
        bereitgestelltes Datenangebot.
        <h5 className="mt-4">Was ist ein Datensatz?</h5>
        Ein Data Asset kann aus einem oder mehreren Datensätzen bestehen. Ein
        Datensatz (“Dataset”) ist ein Objekt, dem eine eindeutige Datenformat
        zugeordnet werden kann [mehr zu den in daseen unterstützten
        Datenformaten].
        <h5 className="mt-4">Was ist ein EDP?</h5>
        <p className="regular text-justify">
          Ein erweitertes Datensatzprofil (“Extended Dataset Profile“) verwenden
          Sie im Kontext von Datenräumen, Datenkatalogen oder
          Dateninfrastrukturen.
        </p>
        <p className="regular text-justify">
          Ein EDP stellt dabei eine maschinenlesbare, umfassende und
          erweiterbare Beschreibung eines Assets auf Metadatenbasis dar.{" "}
        </p>
        <p className="regular text-justify">
          Es beinhaltet nicht nur den Namen des Assets und klassische
          Meta-Informationen wie dessen Ersteller, sondern bietet zudem
          zahlreiche zusätzliche Informationen, die es ermöglichen, das Asset
          und die darin enthaltenen Datensätze einfacher zu finden und deren
          Inhalte besser zu verstehen. Je nach Datenformat der Datensätze werden
          unterschiedliche Analysen durchgeführt [mehr erfahren].
        </p>
        <p className="regular text-justify">
          Welche Informationen sind üblicherweise enthalten?
        </p>
        <ul className="regular text-justify">
          <li>
            Grundinformationen: Der Name des Assets, der Inhalt, der Ersteller
            sowie die geltenden Nutzungsbedingungen (Datenlizenz sowie optional
            eine Geheimhaltungsvereinbarung und/oder Auftragsdatenverarbeitung).
          </li>
          <li>
            Qualitätsaspekte: Informationen über analytischen Wert, Umfang,
            Aktualität und Vollständigkeit der Daten.
          </li>
          <li>
            Technische Informationen: Das Dateiformat, in dem die Daten
            vorliegen, die Struktur der Daten und die Zugriffsmodalitäten.
          </li>
          <li>
            Schlagwörter oder Kategorien zur besseren Klassifizierung des
            Datensatzes.
          </li>
          <li>
            Verarbeitungsstand der Daten und welche Vorverarbeitungsschritte
            ggf. bereits durchgeführt wurden.
          </li>
        </ul>
        Warum ist das wichtig?
        <ul className="regular text-justify">
          <li>
            Anbieter von Daten können demonstrieren, welche Möglichkeiten ihr
            Datensatz bietet.
          </li>
          <li>
            Personen, die nach Daten suchen, können rascher feststellen, ob die
            Daten analytisch, rechtlich und kommerziell für ihre Projekte,
            beispielsweise im Bereich der Künstlichen Intelligenz, geeignet
            sind.
          </li>
          <li>
            Es fördert die Auffindbarkeit von Daten auf umfangreichen
            Datenplattformen und erleichtert deren integrierte Nutzung.
          </li>
        </ul>
        <h5 className="mt-4" id="dataspace-dataportal">
          Was ist ein Datenraum bzw ein Datenportal?
        </h5>
        <h5 className="mt-4" id="dataspace">
          Datenraum
        </h5>
        <p className="regular text-justify">
          Ein geschlossener Datenraum (“Data Space”) kann als ein gemeinsamer
          digitaler Raum betrachtet werden, in dem verschiedene Organisationen
          oder Individuen Daten Assets austauschen können – jedoch auf eine
          sichere, gerechte und kontrollierte Weise. Man könnte sich diesen Raum
          wie einen Marktplatz für Daten vorstellen: Jeder Teilnehmer bringt
          seine eigenen Assets ein, und es bestehen klare Regelungen
          hinsichtlich der Berechtigungen, wer welche Informationen einsehen,
          nutzen und weitergeben darf. Die Assets verbleiben an ihrem
          Ursprungsort, sind jedoch zugänglich, sofern der entsprechende
          digitale Vertrag vorliegt.
        </p>
        Wesentliche Merkmale eines Datenraums sind:
        <ul className="regular text-justify">
          <li>
            Vertrauen: Alle Beteiligten sind sich der Tatsache bewusst, dass
            ihre Daten geschützt sind und gerecht verwendet werden.
          </li>
          <li>
            Interoperabilität: Die Daten sind so beschrieben und technisch
            vorbereitet, dass sie in unterschiedlichen Systemen verwendet werden
            können.
          </li>
          <li>
            Selbstbestimmung: Jeder Datenanbieter hat die Freiheit, zu
            entscheiden, welche Nutzung seiner Daten für wen gestattet ist.
          </li>
          <li>
            Standardisierte Metadaten: Diese ermöglichen ein leichteres
            Verständnis darüber, worum es sich bei den Daten handelt und wie sie
            genutzt werden können.
          </li>
        </ul>
        Welche Bedeutung hat ein Datenraum?
        <ul className="regular text-justify">
          <li>
            Er unterstützt Unternehmen, Behörden oder Forschende dabei, Daten zu
            teilen und gemeinsam zu nutzen, und zwar ohne dabei die Kontrolle
            über ihre Daten zu verlieren.{" "}
          </li>
          <li>
            Zudem ermöglicht er Innovationen, beispielsweise im Bereich der
            Künstlichen Intelligenz, bei smarten Städten oder in der
            Gesundheitsforschung.{" "}
          </li>
          <li>
            Darüber hinaus fördert er Zusammenarbeit, Vertrauen und Transparenz.
          </li>
        </ul>
        <h5 className="mt-4" id="dataportal">
          Datenportal
        </h5>
        <p className="regular text-justify">
          Ein offenes Datenportal (“Data Portal“) ist eine Webseite oder
          Plattform, die es ermöglicht, Daten zu finden, einzusehen und
          herunterzuladen. Man kann es sich als eine Art Katalog oder
          Online-Shop für Daten vorstellen, wobei hier nicht Produkte erworben
          werden, sondern Informationen und Datensätze gesucht und genutzt
          werden.
        </p>
        <p className="regular text-justify">
          Was zeichnet ein Datenportal aus?
        </p>
        <ul className="regular text-justify">
          <li>Es präsentiert eine Übersicht der verfügbaren Assets. </li>
          <li>
            Darüber hinaus beinhaltet es Suchfunktionen und Filter, die eine
            schnelle Auffindbarkeit der relevanten Daten ermöglichen.
          </li>
          <li>
            Des Weiteren informiert es darüber, ob und unter welchen Bedingungen
            die Daten verwendet werden dürfen.
          </li>
          <li>
            Häufig besteht die Möglichkeit, die Daten direkt von der Plattform
            herunterzuladen oder über Schnittstellen (APIs) zu beziehen.
          </li>
        </ul>
        Wozu dient ein Datenportal?
        <ul className="regular text-justify">
          <li>
            Ein Datenportal ermöglicht es Einzelpersonen oder Unternehmen, zügig
            die benötigten Daten zu finden, beispielsweise für Forschungszwecke,
            die Entwicklung neuer Produkte oder für analytische Zwecke.{" "}
          </li>
          <li>
            Zudem fördert es die Sichtbarkeit und Zugänglichkeit von Daten
          </li>
          <li>und unterstützt Transparenz sowie offene Dateninitiativen.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="col-md-10">
      <h2 className="bold mb-3">Motivation and Basics</h2>
      <p className="regular text-justify">
        Trustworthy artificial intelligence (“AI”) requires for effective
        training and precise predictions above all high-quality data. Although
        enormous amounts of data are generated every day, only part of it is
        available in a usable, curated form. One central challenge is that there
        is currently no search function that can be used to search across
        different data spaces and portals based on analytical properties and
        independently of the numerous domain-specific ontologies.
      </p>
      <p className="regular text-justify">
        This is where the Dataset Search Engine (“daseen”) in conjunction with
        the distributed microservice Extended Dataset Profile Service (“EDPS”)
        gets in action. With the help of EDPS, data assets are analyzed as
        closely as possible and as close as necessary to the data provider for
        their analytical properties. These are then standardized and summarized
        machine-readable in an Extended Dataset Profile (“EDP”). The EDP can be
        flexibly customized with data providers and ontology specific metadata
        such as a description, the processing status or data license terms.
        After approval by the data provider, the EDP can then be published on
        daseen and the data asset can be found across data portals and data
        spaces using all metadata stored in the EDP. The actual asset always
        remains with the provider.
      </p>
      <p className="regular text-justify">
        To simplify access to the world of data, the EDP are pre-sorted
        according to the following categories in an upstream landing page:
      </p>
      <ul className="regular text-justify">
        <li>Mobility and transportation</li>
        <li>Administration and public sector</li>
        <li>Industry and production</li>
        <li>Geodata and weather</li>
        <li>Environment, food and agriculture</li>
        <li>Energy</li>
        <li>Culture and Media</li>
        <li>Health, pharmaceuticals and medicine</li>
        <li>Education, research and science</li>
        <li>Real estate and finance</li>
      </ul>
      <p className="regular text-justify">
        The search can be called up directly via the link{" "}
        <a href="https://app.daseen.de/" target="_blank">
          app.daseen.de
        </a>{" "}
      </p>
      <p className="regular text-justify">
        The following graphic illustrates the underlying target
        architecture.{" "}
      </p>
      <img
        src={target_architecture}
        alt="Zielarchitektur"
        className="w-100 my-4"
      />
      <h5 className="mt-4">Target groups and use cases</h5>
      <p className="regular text-justify">
        The following paragraph describes the different target groups and use
        cases.{" "}
      </p>
      <p className="regular text-justify">
        The following three user groups and main use cases are distinguished:
      </p>
      <ul className="regular text-justify">
        <li>
          Data users: Targeted search for content-related, commercial, legal and
          analytically suitable data sets for data-based analyses, training and
          AI models or other data services.
        </li>
        <li>
          Data provider: Automated and standardized creation of a comprehensive
          metadata description for your own data sets ensures better findability
          and evaluation - without the data user having to access the actual
          data set.
        </li>
        <li>
          For operators: Listings on daseen increase reach and attract new
          customer groups through higher visibility. With closed data spaces,
          the data offering can be presented to the general public without
          access to the actual data records and without violating the data and
          the data sovereignty of the data provider.
        </li>
      </ul>
      <h5 className="mt-4">Target group data user</h5>
      <p className="regular text-justify">
        The data user is a person, organization or software, that actively
        searches for data to train an AI model, analyze data or provision
        another data service.
      </p>
      <h5 className="mt-4">Advantages for the data user</h5>
      <ul className="regular text-justify">
        <li>
          FURTHER TRANSLATE UP FROM HERE: Die Landing Page bietet einen
          einfachen Einstieg in die Welt von daseen mittels Filterung über
          Kategorien [<a href="/help/functions#landingpage">mehr erfahren</a>].
        </li>
        <li>
          Über daseen kann der Nutzer datenraum- und datenportalübergreifend
          effizient anhand beschreibender, analytischer, kommerzieller und
          rechtlicher Eigenschaften tief in die Datensätze eintauchen ohne diese
          selber laden und analysieren zu müssen. Dabei stehen ihm eine einfache
          Freitextsuche, filterbasierte Suchen sowie ein Expertenmodus zur
          Verfügung [<a href="/help/functions#search">mehr erfahren</a>].
        </li>
        <li>
          Der EDP liefern neben typischen beschreibenden Meta-Informationen
          komplexe analytische Eigenschaften, beispielsweise zur statistischen
          Verteilungsfunktion, potenziellen Datenlücken sowie Zeitreihen und
          Varianzen. So kann der Nutzer evaluieren, ob die Daten für seinen
          Anwendungsfall geeignet sind, ohne die Daten vorab abrufen zu müssen [
          <a href="/help/data-formats-and-analysis#formats">mehr erfahren</a>
          ]. Über den integrierten Data-Log werden alle rechtlich notwendigen
          Informationen zu Provenienz, Lizenz und Verarbeitungsstands eines
          Datensatzes dokumentiert.
        </li>
      </ul>
      <h5 className="mt-4">Zielgruppe Datenanbieter</h5>
      <p className="regular text-justify">
        Ein Datenanbieter (“Data Publisher“) oder Veröffentlicher ist eine
        Person, Organisation oder Institution, die Daten in einem Datenraum
        bereitstellt oder in über ein Datenportal veröffentlicht [
        <a href="/help/motivation-and-basics#dataspace-dataportal">
          mehr erfahren
        </a>
        ].
      </p>
      <p className="regular text-justify">
        Bei einer Veröffentlichung über einen Datenraum, ist der Zugriff auf die
        Daten und den Datenkatalog in der Regel Zugriffsbeschränkt. Der
        Datenanbieter kontrolliert über die im Datenraum implementierten
        Sicherheitsmechanismen sowohl den Umfang des Zugriffs sowie die Nutzung
        der angebotenen Daten durch einen Datennutzer.
      </p>
      <p className="regular text-justify">
        daseen und EPDS unterstützen in der aktuellen Version die Integration in
        EDC und Gaia-X basierte Datenräume.
      </p>
      <p className="regular text-justify">
        Im offenen Datenportal veröffentlicht der Datenanbieter die Daten über
        das Portal, sodass andere Nutzer die Möglichkeit haben, diese zu suchen,
        anzusehen und abzurufen.
      </p>
      <h5 className="mt-4">Vorteile für den Datenanbieter</h5>
      <ul className="regular text-justify">
        <li>
          Datenportal- und Datenraum-übergreifende Sichtbarkeit von
          Datenangeboten, ohne die Datensätze herausgeben zu müssen.
        </li>
        <li>
          Feedback zur Datenqualität und dem analytischen Wert der eigenen
          Datenangebote Die Datensatz-Steckbriefe geben auch dem Datenanbieter
          wertvolle Informationen, anhand derer er seine Daten weiter optimieren
          kann.
        </li>
        <li>
          Wertsteigerung und Monetarisierung Die Veredelung (Erstellung von
          Steckbriefen) von Daten erhöht deren Wert: Sorgfältig analysierte und
          aufbereitete Daten besitzen einen deutlich höheren Marktwert als
          unstrukturierte Rohdaten.
        </li>
        <li>
          Überzeugende Verkaufsargumente Kunden ziehen gut strukturierte und
          interpretierbare Daten vor, da diese ihnen wertvolle Einblicke bieten
          [
          <a href="/help/data-formats-and-analysis#formats">
            mehr zu den umfangreichen Analysen
          </a>
          ].
        </li>
        <li>
          Innovative Produkte und Dienstleistungen Die Ergebnisse aus der
          Datenanalyse können in Form von Berichten, Dashboards oder
          KI-gestützten Prognosen vermarktet werden.
        </li>
        <li>
          Lizenzierung und Partnerschaften Unternehmen sowie
          Forschungseinrichtungen sind bereit, für den Zugang zu bereits
          analysierten Daten zu bezahlen.
        </li>
      </ul>
      <h5 className="mt-4">Zielgruppe Betreiber</h5>
      <p className="regular text-justify">
        Ein Betreiber verfügt über geschlossene Datenräume [
        <a href="/help/motivation-and-basics#dataspace">mehr erfahren</a>] oder
        offene Datenportale [
        <a href="/help/motivation-and-basics#dataportal">mehr erfahren</a>].
      </p>
      <h5 className="mt-4">Vorteile für den Betreiber</h5>
      <ul className="regular text-justify">
        <li>
          Sichtbarkeit, Bekanntheit und Reputation seiner Plattform werden
          erhöht.
        </li>
        <li>
          Der Betreiber kann die Voraussetzungen schaffen, damit Datenanbieter
          ihre Daten (Asset) analysieren lassen können um die Ergebnisse in
          daseen zu veröffentlichen.
        </li>
        <li>
          Indem er Teil von daseen wird, gehört er zu einem wachsenden
          Daten-Ökosystem.
        </li>
      </ul>
      <h5 className="mt-4">Begrifflichkeiten kurz erklärt</h5>
      <h5 className="mt-4">Was ist ein Asset?</h5>
      Ein Asset (“Data Asset“) bezeichnet ein im Datenraum oder Datenportal
      bereitgestelltes Datenangebot.
      <h5 className="mt-4">Was ist ein Datensatz?</h5>
      Ein Data Asset kann aus einem oder mehreren Datensätzen bestehen. Ein
      Datensatz (“Dataset”) ist ein Objekt, dem eine eindeutige Datenformat
      zugeordnet werden kann [mehr zu den in daseen unterstützten
      Datenformaten].
      <h5 className="mt-4">Was ist ein EDP?</h5>
      <p className="regular text-justify">
        Ein erweitertes Datensatzprofil (“Extended Dataset Profile“) verwenden
        Sie im Kontext von Datenräumen, Datenkatalogen oder
        Dateninfrastrukturen.
      </p>
      <p className="regular text-justify">
        Ein EDP stellt dabei eine maschinenlesbare, umfassende und erweiterbare
        Beschreibung eines Assets auf Metadatenbasis dar.{" "}
      </p>
      <p className="regular text-justify">
        Es beinhaltet nicht nur den Namen des Assets und klassische
        Meta-Informationen wie dessen Ersteller, sondern bietet zudem zahlreiche
        zusätzliche Informationen, die es ermöglichen, das Asset und die darin
        enthaltenen Datensätze einfacher zu finden und deren Inhalte besser zu
        verstehen. Je nach Datenformat der Datensätze werden unterschiedliche
        Analysen durchgeführt [mehr erfahren].
      </p>
      <p className="regular text-justify">
        Welche Informationen sind üblicherweise enthalten?
      </p>
      <ul className="regular text-justify">
        <li>
          Grundinformationen: Der Name des Assets, der Inhalt, der Ersteller
          sowie die geltenden Nutzungsbedingungen (Datenlizenz sowie optional
          eine Geheimhaltungsvereinbarung und/oder Auftragsdatenverarbeitung).
        </li>
        <li>
          Qualitätsaspekte: Informationen über analytischen Wert, Umfang,
          Aktualität und Vollständigkeit der Daten.
        </li>
        <li>
          Technische Informationen: Das Dateiformat, in dem die Daten vorliegen,
          die Struktur der Daten und die Zugriffsmodalitäten.
        </li>
        <li>
          Schlagwörter oder Kategorien zur besseren Klassifizierung des
          Datensatzes.
        </li>
        <li>
          Verarbeitungsstand der Daten und welche Vorverarbeitungsschritte ggf.
          bereits durchgeführt wurden.
        </li>
      </ul>
      Warum ist das wichtig?
      <ul className="regular text-justify">
        <li>
          Anbieter von Daten können demonstrieren, welche Möglichkeiten ihr
          Datensatz bietet.
        </li>
        <li>
          Personen, die nach Daten suchen, können rascher feststellen, ob die
          Daten analytisch, rechtlich und kommerziell für ihre Projekte,
          beispielsweise im Bereich der Künstlichen Intelligenz, geeignet sind.
        </li>
        <li>
          Es fördert die Auffindbarkeit von Daten auf umfangreichen
          Datenplattformen und erleichtert deren integrierte Nutzung.
        </li>
      </ul>
      <h5 className="mt-4" id="dataspace-dataportal">
        Was ist ein Datenraum bzw ein Datenportal?
      </h5>
      <h5 className="mt-4" id="dataspace">
        Datenraum
      </h5>
      <p className="regular text-justify">
        Ein geschlossener Datenraum (“Data Space”) kann als ein gemeinsamer
        digitaler Raum betrachtet werden, in dem verschiedene Organisationen
        oder Individuen Daten Assets austauschen können – jedoch auf eine
        sichere, gerechte und kontrollierte Weise. Man könnte sich diesen Raum
        wie einen Marktplatz für Daten vorstellen: Jeder Teilnehmer bringt seine
        eigenen Assets ein, und es bestehen klare Regelungen hinsichtlich der
        Berechtigungen, wer welche Informationen einsehen, nutzen und
        weitergeben darf. Die Assets verbleiben an ihrem Ursprungsort, sind
        jedoch zugänglich, sofern der entsprechende digitale Vertrag vorliegt.
      </p>
      Wesentliche Merkmale eines Datenraums sind:
      <ul className="regular text-justify">
        <li>
          Vertrauen: Alle Beteiligten sind sich der Tatsache bewusst, dass ihre
          Daten geschützt sind und gerecht verwendet werden.
        </li>
        <li>
          Interoperabilität: Die Daten sind so beschrieben und technisch
          vorbereitet, dass sie in unterschiedlichen Systemen verwendet werden
          können.
        </li>
        <li>
          Selbstbestimmung: Jeder Datenanbieter hat die Freiheit, zu
          entscheiden, welche Nutzung seiner Daten für wen gestattet ist.
        </li>
        <li>
          Standardisierte Metadaten: Diese ermöglichen ein leichteres
          Verständnis darüber, worum es sich bei den Daten handelt und wie sie
          genutzt werden können.
        </li>
      </ul>
      Welche Bedeutung hat ein Datenraum?
      <ul className="regular text-justify">
        <li>
          Er unterstützt Unternehmen, Behörden oder Forschende dabei, Daten zu
          teilen und gemeinsam zu nutzen, und zwar ohne dabei die Kontrolle über
          ihre Daten zu verlieren.{" "}
        </li>
        <li>
          Zudem ermöglicht er Innovationen, beispielsweise im Bereich der
          Künstlichen Intelligenz, bei smarten Städten oder in der
          Gesundheitsforschung.{" "}
        </li>
        <li>
          Darüber hinaus fördert er Zusammenarbeit, Vertrauen und Transparenz.
        </li>
      </ul>
      <h5 className="mt-4" id="dataportal">
        Datenportal
      </h5>
      <p className="regular text-justify">
        Ein offenes Datenportal (“Data Portal“) ist eine Webseite oder
        Plattform, die es ermöglicht, Daten zu finden, einzusehen und
        herunterzuladen. Man kann es sich als eine Art Katalog oder Online-Shop
        für Daten vorstellen, wobei hier nicht Produkte erworben werden, sondern
        Informationen und Datensätze gesucht und genutzt werden.
      </p>
      <p className="regular text-justify">Was zeichnet ein Datenportal aus?</p>
      <ul className="regular text-justify">
        <li>Es präsentiert eine Übersicht der verfügbaren Assets. </li>
        <li>
          Darüber hinaus beinhaltet es Suchfunktionen und Filter, die eine
          schnelle Auffindbarkeit der relevanten Daten ermöglichen.
        </li>
        <li>
          Des Weiteren informiert es darüber, ob und unter welchen Bedingungen
          die Daten verwendet werden dürfen.
        </li>
        <li>
          Häufig besteht die Möglichkeit, die Daten direkt von der Plattform
          herunterzuladen oder über Schnittstellen (APIs) zu beziehen.
        </li>
      </ul>
      Wozu dient ein Datenportal?
      <ul className="regular text-justify">
        <li>
          Ein Datenportal ermöglicht es Einzelpersonen oder Unternehmen, zügig
          die benötigten Daten zu finden, beispielsweise für Forschungszwecke,
          die Entwicklung neuer Produkte oder für analytische Zwecke.{" "}
        </li>
        <li>Zudem fördert es die Sichtbarkeit und Zugänglichkeit von Daten</li>
        <li>und unterstützt Transparenz sowie offene Dateninitiativen.</li>
      </ul>
    </div>
  );
};

export default MotivationAndBasics;
