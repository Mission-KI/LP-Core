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
            dataSpaces: 'Datentreuhänder und Datenportale',
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
