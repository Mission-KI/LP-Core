import { toast } from "react-toastify";

/**
 * Get the list of bookmarks from localStorage.
 * @returns {Array} The list of bookmark IDs.
 */
export const getBookmarks = () => {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
};

/**
 * Add a new bookmark ID to the list of bookmarks in localStorage.
 * @param {string} bookmarkId The ID of the bookmark to add.
 */
export const addBookmark = (bookmarkId) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.includes(bookmarkId)) {
    // Prevent duplicates
    bookmarks.push(bookmarkId);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    toast.success("Bookmark saved!");
  }
};

/**
 * Remove a bookmark ID from the list of bookmarks in localStorage.
 * @param {string} bookmarkId The ID of the bookmark to remove.
 */
export const removeBookmark = (bookmarkId) => {
  const bookmarks = getBookmarks();
  const updatedBookmarks = bookmarks.filter((id) => id !== bookmarkId);
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  toast.success("Bookmark removed!");
};

/**
 * Check if a bookmark ID is already in the list of bookmarks.
 * @param {string} bookmarkId The ID of the bookmark to check.
 * @returns {boolean} True if the bookmark exists, false otherwise.
 */
export const isBookmarked = (bookmarkId) => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(bookmarkId);
};
