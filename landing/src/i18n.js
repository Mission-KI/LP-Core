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
          header: {
            home: "Home",
            search: "Search",
            about: "About",
            privacyPolicy: "Privacy Policy",
            imprint: "Imprint",
            usePolicy: "Acceptable Use Policy"
          },
          home: {
            heroSection: {
              welcome: "Welcome to Daseen",
              description: "Discover, analyze, and manage EDPs effortlessly. Explore detailed insights, bookmark your favorites, and download data from leading providers and data spaces. Your ultimate tool for navigating the world of EDPs with precision.",
            },
            categories: "Categories",
            openDaseen: "Open Search",
            dataSources: 'Providers',
            dataAssets: 'Data Assets',
            dataSpaces: 'Data Spaces',
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
          header: {
            home: "Startseite",
            search: "Suche",
            about: "Über uns",
            privacyPolicy: "Datenschutzrichtlinie",
            imprint: "Impressum",
            usePolicy: "Nutzungsrichtlinien"
          },
          home: {
            heroSection: {
              welcome: "Willkommen bei Daseen",
              description: "Entdecken, analysieren und verwalten Sie EDPs mühelos. Erkunden Sie detaillierte Einblicke, speichern Sie Ihre Favoriten als Lesezeichen und laden Sie Daten von führenden Anbietern und Datenräumen herunter. Ihr ultimatives Werkzeug, um die Welt der EDPs mit Präzision zu navigieren.",
            },
            categories: "Kategorien",
            openDaseen: "Suche öffnen",
            dataSources: 'Datenquellen',
            dataAssets: 'Datensatz',
            dataSpaces: 'Datenräume',
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
          imprint: imprintPolicy.en,
          acceptableUsePolicy: acceptableUsePolicy.en,
          privacyPolicy: privacyPolicy.en,
        }
      },
    }
  });

export default i18n;
