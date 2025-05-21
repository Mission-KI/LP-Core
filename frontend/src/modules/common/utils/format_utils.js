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

  const temp = document.createElement("textarea");
  temp.innerHTML = str;
  str = temp.value;

  str = str.replace(/\u00A0/g, " ");
  str = str.replace(/&nbsp;/g, " ");
  str = str.replace(/&lt;/g, "<");
  str = str.replace(/&gt;/g, ">");
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&euro;/g, "€");
  str = str.replace(/<[^>]*>/g, "");
  return str;
};
