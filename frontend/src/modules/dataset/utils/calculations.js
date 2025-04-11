import moment from "moment";

export const calculateAttributeIntegrity = (edp) => {
  var sumOfMissingValueCounts = 0;
  var countWithMissingValues = 0;

  edp?._source?.structuredDatasets[0]?.numericColumns?.map((column) => {
    sumOfMissingValueCounts = sumOfMissingValueCounts + column.nullCount;
    if (column.nullCount) {
      countWithMissingValues++;
    }
  });

  edp?._source?.structuredDatasets[0]?.stringColumns?.map((column) => {
    sumOfMissingValueCounts = sumOfMissingValueCounts + column.nullCount;
    if (column.nullCount) {
      countWithMissingValues++;
    }
  });

  edp?._source?.structuredDatasets[0]?.datetimeColumns?.map((column) => {
    sumOfMissingValueCounts = sumOfMissingValueCounts + column.nullCount;
    if (column.nullCount) {
      countWithMissingValues++;
    }
  });

  if (sumOfMissingValueCounts == 0) {
    return "consistent";
  } else if (
    countWithMissingValues == edp?._source?.structuredDatasets?.[0]?.columnCount
  ) {
    return "inconsistent";
  } else {
    return `partially inconsistent (${countWithMissingValues})`;
  }
};

export const calculateDataTypesAttribute = (edp) => {
  const numericColumnCount =
    edp?._source?.structuredDatasets?.[0]?.numericColumns?.length;
  const datetimeColumnCount =
    edp?._source?.structuredDatasets?.[0]?.datetimeColumns?.length;
  const stringColumnCount =
    edp?._source?.structuredDatasets?.[0]?.stringColumns?.length;

  return `date (${datetimeColumnCount}), string (${stringColumnCount}), numeric (${numericColumnCount})`;
};

export const calculateTemporalCover = (edp) => {
  const earliest = edp?._source?.temporalCover?.earliest;
  const latest = edp?._source?.temporalCover?.latest;

  if (!earliest || !latest) return "N/A";

  const earliestFormatted = moment(earliest).format("MM/DD/YYYY");
  const latestFormatted = moment(latest).format("MM/DD/YYYY");

  const durationText = moment(earliest).from(moment(latest), true);

  return `${earliestFormatted} - ${latestFormatted} (${durationText})`;
};

export const getStringValueDistributionOverview = (edp) => {
  if (!edp?._source?.structuredDatasets?.[0]?.stringColumns?.length) {
    return "N/A";
  }

  const stringColumns = edp._source.structuredDatasets[0].stringColumns;

  let homogenCount = 0;
  let heterogenCount = 0;

  stringColumns.forEach((column) => {
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

export const getTopNumericDistributions = (edp, topN = 3) => {
  if (!edp?._source?.structuredDatasets?.[0]?.numericColumns?.length) {
    return "N/A";
  }

  const numericColumns = edp._source.structuredDatasets[0].numericColumns;

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

  return topDistributions.length ? `${topDistributions.join(", ")}` : "N/A";
};

export const getUniqueNumericDistributions = (edp) => {
  if (!edp?._source?.structuredDatasets?.[0]?.numericColumns?.length) {
    return [];
  }

  const numericColumns = edp._source.structuredDatasets[0].numericColumns;

  // Extract unique distribution names
  const uniqueDistributions = [
    ...new Set(
      numericColumns.map((column) => column.distribution).filter(Boolean),
    ),
  ];

  return uniqueDistributions;
};

export const getNumericCorrelationSummary = (edp) => {
  if (!edp?._source?.structuredDatasets?.[0]?.numericColumns?.length) {
    return [];
  }

  const correlationSummary =
    edp._source.structuredDatasets[0].correlationSummary;

  const { partial, strong } = correlationSummary;

  if (partial === 0 && strong === 0) {
    return ["no correlations"];
  }

  if (partial === 0 && strong > 0) {
    return ["strong correlations"];
  }

  if (partial > 0 && strong === 0) {
    return ["partial correlations"];
  }

  if (partial > 0 && strong > 0) {
    return ["partial and strong correlations"];
  }

  return "Unknown";
};

export const isDataTypeConsistent = (edp) => {
  if (
    !edp ||
    !edp._source.structuredDatasets ||
    edp._source.structuredDatasets.length === 0
  ) {
    return false;
  }

  const numericColumns = edp._source.structuredDatasets[0].numericColumns;

  if (!numericColumns || numericColumns.length === 0) {
    return true;
  }

  const firstDataType = numericColumns[0].dataType;
  return numericColumns.every((column) => column.dataType === firstDataType);
};
