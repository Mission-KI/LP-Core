import { Link, useLocation } from "react-router-dom";
import styles from "./Results.module.css";
import QuickView from "../QuickView/QuickView";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { StarFill } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import {
  stripHtmlTags,
  truncateString,
} from "../../../common/utils/format_utils";
import QualityMetrics from "./QualityMetrics";
import { useBookmarks } from "../../../bookmarks/contexts/BookmarksContext";
import { resolveDataset } from "../../../dataset/utils/edp_utils";

function ResultItemCard({ edp }) {
  const { isBookmarked } = useBookmarks();
  const location = useLocation();
  const name = stripHtmlTags(truncateString(edp._source.name, 25));
  const description = stripHtmlTags(edp?._source?.description);
  const datasetRef = edp?._source?.datasetTree[0]?.dataset?.$ref;
  const dataset = resolveDataset(edp, datasetRef);
  return (
    <div className="col-md-4 pb-4">
      <Card className="h-100 border">
        <Card.Body>
          <div className="d-flex align-items-center">
            <Link
              to={`/details/${edp._id}`}
              className={styles.title}
              state={{ fromSearch: location }}
            >
              {name}
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
            {description ? (
              <>{truncateString(description, 70)}</>
            ) : (
              "No description provided"
            )}
          </p>

          <div className="pt-2">
            <QualityMetrics
              edp={edp}
              datasetRef={datasetRef}
              dataset={dataset}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultItemCard;
