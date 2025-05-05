import { Download, Link45deg, Star, StarFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { notifyEdpDownloadEvent } from "../api/dataset";
import { apiUrl, imageBasePath } from "../../common/api/config";
import { useBookmarks } from "../../bookmarks/contexts/BookmarksContext";

const EDPActions = ({ edp }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { t } = useTranslation();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const reportDownloadUrl = imageBasePath + edp?._id + "/report.pdf";
  const assetUrl = edp?._source?.assetRefs[0].assetUrl;
  const downloadUrl = assetUrl.startsWith("http")
    ? assetUrl
    : imageBasePath + edp?._id + "/" + edp?._source?.assetRefs[0].assetUrl;

  const handleDownload = async () => {
    window.open(downloadUrl, "_blank");
    await notifyEdpDownloadEvent();
  };

  return (
    <div className="d-flex">
      <div className="d-sm-flex d-none w-100">
        {isHomePage && (
          <div className="pe-2 pt-1">
            <Link
              data-test-id="quick-view-details-link"
              to={`/details/${edp._id}`}
              state={{ fromSearch: location }}
              className="btn-hover px-2 py-2 txt-primary pointer small d-flex align-items-center"
            >
              <Link45deg className="me-2" /> {t("dataset.details")}
            </Link>
          </div>
        )}
        <form
          method="GET"
          action={apiUrl + "/connector/edp/schema/"}
          className="pe-2 pt-1"
        >
          <button
            type="submit"
            className="btn btn-hover px-2 py-2 txt-primary pointer small d-flex align-items-center"
          >
            <Download className="me-2" /> {t("header.schemaJson")}
          </button>
        </form>
        <div className="pe-2 pt-1">
          <a
            href={reportDownloadUrl}
            className="btn-hover px-2 py-2 txt-primary pointer small d-flex align-items-center"
          >
            <Download className="me-2" /> {t("header.reportPdf")}
          </a>
        </div>
        <div className="pe-2 pt-1">
          <button
            className="btn btn-hover px-2 py-2 txt-primary pointer small d-flex align-items-center"
            onClick={() => handleDownload()}
          >
            <Download className="me-2" /> {t("header.getDataset")}
          </button>
        </div>
        {!isBookmarked(edp?._id) ? (
          <div className="pe-2 pt-1">
            <span
              onClick={() => addBookmark(edp?._id)}
              data-test-id="bookmark-button"
              className="btn-hover px-2 py-2 txt-primary pointer small d-flex align-items-center"
            >
              <Star className="txt-white me-2" />
              {t("header.bookmark")}
            </span>
          </div>
        ) : (
          <div className="pe-2 pt-1">
            <span
              onClick={() => removeBookmark(edp?._id)}
              className="btn-hover px-2 py-2 txt-primary pointer small d-flex align-items-center"
            >
              <StarFill className="me-2" />
              {t("header.removeBookmark")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EDPActions;
