export const getEdpLanguagesList = (dataset) => {
    if (!dataset?._source?.unstructuredTextDatasets) return "";

    const allLanguages = dataset._source.unstructuredTextDatasets
        .flatMap(ds => ds.languages || []);

    const uniqueLanguages = [...new Set(allLanguages)];

    return uniqueLanguages.length > 0 ? uniqueLanguages.join(", ") : "None";
};

export const getNumericOutlierAnalysis = (dataset) => {
    let totalColumns = 0;
    let totalOutlierPercentage = 0;

    dataset?._source?.structuredDatasets?.[0]?.numericColumns.forEach(column => {
        if (column.interpretableCount > 0) {
            let outlierCount = (column.percentileOutlierCount || 0) + (column.zScoreOutlierCount || 0) + (column.iqrOutlierCount || 0);
            let outlierPercentage = (outlierCount / column.interpretableCount) * 100;

            totalOutlierPercentage += outlierPercentage;
            totalColumns++;
        }
    });

    if (totalColumns === 0) return "no outliers";

    let averageOutlierPercentage = totalOutlierPercentage / totalColumns;

    if (averageOutlierPercentage === 0) {
        return "no outliers";
    } else if (averageOutlierPercentage <= 5) {
        return `few outliers (${averageOutlierPercentage.toFixed(2)}%)`;
    } else {
        return `many outliers (${averageOutlierPercentage.toFixed(2)}%)`;
    }
};