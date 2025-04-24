import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  const addBookmark = (bookmarkId) => {
    if (!bookmarks.includes(bookmarkId)) {
      const updatedBookmarks = [bookmarkId, ...bookmarks];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      toast.success("Bookmark saved!");
    }
  };

  const removeBookmark = (bookmarkId) => {
    const updatedBookmarks = bookmarks.filter((id) => id !== bookmarkId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    toast.success("Bookmark removed!");
  };

  const isBookmarked = (bookmarkId) => {
    return bookmarks.includes(bookmarkId);
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
