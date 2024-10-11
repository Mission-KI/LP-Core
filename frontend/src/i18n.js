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
            datasets: "Datasets",
            dataScienceInfo: "DATA SCIENCE INFO",
            structure: "Structure",
            volume: "Volume",
            compression: "Compression",
            transferType: "Transfer type",
            immutability: "Immutability",
            growth: "Growth",
            growthRate: "Growth rate",
            temporalCover: "Temporal cover",
            temporalConsistency: "Temporal consistency",
            noOfColumns: "Number of columns",
            noOfLines: "Number of lines",
            dataTypes: "Data types",
            attributeConsistency: "Attribute consistency",
            numericValueDistribution: "Numeric value distribution",
            stringValueDistribution: "String value distribution",
            numericCorrelationAnalysis: "Numeric correlation analysis",
            numericAnomalyAnalysis: "Numeric anomaly analysis",
            dataSeasonality: "Data seasonality",
            languages: "Languages",
            tags: "TAGS"
          },
          bookmarks: {
            bookmarks: "Bookmarks"
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
    }
  }
);

export default i18n;
