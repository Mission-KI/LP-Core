import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import QuickView from "../QuickView/QuickView";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { StarFill } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import { truncateString } from "../../../common/utils/format_utils";
import QualityMetrics from "./QualityMetrics";
import { useBookmarks } from "../../../bookmarks/contexts/BookmarksContext";

function ResultItemCard({ dataset }) {
  const { isBookmarked } = useBookmarks();

  return (
    <div className="col-md-4 pb-4">
      <Card className="h-100 border">
        <Card.Body>
          <div className="d-flex align-items-center">
            <Link to={`/details/${dataset._id}`} className={styles.title}>
              {truncateString(dataset._source.name, 25)}
            </Link>
            <div className="ps-2">
              <QuickView dataset={dataset} />
            </div>
            <div className="d-flex align-items-center ms-auto">
              {isBookmarked(dataset._id) && (
                <span className="py-1">
                  <StarFill />
                </span>
              )}
              <DatasetOptionsDropdown dataset={dataset} />
            </div>
          </div>

          <p
            className="medium pt-1 txt-lighter overflow-hidden"
            style={{ height: 68 }}
          >
            {dataset._source.description ? (
              <>{truncateString(dataset._source.description, 70)}</>
            ) : (
              "No description provided"
            )}
          </p>

          <div className="pt-2">
            <QualityMetrics dataset={dataset} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultItemCard;
