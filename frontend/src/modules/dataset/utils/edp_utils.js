export const getEdpLanguagesList = (dataset) => {
    if (!dataset?._source?.unstructuredTextDatasets) return "";

    const allLanguages = dataset._source.unstructuredTextDatasets
        .flatMap(ds => ds.languages || []);

    const uniqueLanguages = [...new Set(allLanguages)];

    return uniqueLanguages.length > 0 ? uniqueLanguages.join(", ") : "None";
};

export const getNumericOutlierAnalysis = (dataset) => {
    const numericColumns = dataset?._source?.structuredDatasets?.[0]?.numericColumns || [];

    const outlierPercentages = numericColumns
        .map(col => col.relativeOutlierCount)
        .filter(val => typeof val === "number");

    if (outlierPercentages.length === 0) return "no outliers";

    const averageOutlierPercentage = outlierPercentages.reduce((sum, val) => sum + val, 0) / outlierPercentages.length;

    if (averageOutlierPercentage === 0) {
        return "no outliers";
    } else if (averageOutlierPercentage <= 5) {
        return `few outliers (${averageOutlierPercentage.toFixed(2)}%)`;
    } else {
        return `many outliers (${averageOutlierPercentage.toFixed(2)}%)`;
    }
};

export const resolveDataset = (datasetDetails, datasetRef) => {
    const match = datasetRef.match(/^#\/([^/]+)\/(\d+)$/);
    
    if (match) {
        const [, arrayName, index] = match;
        
        const datasetsArray = datasetDetails?._source?.[arrayName];
        
        if (datasetsArray && Array.isArray(datasetsArray)) {
            return datasetsArray[parseInt(index, 10)] || null;
        }
    }

    return null;
};
