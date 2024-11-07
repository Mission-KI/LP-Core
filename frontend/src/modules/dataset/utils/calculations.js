import moment from 'moment';

export const calculateAttributeConsistency = (dataset) => {

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
    const earliest = dataset?._source?.structuredDatasets?.[0]?.datetimeColumns?.[0]?.earliest;
    const latest = dataset?._source?.structuredDatasets?.[0]?.datetimeColumns?.[0]?.latest;

    if (!earliest || !latest) return 'N/A';

    const earliestFormatted = moment(earliest).format('MM/DD/YYYY');
    const latestFormatted = moment(latest).format('MM/DD/YYYY');

    const durationText = moment(earliest).from(moment(latest), true);

    return `${earliestFormatted} - ${latestFormatted} (${durationText})`;
};

export const calculateTemporalConsistency = (dataset) => {

    return `freq (gaps)`

}