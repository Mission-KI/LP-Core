import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
            search_placeholder: "Search datasets...",
            filters: "Filters"
          },
          dataset: {
            datasets: "Datasets"
          },
          common: {
            all: "All",
            bookmarks: "Bookmarks"
          },
          footer: {
            c: "beebucket confidential - (c) beebucket 2024",
            imprint: "Imprint",
            privacyPolicy: "Data Privacy Policy",
            usePolicy: "Acceptable Use Policy"
          }
        }
      },
      de: {
        translation: {
          page: {
            title: "Datensatz-Suchmaschine"
          },
          header: {
            search_placeholder: "Datensätze suchen...",
            filters: "Filter"
          },
          dataset: {
            datasets: "Datensätze"
          },
          common: {
            all: "Alle",
            bookmarks: "Lesezeichen"
          },
          footer: {
            c: "beebucket vertraulich - (c) beebucket 2024",
            imprint: "Impressum",
            privacyPolicy: "Datenschutzerklärung",
            usePolicy: "Nutzungsbedingungen"
          }
        }
      },
      fr: {
        translation: {
          page: {
            title: "Moteur de recherche de jeux de données"
          },
          header: {
            search_placeholder: "Rechercher des jeux de données...",
            filters: "Filtres"
          },
          dataset: {
            datasets: "Jeux de données"
          },
          common: {
            all: "Tous",
            bookmarks: "Signets"
          },
          footer: {
            c: "beebucket confidentiel - (c) beebucket 2024",
            imprint: "Mentions légales",
            privacyPolicy: "Politique de confidentialité",
            usePolicy: "Politique d'utilisation acceptable"
          }
        }
      }
    }
  }
);

export default i18n;
