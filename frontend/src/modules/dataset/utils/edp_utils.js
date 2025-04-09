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
export const datasetHasChildren = (datasetDetails, datasetRef) => {
    const datasetTree = datasetDetails?._source?.datasetTree || [];

    const rootNode = datasetTree.find(item => item.dataset["$ref"] === datasetRef);

    if (!rootNode) {
        return false;
    }

    const childrenMap = {};
    datasetTree.forEach((item) => {
        const parentRef = item.parent?.["$ref"];
        if (parentRef === rootNode.dataset["$ref"]) {
            childrenMap[rootNode.name] = childrenMap[rootNode.name] || [];
            childrenMap[rootNode.name].push(item);
        } else {
            const parentNode = datasetTree.find(d => `#/datasetTree/${datasetTree.indexOf(d)}` === parentRef);
            if (parentNode) {
                childrenMap[parentNode.name] = childrenMap[parentNode.name] || [];
                childrenMap[parentNode.name].push(item);
            }
        }
    });

    return childrenMap[rootNode.name]?.length > 0;
};
