import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import QuickView from "../QuickView/QuickView";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { StarFill } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import { truncateString } from "../../../common/utils/format_utils";
import QualityMetrics from "./QualityMetrics";
import { useBookmarks } from "../../../bookmarks/contexts/BookmarksContext";

function ResultItemCard({ edp }) {
  const { isBookmarked } = useBookmarks();

  return (
    <div className="col-md-4 pb-4">
      <Card className="h-100 border">
        <Card.Body>
          <div className="d-flex align-items-center">
            <Link to={`/details/${edp._id}`} className={styles.title}>
              {truncateString(edp._source.name, 25)}
            </Link>
            <div className="ps-2">
              <QuickView edp={edp} />
            </div>
            <div className="d-flex align-items-center ms-auto">
              {isBookmarked(edp._id) && (
                <span className="py-1">
                  <StarFill />
                </span>
              )}
              <DatasetOptionsDropdown edp={edp} />
            </div>
          </div>

          <p
            className="medium pt-1 txt-lighter overflow-hidden"
            style={{ height: 68 }}
          >
            {edp._source.description ? (
              <>{truncateString(edp._source.description, 70)}</>
            ) : (
              "No description provided"
            )}
          </p>

          <div className="pt-2">
            <QualityMetrics edp={edp} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultItemCard;
