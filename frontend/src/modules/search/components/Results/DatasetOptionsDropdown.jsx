import { Dropdown } from "react-bootstrap";
import {
  Download,
  Star,
  StarFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { t } from "i18next";
import { useBookmarks } from "../../../bookmarks/contexts/BookmarksContext";
import { imageBasePath } from "../../../common/api/config";
import { notifyEdpDownloadEvent } from "../../../dataset/api/dataset";

function DatasetOptionsDropdown({ edp }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const assetUrl = edp?._source?.assetRefs[0].assetUrl;
  const downloadUrl = assetUrl.startsWith("http")
    ? assetUrl
    : imageBasePath + edp?._id + "/" + edp?._source?.assetRefs[0].assetUrl;

  const handleDownload = async () => {
    window.open(downloadUrl, "_blank");
    await notifyEdpDownloadEvent();
  };

  return (
    <Dropdown className="mt-1">
      <Dropdown.Toggle
        as="div"
        className="hover-lg rounded px-1 py-0 m-0 pointer options-dropdown"
      >
        <ThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu className="border-0 shadow bgc-body">
        <Dropdown.Item
          as="button"
          className="d-flex align-items-center"
          onClick={() => handleDownload()}
        >
          <Download className="me-2" /> {t("dataset.getDataset")}
        </Dropdown.Item>
        {isBookmarked(edp._id) ? (
          <Dropdown.Item
            as="button"
            className="d-flex align-items-center"
            onClick={() => {
              removeBookmark(edp._id);
            }}
          >
            <StarFill className="me-2" />
            {t("bookmarks.removeBookmark")}
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            as="button"
            className="d-flex align-items-center"
            onClick={() => {
              addBookmark(edp._id);
            }}
          >
            <Star className="me-2" />
            {t("bookmarks.bookmark")}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DatasetOptionsDropdown;
