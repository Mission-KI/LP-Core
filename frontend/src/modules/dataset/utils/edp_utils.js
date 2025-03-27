export const getEdpLanguagesList = (dataset) => {
    if (!dataset?._source?.unstructuredTextDatasets) return "";

    const allLanguages = dataset._source.unstructuredTextDatasets
        .flatMap(ds => ds.languages || []);

    const uniqueLanguages = [...new Set(allLanguages)];

    return uniqueLanguages.length > 0 ? uniqueLanguages.join(", ") : "None";
};
