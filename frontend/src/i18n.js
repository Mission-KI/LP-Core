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
            title: "Data Search Engine",
            search_placeholder: "Search datasets...",
            filters: "Filters",
            findSimilar: "Find similar EDP",
            back: "Back",
            schemaJson: "Schema (JSON)",
            reportPdf: "Report (pdf)",
            getDataset: "Get Dataset",
            bookmarks: "Bookmarks",
            bookmark: "Bookmark",
            removeBookmark: "Remove Bookmark"
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
            tags: "TAGS",
            version: "Version",
            getDataset: "Get Dataset",
            license: "License"
          },
          bookmarks: {
            bookmarks: "Bookmarks",
            bookmark: "Bookmark",
            removeBookmark: "Remove Bookmark"
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
            title: "Daten Such Engine",
            search_placeholder: "Datensätze durchsuchen...",
            filters: "Filter",
            findSimilar: "Ähnliche EDP finden",
            back: "Zurück",
            schemaJson: "Schema (JSON)",
            reportPdf: "Bericht (pdf)",
            getDataset: "Datensatz abrufen",
            bookmarks: "Lesezeichen",
            bookmark: "Lesezeichen",
            removeBookmark: "Lesezeichen entfernen"
          },
          dataset: {
            datasets: "Datensätze",
            dataScienceInfo: "DATENWISSENSCHAFTSINFORMATIONEN",
            structure: "Struktur",
            volume: "Volumen",
            compression: "Komprimierung",
            transferType: "Übertragungsart",
            immutability: "Unveränderlichkeit",
            growth: "Wachstum",
            growthRate: "Wachstumsrate",
            temporalCover: "Zeitliche Abdeckung",
            temporalConsistency: "Zeitliche Konsistenz",
            noOfColumns: "Anzahl der Spalten",
            noOfLines: "Anzahl der Zeilen",
            dataTypes: "Datentypen",
            attributeConsistency: "Attributkonsistenz",
            numericValueDistribution: "Numerische Werteverteilung",
            stringValueDistribution: "String-Werteverteilung",
            numericCorrelationAnalysis: "Numerische Korrelationsanalyse",
            numericAnomalyAnalysis: "Numerische Anomalieanalyse",
            dataSeasonality: "Daten-Saisonalität",
            languages: "Sprachen",
            tags: "STICHWORTE",
            version: "Version",
            getDataset: "Datensatz abrufen",
            license: "Lizenz"
          },
          bookmarks: {
            bookmarks: "Lesezeichen",
            bookmark: "Lesezeichen",
            removeBookmark: "Lesezeichen entfernen"
          },
          common: {
            all: "Alle",
            bookmarks: "Lesezeichen"
          },
          footer: {
            c: "beebucket vertraulich - (c) beebucket 2024",
            imprint: "Impressum",
            privacyPolicy: "Datenschutzerklärung",
            usePolicy: "Nutzungsrichtlinien"
          }
        }
      },
    }
  });

export default i18n;
