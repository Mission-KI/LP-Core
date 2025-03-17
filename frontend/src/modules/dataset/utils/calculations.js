import moment from 'moment';

export const calculateAttributeIntegrity = (dataset) => {

    var sumOfMissingValueCounts = 0;
    var countWithMissingValues = 0;

    dataset?._source?.structuredDatasets[0]?.numericColumns?.map((column) => {
        sumOfMissingValueCounts = sumOfMissingValueCounts + column.nullCount;
        if (column.nullCount) {
            countWithMissingValues++;
        }
    })

    dataset?._source?.structuredDatasets[0]?.stringColumns?.map((column) => {
        sumOfMissingValueCounts = sumOfMissingValueCounts + column.nullCount;
        if (column.nullCount) {
            countWithMissingValues++;
        }
    })

    dataset?._source?.structuredDatasets[0]?.datetimeColumns?.map((column) => {
        sumOfMissingValueCounts = sumOfMissingValueCounts + column.nullCount;
        if (column.nullCount) {
            countWithMissingValues++;
        }
    })

    if (sumOfMissingValueCounts == 0) {
        return "consistent"
    }else if (countWithMissingValues == dataset?._source?.structuredDatasets?.[0]?.columnCount){
        return "inconsistent"
    }else{
        return `partially inconsistent (${countWithMissingValues})`
    }

}

export const calculateDataTypesAttribute = (dataset) => {

    const numericColumnCount = dataset?._source?.structuredDatasets?.[0]?.numericColumns?.length
    const datetimeColumnCount = dataset?._source?.structuredDatasets?.[0]?.datetimeColumns?.length
    const stringColumnCount = dataset?._source?.structuredDatasets?.[0]?.stringColumns?.length

    return `date (${datetimeColumnCount}), string (${stringColumnCount}), numeric (${numericColumnCount})`

}

export const calculateTemporalCover = (dataset) => {
    const earliest = dataset?._source?.temporalCover?.earliest;
    const latest = dataset?._source?.temporalCover?.latest;

    if (!earliest || !latest) return 'N/A';

    const earliestFormatted = moment(earliest).format('MM/DD/YYYY');
    const latestFormatted = moment(latest).format('MM/DD/YYYY');

    const durationText = moment(earliest).from(moment(latest), true);

    return `${earliestFormatted} - ${latestFormatted} (${durationText})`;
};


export const getStringValueDistributionOverview = (dataset) => {

    if (!dataset?._source?.structuredDatasets?.[0]?.stringColumns?.length) {
        return "N/A";
    }

    const stringColumns = dataset._source.structuredDatasets[0].stringColumns;

    let homogenCount = 0;
    let heterogenCount = 0;

    stringColumns.forEach(column => {
        if (column.numberUnique === 1) {
            homogenCount++;
        } else if (column.numberUnique > 1) {
            heterogenCount++;
        }
    });

    const totalColumns = stringColumns.length;

    if (homogenCount === totalColumns) return "all/homogen";
    if (heterogenCount === totalColumns) return "all/heterogen";
    if (homogenCount / totalColumns > 0.5) return "many/homogen";
    if (heterogenCount / totalColumns >= 0.5) return "many/heterogen";

    return "N/A";
};

export const getTopNumericDistributions = (dataset, topN = 3) => {
    if (!dataset?._source?.structuredDatasets?.[0]?.numericColumns?.length) {
        return "N/A";
    }

    const numericColumns = dataset._source.structuredDatasets[0].numericColumns;

    // Collect unique distributions
    const distributionCounts = numericColumns.reduce((acc, column) => {
        if (column.distribution) {
            acc[column.distribution] = (acc[column.distribution] || 0) + 1;
        }
        return acc;
    }, {});

    // Sort distributions by frequency (most common first)
    const sortedDistributions = Object.entries(distributionCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
        .map(([distribution]) => distribution);

    // Take the top N distributions
    const topDistributions = sortedDistributions.slice(0, topN);

    return topDistributions.length ? `${topDistributions.join(', ')}` : "N/A";
};

export const getUniqueNumericDistributions = (dataset) => {
    if (!dataset?._source?.structuredDatasets?.[0]?.numericColumns?.length) {
        return [];
    }

    const numericColumns = dataset._source.structuredDatasets[0].numericColumns;

    // Extract unique distribution names
    const uniqueDistributions = [...new Set(numericColumns.map(column => column.distribution).filter(Boolean))];

    return uniqueDistributions;
};
