import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import assetPropertiesHelpText from './modules/help/translations/assetProperties';
import expertModeHelpText from './modules/help/translations/expertMode';

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
            title: "Dataset Search Engine",
            shortDescription: "Discover, analyze, compare and manage data offerings."
          },
          header: {
            home: "Home",
            search: "Search",
            support: "Support",
            title: "Data Search Engine",
            search_placeholder: "Search datasets",
            filters: "Filter",
            findSimilar: "Find similar EDP",
            return: "return to search",
            schemaJson: "Schema",
            reportPdf: "Report (pdf)",
            getDataset: "Get Dataset",
            bookmarks: "Bookmarks",
            bookmark: "Bookmark",
            removeBookmark: "Remove Bookmark",
            help: "Help"
          },
          dataset: {
            datasets: "Datasets",
            dataset: "Dataset",
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
            attributeIntegrity: "Attribute integrity",
            numericValueDistribution: "Top 3 numeric distributions",
            stringValueDistribution: "String value distribution",
            numericCorrelationAnalysis: "Numeric correlation analysis",
            numericOutlierAnalysis: "Numeric outlier analysis",
            numericOutlierAnalysisTooltipText: "Average proportion of outliers across percentile, zScore, and interquartile range",
            dataSeasonality: "Data seasonality",
            edpStructure: "EDP Structure",
            languages: "Languages",
            tags: "TAGS",
            version: "Version",
            getDataset: "Get Dataset",
            license: "License",
            assetUploaded: "Published",
            tabs: {
              attributeList: "Attribute List",
              attributeIntegrity: "Attribute Integrity",
              embeddedImages: "Embedded images",
              embeddedTables: "Embedded tables",
              temporalConsistency: "Temporal Consistency",
              numericValueDistribution: "Numeric Value Distribution",
              stringValueDistribution: "String Value Distribution",
              numericCorrelationAnalysis: "Numeric Correlation Analysis",
              numericOutlierAnalysis: "Numeric Outlier Analysis",
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
            dataspaces: 'Dataspaces',
            publisher: 'Publisher',
            publishers: 'Publishers',
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
          settings: {
            settings: "SETTINGS",
            searchSettings: "Search Settings",
            expertMode: "Expert Mode",
            expertModeDescription: "This will enable complex filters and support in writing sophisticated search queries.",
            alwaysExpandFilters: "Always expand filters",
            alwaysExpandFiltersDescription: "This will make the filters shown by default without having to toggle them to the view.",
            language: "Language",
            theme: "Theme",
            lightTheme: "Light Theme",
            darkTheme: "Dark Theme",
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
          maintenance: "Daseen is under maintenance and will be back at 5 pm",
          assetProperties: assetPropertiesHelpText.en.fullContent,
          expertMode: expertModeHelpText.en.fullContent,
          help: {
            alert: "Welcome to the Help Center! This page provides detailed explanations and guides about various features, functionalities, and widgets available on our website. If you're unsure about how something works or need clarification, this is the perfect place to find answers.",
          }
        },
      },
      de: {
        translation: {
          page: {
            title: "Datensatz-Suchmaschine",
            shortDescription: "Entdecken, analysieren, vergleichen und verwalten Sie Datenangebote."
          },
          header: {
            home: "Startseite",
            search: "Suche",
            support: "Support",
            title: "Datensatz-Suchmaschine",
            search_placeholder: "Datensätze durchsuchen...",
            filters: "Filter",
            findSimilar: "Ähnliche EDP finden",
            return: "Zurück zur Suche",
            schemaJson: "Schema",
            reportPdf: "Bericht (pdf)",
            getDataset: "Datensatz abrufen",
            bookmarks: "Lesezeichen",
            bookmark: "Lesezeichen",
            removeBookmark: "Lesezeichen entfernen",
            noBookmarks: "Keine Lesezeichen verfügbar",
            help: "Hilfe"
          },
          dataset: {
            datasets: "Datensätze",
            dataset: "Datensatz",
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
            attributeIntegrity: "Vollständigkeit",
            numericValueDistribution: "Top 3 numerische Verteilungen",
            stringValueDistribution: "String-Werteverteilung",
            numericCorrelationAnalysis: "Numerische Korrelationsanalyse",
            numericOutlierAnalysis: "Numerische Anomalieanalyse",
            numericOutlierAnalysisTooltipText: "Durchschnittlicher Anteil der Anomalien über Perzentil, zScore und IQR",
            dataSeasonality: "Daten-Saisonalität",
            edpStructure: "EDP Struktur",
            languages: "Sprachen",
            tags: "STICHWORTE",
            version: "Version",
            getDataset: "Datensatz abrufen",
            license: "Lizenz",
            assetUploaded: "Veröffentlicht",
            tabs: {
              attributeList: "Attribut- liste",
              attributeIntegrity: "Vollständigkeit",
              embeddedImages: "Embedded images",
              embeddedTables: "Embedded tables",
              temporalConsistency: "Zeitliche Konsistenz",
              numericValueDistribution: "Numerische Wertever- Teilung",
              stringValueDistribution: "String-Wertever- Teilung",
              numericCorrelationAnalysis: "Numerische Korrelations- Analyse",
              numericOutlierAnalysis: "Numerische Anomalie- Analyse",
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
            dataspaces: 'Datenräume',
            licenses: "Lizenzen",
            dataFormat: "Datenformat",
            assetProcessingStatus: "Verarbeitungszustand",
            fileSize: "Größenbereich",
            attributes: "Attribute",
            sizeRange: "Größenbereich",
            select: "wählen",
            lines: "Zeilen",
            columns: "Spalten",
            clear: "Zurücksetzen"
          },
          settings: {
            settings: "EINSTELLUNGEN",
            searchSettings: "Sucheinstellungen",
            expertMode: "Expertenmodus",
            expertModeDescription: "Dies aktiviert komplexe Filter und unterstützt das Schreiben ausgefeilter Suchanfragen.",
            alwaysExpandFilters: "Filter immer ausklappen",
            alwaysExpandFiltersDescription: "Dadurch werden die Filter standardmäßig angezeigt, ohne dass sie umgeschaltet werden müssen.",
            language: "Sprache",
            theme: "Modus",
            lightTheme: "Heller Modus",
            darkTheme: "Dunkler Modus",
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
          maintenance: "Daseen befindet sich in Wartung und wird ab 17 Uhr wieder verfügbar sein.",
          assetProperties: assetPropertiesHelpText.de.fullContent,
          expertMode: expertModeHelpText.de.fullContent,
          help: {
            alert: "Willkommen im Hilfe-Center! Diese Seite bietet detaillierte Erklärungen und Anleitungen zu den verschiedenen Funktionen, Features und Widgets auf unserer Website. Wenn Sie sich nicht sicher sind, wie etwas funktioniert, oder eine Klärung benötigen, finden Sie hier die passenden Antworten.",
          }
        }
      },
    }
  });

export default i18n;
