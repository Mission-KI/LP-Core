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
          home: {
            dataSources: 'Providers',
            dataAssets: 'Data Assets'
          },
          header: {
            home: "Home",
            search: "Search",
            support: "Support",
            title: "Data Search Engine",
            search_placeholder: "Search datasets",
            filters: "Filters",
            findSimilar: "Find similar EDP",
            back: "Back",
            schemaJson: "Schema",
            reportPdf: "Report (pdf)",
            getDataset: "Get Dataset",
            bookmarks: "Bookmarks",
            bookmark: "Bookmark",
            removeBookmark: "Remove Bookmark"
          },
          dataset: {
            datasets: "Datasets",
            details: "Details",
            dataScienceInfo: "Data Science Info",
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
              attributeList: "Attribute List",
              attributeConsistency: "Attribute Constistency",
              temporalConsistency: "Temporal Constistency",
              numericValueDistribution: "Numeric Value Distribution",
              stringValueDistribution: "String Value Distribution",
              numericCorrelationAnalysis: "Numeric Correlation Analysis",
              numericAnomalyAnalysis: "Numeric Anomaly Analysis",
              dataSeasonality: "Data Seasonality"
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
            removeBookmark: "Remove Bookmark",
            noBookmarks: "No bookmarks available"
          },
          filters: {
            dataspace: 'Dataspace',
            publisher: 'Publisher',
            assetProcessingStatus: "Asset processing",
            licenses: "Licenses",
            accessibility: "Accessibility",
            dataFormat: "Data Format",
            hasDatetimeAttribute: "Has Datetime Attribute",
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
          auth: {
            register: "Register",
            logIn: "Log in",
            name: "Name",
            email: "Email",
            emailPlaceholder: "Enter your email",
            password: "Password",
            dev: "Authentication feature is currently in development."
          },
          maintenance: "Daseen is under maintenance and will be back at 5 pm"
        }
      },
      de: {
        translation: {
          page: {
            title: "Datensatz-Suchmaschine"
          },
          home: {
            dataSources: 'Datenquellen',
            dataAssets: 'Datensatz'
          },
          header: {
            home: "Startseite",
            search: "Suche",
            support: "Support",
            title: "Datensatz-Suchmaschine",
            search_placeholder: "Datensätze durchsuchen...",
            filters: "Filter",
            findSimilar: "Ähnliche EDP finden",
            back: "Zurück",
            schemaJson: "Schema",
            reportPdf: "Bericht (pdf)",
            getDataset: "Datensatz abrufen",
            bookmarks: "Lesezeichen",
            bookmark: "Lesezeichen",
            removeBookmark: "Lesezeichen entfernen",
            noBookmarks: "Keine Lesezeichen verfügbar"
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
              attributeList: "Attribut- liste",
              attributeConsistency: "Attribut- Konsistenz",
              temporalConsistency: "Zeitliche Konsistenz",
              numericValueDistribution: "Numerische Wertever- Teilung",
              stringValueDistribution: "String-Wertever- Teilung",
              numericCorrelationAnalysis: "Numerische Korrelations- Analyse",
              numericAnomalyAnalysis: "Numerische Anomalie- Analyse",
              dataSeasonality: "Daten- Saisonalität"
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
          auth: {
            register: "Registrieren",
            logIn: "Anmelden",
            name: "Name",
            email: "E-Mail",
            emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
            password: "Passwort",
            dev: "Die Authentifizierungsfunktion befindet sich derzeit in Entwicklung."
          },
          maintenance: "Daseen befindet sich in Wartung und wird ab 17 Uhr wieder verfügbar sein."
        }
      },
    }
  });

export default i18n;
