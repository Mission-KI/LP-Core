import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
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
      }
    }
  }
);

export default i18n;