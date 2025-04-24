export const truncateString = (str, maxLength) => {
  if (str === null || str === undefined) {
    return "";
  }
  if (str?.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};
