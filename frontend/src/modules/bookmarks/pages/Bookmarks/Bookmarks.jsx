import { useState, useEffect } from "react";
import { getBookmarkedDatasets } from "../../../common/api/elastic";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { StarHalf } from "react-bootstrap-icons";
import ResultItem from "../../../search/components/Results/ResultItem";
import { useBookmarks } from "../../contexts/BookmarksContext";

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const fetchedBookmarks = await getBookmarkedDatasets(bookmarks);
        setBookmarkedItems(fetchedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [bookmarks]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner variant="dark" />
      </div>
    );
  }

  const hasBookmarks = bookmarkedItems?.hits?.hits?.length > 0;

  return (
    <div className="container">
      {hasBookmarks && (
        <h2 className="bold mb-5">{t("bookmarks.bookmarks")}</h2>
      )}

      {hasBookmarks ? (
        bookmarkedItems.hits.hits.map((edp) => (
          <ResultItem edp={edp} key={edp._id} />
        ))
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "calc(100vh - 120.5px)" }}
        >
          <div
            className="d-flex flex-column align-items-center"
            style={{ transform: "translateY(-50%)" }}
          >
            <StarHalf className="txt-lighter" style={{ fontSize: "50pt" }} />
            <h5 className="pt-4 txt-lighter" style={{ fontWeight: "400" }}>
              {t("bookmarks.noBookmarks")}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
