export const getEdpLanguagesList = (dataset) => {
    return dataset?._source?.unstructuredTextDatasets?.[0]?.languages?.join(", ") || "";
};
