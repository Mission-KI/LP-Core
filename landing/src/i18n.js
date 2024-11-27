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
            about: "About",
            privacyPolicy: "Privacy Policy",
          },
          home: {
            heroSection: {
              welcome: "Welcome to Daseen",
              description: "Discover, analyze, and manage EDPs effortlessly. Explore detailed insights, bookmark your favorites, and download data from leading providers and data spaces. Your ultimate tool for navigating the world of EDPs with precision.",
            },
            categories: "Categories",
            openDaseen: "Open Daseen",
            dataSources: 'Providers',
            dataAssets: 'Data Assets',
            dataSpaces: 'Data Spaces',
            dataPublishers: 'Data Publishers',
            dataCategories: "Data Categories"
          },
          auth: {
            signUp: "Registrieren",
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
            realestate: "Real estate and finance"
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
            about: "Über uns",
            privacyPolicy: "Datenschutzrichtlinie",
          },
          home: {
            heroSection: {
              welcome: "Willkommen bei Daseen",
              description: "Entdecken, analysieren und verwalten Sie EDPs mühelos. Erkunden Sie detaillierte Einblicke, speichern Sie Ihre Favoriten als Lesezeichen und laden Sie Daten von führenden Anbietern und Datenräumen herunter. Ihr ultimatives Werkzeug, um die Welt der EDPs mit Präzision zu navigieren.",
            },
            categories: "Kategorien",
            openDaseen: "Daseen öffnen",
            dataSources: 'Datenquellen',
            dataAssets: 'Datensatz',
            dataSpaces: 'Datenräume',
            dataPublishers: 'Datenanbieter',
            dataCategories: "Datenkategorien"
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
            realestate: "Immobilien und Finanzen"
          },
          imprint: imprintPolicy.en,
          acceptableUsePolicy: acceptableUsePolicy.en,
          privacyPolicy: privacyPolicy.en,
        }
      },
    }
  });

export default i18n;
