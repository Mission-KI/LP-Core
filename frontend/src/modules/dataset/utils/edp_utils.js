export const getEdpLanguagesList = (dataset) => {
    return dataset?._source?.unstructuredTextDatasets?.[0]?.languages?.join(", ") || "";
};

export const getNumericOutlierAnalysis = (dataset) => {
    let totalRows = 0;
    let totalOutliers = 0;

    dataset?._source?.structuredDatasets?.[0]?.numericColumns.forEach(column => {
        if (column.interpretableCount > 0) {
            totalRows += column.interpretableCount;
            let outlierCount = (column.percentileOutlierCount || 0) + (column.zScoreOutlierCount || 0) + (column.iqrOutlierCount || 0);
            totalOutliers += outlierCount;
        }
    });

    if (totalRows === 0) return "no outliers";

    let outlierPercentage = (totalOutliers / totalRows) * 100;

    if (outlierPercentage === 0) {
        return "no outliers";
    } else if (outlierPercentage <= 5) {
        return `few outliers (${outlierPercentage.toFixed(2)}%)`;
    } else {
        return `many outliers (${outlierPercentage.toFixed(2)}%)`;
    }
}