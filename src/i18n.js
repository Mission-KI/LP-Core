import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import acceptableUsePolicy from './modules/legal/translation/acceptableUsePolicy'
import privacyPolicy from './modules/legal/translation/privacyPolicy';
import imprintPolicy from './modules/legal/translation/imprint';

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
          home: {
            publishers: 'Publishers',
            dataAssets: 'Data Assets'
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
            details: "Details",
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
            license: "License",
            assetUploaded: "Published",
            tabs: {
              attributeList: "ATTRIBUTE LIST",
              attributeConsistency: "ATTRIBUTE CONSISTENCY",
              temporalConsistency: "TEMPORAL CONSISTENCY",
              numericValueDistribution: "NUMERIC VALUE DISTRIBUTION",
              stringValueDistribution: "STRING VALUE DISTRIBUTION",
              numericCorrelationAnalysis: "NUMERIC CORRELATION ANALYSIS",
              numericAnomalyAnalysis: "NUMERIC ANOMALY ANALYSIS",
              dataSeasonality: "DATA SEASONALITY"
            }
          },
          table: {
            attributes: {
              attribute: "attribute",
              hasMissingValues: "has missing values",
              countMissingValues: "count missing values",
              type: "type",
              specification: "specification",
              freq: "freq",
              periodicity: "periodicity",
              gaps: "gaps",
              upperQuantile: "upper quantile",
              lowerQuantile: "lower quantile",
              outlierCountQuantile: "outlier count quantile",
              outlierCountZscore: "outlier count zscore",
              outlierCountIqr: "outlier count iqr",
              upperZscore: "upper zscore",
              lowerZscore: "lower zscore",
              upperIqr: "upper iqr",
              lowerIqr: "lower iqr",
              iqr: "iqr",
            }
          },
          bookmarks: {
            bookmarks: "Bookmarks",
            bookmark: "Bookmark",
            removeBookmark: "Remove Bookmark"
          },
          filters: {
            dataspace: 'Dataspace',
            licenses: "Licenses",
            dataFormat: "Data Format",
            fileSize: "File size",
            attributes: "Attributes",
            sizeRange: "Size range",
            select: "select",
            lines: "Lines",
            columns: "Columns",
            clear: "Clear"
          },
          common: {
            all: "All",
            bookmarks: "Bookmarks"
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
          maintenance: "Daseen is under maintenance and will be back at 5 pm"
        }
      },
      de: {
        translation: {
          page: {
            title: "Datensatz-Suchmaschine"
          },
          home: {
            publishers: 'Datenanbieter',
            dataAssets: 'Datensätze'
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
          header: {
            title: "Datensatz-Suchmaschine",
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
            license: "Lizenz",
            assetUploaded: "Veröffentlicht",
            tabs: {
              attributeList: "ATTRIBUT- LISTE",
              attributeConsistency: "ATTRIBUT- KONSISTENZ",
              temporalConsistency: "ZEITLICHE KONSISTENZ",
              numericValueDistribution: "NUMERISCHE WERTEVER- TEILUNG",
              stringValueDistribution: "STRING-WERTEVER- TEILUNG",
              numericCorrelationAnalysis: "NUMERISCHE KORRELATIONS- ANALYSE",
              numericAnomalyAnalysis: "NUMERISCHE ANOMALIE- ANALYSE",
              dataSeasonality: "DATEN- SAISONALITÄT"
            }
          },
          table: {
            attributes: {
              attribute: "Attribut",
              hasMissingValues: "fehlende Werte vorhanden",
              countMissingValues: "Anzahl fehlender Werte",
              type: "Typ",
              specification: "Spezifikation",
              freq: "Häufigkeit",
              periodicity: "periodizität",
              gaps: "Lücken",
              upperQuantile: "oberes Quantil",
              lowerQuantile: "unteres Quantil",
              outlierCountQuantile: "Anzahl Ausreißer Quantil",
              outlierCountZscore: "Anzahl Ausreißer Z-Score",
              outlierCountIqr: "Anzahl Ausreißer IQR",
              upperZscore: "oberer Z-Score",
              lowerZscore: "unterer Z-Score",
              upperIqr: "oberes IQR",
              lowerIqr: "unteres IQR",
              iqr: "IQR",
            }
          },
          bookmarks: {
            bookmarks: "Lesezeichen",
            bookmark: "Lesezeichen",
            removeBookmark: "Lesezeichen entfernen"
          },
          filters: {
            dataspace: 'Datenraum',
            licenses: "Lizenzen",
            dataFormat: "Datenformat",
            fileSize: "Größenbereich",
            attributes: "Attribute",
            sizeRange: "Größenbereich",
            select: "wählen",
            lines: "Zeilen",
            columns: "Spalten",
            clear: "Zurücksetzen"
          },
          common: {
            all: "Alle",
            bookmarks: "Lesezeichen"
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
          maintenance: "Daseen befindet sich in Wartung und wird ab 17 Uhr wieder verfügbar sein."
        }
      },
    }
  });

export default i18n;
