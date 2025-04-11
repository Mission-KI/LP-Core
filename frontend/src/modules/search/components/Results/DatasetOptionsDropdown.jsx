import { Dropdown } from "react-bootstrap";
import {
  Download,
  Star,
  StarFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { t } from "i18next";
import { useBookmarks } from "../../../bookmarks/contexts/BookmarksContext";

function DatasetOptionsDropdown({ edp }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  return (
    <Dropdown className="mt-1">
      <Dropdown.Toggle
        as="div"
        className="hover-lg rounded px-1 py-0 m-0 pointer"
      >
        <ThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu className="border-0 shadow bgc-body">
        <Dropdown.Item
          className="d-flex align-items-center"
          href={edp?._source?.assetUrl}
          target="_blank"
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
