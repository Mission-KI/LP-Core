import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import acceptableUsePolicy from './pages/legal/translation/acceptableUsePolicy'
import privacyPolicy from './pages/legal/translation/privacyPolicy';
import imprintPolicy from './pages/legal/translation/imprint';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          page: {
            title: "Dataset Search Engine"
          },
          welcome: {
            title: "Welcome to the landing page!",
            text: "Please note that this site and downstream services are currently under development. It may therefore happen that the page itself or the functions shown are not available or only available to a limited extent. We apologise for the inconvenience."
          },
          header: {
            home: "Home",
            search: "Search",
            help: "Help",
            about: "About",
          },
          home: {
            heroSection: {
              welcome: "Welcome to the landing page",
              description: "Search private and public data portals and data spaces based on general and analytical characteristics. Discover, analyze, compare and manage data offerings based on meta information without having to load the data set. Massively reduce the effort required for data acquisition and automate documentation and compliance obligations with the integrated data log.",
            },
            categories: "Categories",
            openDaseen: "Open Search",
            dataProvider: 'Provider',
            dataProviders: 'Providers',
            dataAsset: 'Data Asset',
            dataAssets: 'Data Assets',
            dataSpaces: 'Data Spaces and Data Portals',
            dataPublishers: 'Data Publishers',
            dataCategories: "Data Categories"
          },
          auth: {
            register: "Register",
          },
          categories: {
            mobilityAndTransportation: "Mobility and transportation",
            industryAndProduction: "Industry and production",
            health: "Health, pharmaceuticals and medicine",
            environment: "Environment, food and agriculture",
            administration: "Administration and public sector",
            geodata: "Geodata and weather",
            energy: "Energy",
            culture: "Culture and media",
            education: "Education, research and science",
            realestate: "Real estate and finance",
            noItems: "Unfortunately there is no data available for this category yet."
          },
          publishers: {
            bast: {
              title: "Federal Highway Research Institute",
              description: "The research institute BASt, which is part of the Federal Ministry of Transport, provides data on the safety, environmental compatibility, economic efficiency and performance of Germany's roads."
            },
            tollcollect: {
              title: "Toll Collect GmbH",
              description: "Toll Collect GmbH offers data in the context of the German truck toll system."
            },
            autobahn: {
              title: "Autobahn GmbH",
              description: "The Autobahn GmbH of the Federal Government offers data in the context of planning, construction, operation, traffic management, maintenance, financing and asset management of highways and trunk roads in Germany. "
            },
            pangaea: {
              title: "PANGAEA - Data Publisher for Earth & Environmental Science",
              description: "PANGAEA is a member of the World Data System and offers services for the archiving, publication and dissemination of georeferenced data from Earth system research."
            }
          },
          dataSpaces: {
            govdata: {
              title: "The data portal for Germany",
              description: "The GovData portal offers transparent, open and freely accessible data from all levels of government."
            },
            mobility: {
              title: "Data Sharing Community for mobility pioneers",
              description: "The Mobility Data Space is the fair data sharing community for everyone who wants to exchange data from the mobility sector."
            },
            mobilithek: {
              title: "Germany's platform for data that drives things forward",
              description: "The platform Mobilithek offers access to open mobility data and is a national access point for mobility data."
            },
            geoportal: {
              title: "Geodata from federal, state and local authorities",
              description: "Via this portal interested users can search, find and use publicly available geodata from federal, state and local authorities."
            },
            konstanz: {
              title: "Central platform for open data in the city of Konstanz",
              description: "The Konstanz Data Portal contributes to the development of an urban data space and promotes the transparent provision of municipal data."
            }
          },
          footer: {
            c: "© beebucket 2024",
            imprint: "Imprint",
            privacyPolicy: "Data Privacy Policy",
            usePolicy: "Acceptable Use Policy"
          },
          imprint: imprintPolicy.en,
          acceptableUsePolicy: acceptableUsePolicy.en,
          privacyPolicy: privacyPolicy.en,
        }
      },
      de: {
        translation: {
          page: {
            title: "Datensatz-Suchmaschine"
          },
          welcome: {
            title: "Willkommen auf der Landing Page!",
            text: "Bitte beachten Sie, dass sich diese Seite und die nachgelagerten Dienste in der Entwicklung befinden. Es kann deshalb passieren, dass die Seite selbst oder dargestellte Funktionen nicht oder nur eingeschränkt zur Verfügung stehen. Wir bitten dies zu entschuldigen."
          },
          header: {
            home: "Startseite",
            search: "Suche",
            help: "Hilfe",
            about: "Über uns",
            privacyPolicy: "Datenschutzrichtlinie",
            imprint: "Impressum",
            usePolicy: "Nutzungsrichtlinien"
          },
          home: {
            heroSection: {
              welcome: "Willkommen auf der Landing Page",
              description: "Durchsuchen Sie private und öffentliche Datenportale und Datenräume anhand von allgemeinen und analytischen Merkmalen. Entdecken, analysieren, vergleichen und verwalten Sie Datenangebote auf Basis von Metainformationen, ohne dass Sie den Datensatz laden müssen. Verkürzen Sie den Aufwand für die Datenakquise massiv und automatisieren Sie durch den integrierten Data Log die Dokumentations- und Compliancepflichten.",
            },
            categories: "Kategorien",
            openDaseen: "Suche öffnen",
            dataProvider: 'Datenquelle',
            dataProviders: 'Datenquellen',
            dataAsset: 'Datensatz',
            dataAssets: 'Datensätze',
            dataSpaces: 'Datenräume und Datenportale',
            dataPublishers: 'Datenanbieter',
            dataCategories: "Datenkategorien"
          },
          auth: {
            register: "Registrieren",
          },
          categories: {
            mobilityAndTransportation: "Mobilität und Verkehr",
            industryAndProduction: "Industrie und Produktion",
            health: "Gesundheit, Pharma und Medizin",
            environment: "Umwelt, Ernährung und Landwirtschaft",
            administration: "Verwaltung und öffentliche Hand",
            geodata: "Geodaten und Wetter",
            energy: "Energie",
            culture: "Kultur und Medien",
            education: "Bildung, Forschung und Wissenschaft",
            realestate: "Immobilien und Finanzen",
            noItems: "Es sind leider noch keine Daten für diese Kategorie vorhanden."
          },
          publishers: {
            bast: {
              title: "Bundesanstalt für Straßen- und Verkehrswesen",
              description: "Die Forschungseinrichtung BASt im Ressort des Bundesverkehrsministeriums bietet Daten im Kontext Sicherheit, Umweltverträglichkeit, Wirtschaftlichkeit und Leistungsfähigkeit der bundesdeutschen Straßen an."
            },
            tollcollect: {
              title: "Toll Collect GmbH",
              description: "Die Toll Collect GmbH bietet Daten im Kontext des deutschen LKW-Mautsystems an."
            },
            autobahn: {
              title: "Autobahn GmbH",
              description: "Die Autobahn GmbH des Bundes bietet Daten im Kontext Planung, Bau, Betrieb, Verkehrsmanagement, Erhalt, Finanzierung und vermögensmäßige Verwaltung der Autobahnen und Fernstraßen in Deutschland an."
            },
            pangaea: {
              title: "PANGAEA - Datenanbieter für Geo- und Umweltwissenschaften",
              description: "PANGAEA ist Mitglied des World Data Systems und bietet Dienste zur Archivierung, Veröffentlichung und Verbreitung von georeferenzierten Daten aus der Erdsystemforschung an."
            }
          },
          dataSpaces: {
            govdata: {
              title: "Das Datenportal für Deutschland",
              description: "Das Portal GovData bietet Daten aller Verwaltungsebenen transparent, offen und frei zugänglich an."
            },
            mobility: {
              title: "Data Sharing Community für Mobilitätspioniere",
              description: "Der Mobility Data Space ist die faire Data Sharing Community für alle, die Daten aus dem Mobilitätssektor miteinander austauschen wollen."
            },
            mobilithek: {
              title: "Deutschlands Plattform für Daten, die etwas bewegen",
              description: "Die Plattform Mobilithek bietet Zugang zu offenen Mobilitätsdaten (open data) und ist nationaler Zugangspunkt für Mobilitätsdaten."
            },
            geoportal: {
              title: "Geodaten von Bund, Ländern und Kommunen",
              description: "Über das Portal können interessierte Nutzende öffentlich bereitgestellte Geodaten von Bund, Ländern und Kommunen über das Geoportal.de suchen, finden und nutzen."
            },
            konstanz: {
              title: "Zentrale Plattform für Open Data in der Stadt Konstanz",
              description: "Das Datenportal Konstanz trägt zum Aufbau eines urbanen Datenraums bei und fördert die transparente Bereitstellung kommunaler Daten."
            }
          },
          footer: {
            c: "© beebucket 2024",
            imprint: "Impressum",
            privacyPolicy: "Datenschutzerklärung",
            usePolicy: "Nutzungsrichtlinien"
          },
          imprint: imprintPolicy.de,
          acceptableUsePolicy: acceptableUsePolicy.de,
          privacyPolicy: privacyPolicy.de,
        }
      },
    }
  });

export default i18n;
