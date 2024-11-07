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

    return `date (${datetimeColumnCount}), string (${stringColumnCount}), int (${numericColumnCount})`

}