export const truncateString = (str, maxLength) => {
  if (str === null || str === undefined) {
    return "";
  }
  if (str?.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};
export const stripHtmlTags = (str) => {
  if (str === null || str === undefined) {
    return "";
  }
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/<[^>]*>/g, "");
  return str;
};
