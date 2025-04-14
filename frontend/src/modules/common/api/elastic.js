import { useSettings } from "../contexts/SettingsContext";
import { elasticURL } from "./config";

export const getEdps = async (from = 0, size = 10, expertMode) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const filters = [];
    const groupedFilters = {};

    for (const key of urlParams.keys()) {
      const values = urlParams.getAll(key);

      if (key === "page" || key === "sorting") continue;

      if (key === "q") {
        if (values[0] === "") continue;
        if (expertMode) {
          filters.push({
            query_string: {
              query: values[0],
              default_field: "name",
            },
          });
        } else {
          filters.push({
            multi_match: {
              query: values[0],
              fields: ["name", "description"],
              type: "best_fields",
            },
          });
        }
      } else if (key === "dataTypes") {
        filters.push({
          terms: { dataTypes: values },
        });
      } else if (key === "dataSpace.name") {
        filters.push({
          nested: {
            path: "assetRefs",
            query: {
              bool: {
                must: [
                  {
                    term: {
                      "assetRefs.dataSpace.name.keyword": values[0],
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (key === "publisher.name") {
        filters.push({
          nested: {
            path: "assetRefs",
            query: {
              bool: {
                must: [
                  {
                    term: {
                      "assetRefs.publisher.name.keyword": values[0],
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (key === "dataType") {
        filters.push({
          bool: {
            should: values.map((value) => ({
              match: { dataTypes: value },
            })),
            minimum_should_match: 1,
          },
        });
      } else if (key === "license.name") {
        filters.push({
          nested: {
            path: "assetRefs",
            query: {
              bool: {
                must: [
                  {
                    term: {
                      "assetRefs.license.name.keyword": values[0],
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (key === "min_size") {
        const min_percentage = parseFloat(values[0]);
        const min_bytes = percentageToBytes(min_percentage);
        filters.push({
          range: {
            volume: {
              gt: min_bytes,
            },
          },
        });
      } else if (key === "max_size") {
        const max_percentage = parseFloat(values[0]);
        const max_bytes = percentageToBytes(max_percentage);
        filters.push({
          range: {
            volume: {
              lt: max_bytes,
            },
          },
        });
      } else if (key === "min_lines") {
        const min_lines = parseInt(values[0]);
        filters.push({
          range: {
            "structuredDatasets.rowCount": {
              gte: min_lines,
            },
          },
        });
      } else if (key === "max_lines") {
        const max_lines = parseInt(values[0]);
        filters.push({
          range: {
            "structuredDatasets.rowCount": {
              lte: max_lines,
            },
          },
        });
      } else if (key === "min_columns") {
        const min_columns = parseInt(values[0]);
        filters.push({
          range: {
            "structuredDatasets.columnCount": {
              gte: min_columns,
            },
          },
        });
      } else if (key === "max_columns") {
        const max_columns = parseInt(values[0]);
        filters.push({
          range: {
            "structuredDatasets.columnCount": {
              lte: max_columns,
            },
          },
        });
      } else if (key === "hasDatetimeAttribute") {
        filters.push({
          range: {
            "structuredDatasets.datetimeColumnCount": {
              gt: 0,
            },
          },
        });
      } else if (key === "hasTemporalFrequency") {
        filters.push({
          exists: {
            field: "periodicity",
          },
        });
      } else if (key === "dataTypeConsistency") {
        filters.push({
          script: {
            script: {
              source: `
                if (params._source != null &&
                    params._source.containsKey('structuredDatasets') &&
                    params._source.structuredDatasets != null &&
                    params._source.structuredDatasets.length > 0) {
      
                  def firstDataset = params._source.structuredDatasets[0];
      
                  if (firstDataset.containsKey('numericColumns') &&
                      firstDataset.numericColumns != null &&
                      firstDataset.numericColumns.length > 0) {
      
                    def firstType = firstDataset.numericColumns[0].dataType;
      
                    for (col in firstDataset.numericColumns) {
                      if (col.dataType != firstType) {
                        return false;
                      }
                    }
                  }
                  return true;
                }
      
                return false;
              `,
              lang: "painless",
            },
          },
        });
      } else if (key === "significantVariance") {
        filters.push({
          range: {
            "structuredDatasets.numericColumns.variance": {
              gt: 0,
            },
          },
        });
      } else {
        if (!groupedFilters[key]) {
          groupedFilters[key] = [];
        }
        groupedFilters[key].push(...values);
      }
    }

    for (const [key, values] of Object.entries(groupedFilters)) {
      if (key === "freely_available") {
        filters.push({
          terms: { [key]: [...new Set(values)] },
        });
      } else {
        filters.push({
          terms: { [`${key}.keyword`]: [...new Set(values)] },
        });
      }
    }

    let sort = [
      "_score",
      {
        _script: {
          type: "number",
          script: {
            source: "doc['description.keyword'].size() > 0 ? 1 : 0",
            lang: "painless",
          },
          order: "desc",
        },
      },
      { "description.keyword": "desc" },
    ];

    const sorting = urlParams.get("sorting");
    if (sorting === "newest" || sorting === "oldest") {
      sort = [
        {
          "assetRefs.publishDate": {
            order: sorting === "newest" ? "desc" : "asc",
            nested: {
              path: "assetRefs",
            },
            mode: "max",
          },
        },
        ...sort,
      ];
    }

    const query = {
      from: from,
      size: size,
      version: true,
      ...(filters.length > 0
        ? {
            query: {
              bool: {
                filter: filters,
              },
            },
          }
        : {}),
      sort: sort,
    };

    const response = await fetch(elasticURL + "/_search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilterValues = async () => {
  try {
    const query = {
      size: 0,
      aggs: {
        nested_asset_refs: {
          nested: { path: "assetRefs" },
          aggs: {
            distinct_dataSpace_names: {
              terms: {
                field: "assetRefs.dataSpace.name.keyword",
                size: 10000,
              },
            },
            distinct_license_names: {
              terms: {
                field: "assetRefs.license.name.keyword",
                size: 10000,
              },
            },
            distinct_publisher_names: {
              terms: {
                field: "assetRefs.publisher.name.keyword",
                size: 10000,
              },
            },
          },
        },
        max_row_count: {
          max: { field: "structuredDatasets.rowCount" },
        },
        max_column_count: {
          max: { field: "structuredDatasets.columnCount" },
        },
        distinct_dataTypes: {
          terms: {
            field: "dataTypes.keyword",
            size: 10000,
          },
        },
      },
    };

    const response = await fetch(elasticURL + "/_search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEdp = async (id) => {
  try {
    const response = await fetch(`${elasticURL}/_doc/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getSimilarEdps = async (id) => {
  const query = {
    size: 9,
    query: {
      more_like_this: {
        fields: ["name", "description"],
        like: [
          {
            _index: "edp-data",
            _id: id,
          },
        ],
        min_term_freq: 1,
        min_doc_freq: 1,
      },
    },
  };

  try {
    const response = await fetch(elasticURL + "/_search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getAutocompleteSuggestions = async (searchTerm) => {
  try {
    const query = {
      query: {
        query_string: {
          query: `${searchTerm}*`,
          default_field: "name",
        },
      },
    };

    const response = await fetch(`${elasticURL}/_search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const responseData = await response.json();

    if (response.ok) {
      const uniqueSuggestions = [
        ...new Set(responseData.hits.hits.map((hit) => hit._source.name)),
      ];
      return uniqueSuggestions;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getTotalCount = async () => {
  try {
    const response = await fetch(`${elasticURL}/_count`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData.count;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getBookmarkedDatasets = async (bookmarks) => {
  try {
    if (bookmarks.length === 0) {
      return { hits: { hits: [] } };
    }

    const query = {
      from: 0,
      size: 10,
      query: {
        terms: {
          _id: bookmarks,
        },
      },
    };

    const response = await fetch(elasticURL + "/_search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const percentageToBytes = (percentage) => {
  const ONE_MB = 1024 * 1024;
  const ONE_GB = 1024 * 1024 * 1024;
  const ONE_TB = 1024 * 1024 * 1024 * 1024;
  const MAX_TB = 1000 * ONE_TB;

  if (percentage <= 25) {
    return (percentage / 25) * ONE_MB;
  } else if (percentage <= 50) {
    return ONE_MB + ((percentage - 25) / 25) * (ONE_GB - ONE_MB);
  } else if (percentage <= 75) {
    return ONE_GB + ((percentage - 50) / 25) * (ONE_TB - ONE_GB);
  } else if (percentage <= 100) {
    return ONE_TB + ((percentage - 75) / 25) * (MAX_TB - ONE_TB);
  }

  return MAX_TB;
};
