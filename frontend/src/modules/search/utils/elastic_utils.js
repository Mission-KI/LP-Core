export const escapeElasticQueryString = (query) => {
  // Lucene reserved characters that need escaping
  const reserved = /[+\-!():{}\[\]^"~*?\\\/]|&&|\|\|/g;

  return query.replace(reserved, (char) => `\\${char}`);
};
