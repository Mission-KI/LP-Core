const query_autocomplete_suggestions = [
  "dataSpace.name: {}",
  "publisher.name: {}",
  "publisher.url: {}",
  "name: {}",
  "tags: {}",
  "assetId: {}",
  "edps_version: {}",
  "license.name: {}",
  "license.url: {}",
  "dataCategory: {}",
  "description: {}",
  "publishDate: {}",
  "structuredDatasets.name: {}",
  "structuredDatasets.numericColumns.name: {}",
  "structuredDatasets.stringColumns.name: {}",
  "volume: {}",
  "dataSpace.name: {} AND publisher.name: {}",
  "dataSpace.name: {} OR publisher.name: {}",
  "dataCategory: {} AND edps_version: {}",
  "dataCategory: {} OR edps_version: {}",
  "name: {} AND volume: {}",
  "name: {} OR volume: {}",
  "license.name: {} AND publishDate: {}",
  "license.name: {} OR publishDate: {}",
  "structuredDatasets.numericColumns.name: {} AND structuredDatasets.stringColumns.name: {}",
  "structuredDatasets.numericColumns.name: {} OR structuredDatasets.stringColumns.name: {}",
  "(dataSpace.name: {} AND publisher.name: {}) OR (license.name: {} AND volume: {})",
  "(name: {} OR tags: {}) AND (publishDate: {} OR edps_version: {})",
  "structuredDatasets.numericColumns.name: {} AND (license.name: {} OR dataCategory: {})",
  "volume: [10000 TO 50000]",
  "structuredDatasets.numericColumns.nonNullCount: [100 TO 500]",
  "publishDate: [2020-01-01 TO 2025-01-01]",
  "dataSpace.name: {} AND tags: {}",
  "dataSpace.name: {} OR tags: {}",
  "publisher.url: {} AND license.url: {}",
  "publisher.url: {} OR license.url: {}",
  "edps_version: {} AND assetId: {}",
  "edps_version: {} OR assetId: {}",
  "structuredDatasets.name: {} AND description: {}",
  "structuredDatasets.name: {} OR description: {}",
  "dataCategory: {} AND tags: {}",
  "dataCategory: {} OR tags: {}",
  "structuredDatasets.numericColumns.name: {} AND volume: {}",
  "structuredDatasets.numericColumns.name: {} OR volume: {}",
  "license.name: {} AND dataCategory: {}",
  "license.name: {} OR dataCategory: {}",
  "publisher.name: {} AND structuredDatasets.stringColumns.name: {}",
  "publisher.name: {} OR structuredDatasets.stringColumns.name: {}",
  "publishDate: {} AND structuredDatasets.numericColumns.nonNullCount: {}",
  "publishDate: {} OR structuredDatasets.numericColumns.nonNullCount: {}",
  "volume: {} AND structuredDatasets.stringColumns.name: {}",
  "volume: {} OR structuredDatasets.stringColumns.name: {}",
];

export function getQuerySuggestions(query) {
  if (!query) return [];

  const lowerCaseQuery = query.toLowerCase();

  const matchingSuggestions = query_autocomplete_suggestions.filter((item) =>
    item.toLowerCase().includes(lowerCaseQuery),
  );

  const sortedSuggestions = matchingSuggestions.sort((a, b) => {
    const posA = a.toLowerCase().indexOf(lowerCaseQuery);
    const posB = b.toLowerCase().indexOf(lowerCaseQuery);
    return posA - posB || a.length - b.length;
  });

  return sortedSuggestions;
}
