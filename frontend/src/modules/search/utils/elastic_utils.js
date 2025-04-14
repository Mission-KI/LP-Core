const assetRefsFields = [
  "assetId",
  "assetUrl",
  "assetVersion",
  "dataSpace.name",
  "dataSpace.url",
  "publisher.name",
  "publisher.url",
  "publishDate",
  "license.name",
  "license.url",
];

export const escapeElasticQueryString = (query) => {
  // Lucene reserved characters that need escaping
  const reserved = /[+\-!():{}\[\]^"~*?\\\/]|&&|\|\|/g;

  return query.replace(reserved, (char) => `\\${char}`);
};

export const formatQueryForNestedObjects = (query) => {
  const matchingField = assetRefsFields.find((field) =>
    query.includes(field + ":"),
  );

  if (matchingField) {
    const transformedQuery = query.replace(
      new RegExp(`${matchingField}:`, "g"),
      `assetRefs.${matchingField}:`,
    );

    return {
      nested: {
        path: "assetRefs",
        query: {
          query_string: {
            query: transformedQuery,
          },
        },
      },
    };
  }

  return {
    query_string: {
      query,
      default_field: "name",
    },
  };
};
