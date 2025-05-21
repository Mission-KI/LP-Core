import { StarFill } from "react-bootstrap-icons";
import QualityMetrics from "./QualityMetrics";
import QuickView from "../QuickView/QuickView";
import { Link, useLocation } from "react-router-dom";
import styles from "./Results.module.css";
import {
  stripHtmlTags,
  truncateString,
} from "../../../common/utils/format_utils";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { useBookmarks } from "../../../bookmarks/contexts/BookmarksContext";
import { resolveDataset } from "../../../dataset/utils/edp_utils";

const ParentNodeView = ({ edp, node }) => {
  const { t } = useTranslation();
  const { isBookmarked } = useBookmarks();
  const location = useLocation();
  const name = stripHtmlTags(truncateString(edp._source.name, 165));
  const description = stripHtmlTags(edp?._source?.description);
  const datasetRef = edp?._source?.datasetTree[0]?.dataset?.$ref;
  const dataset = resolveDataset(edp, datasetRef);

  return (
    <div className="d-flex justify-content-between">
      <div>
        <div className="d-flex align-items-center flex-wrap">
          <Link
            to={`/details/${edp._id}`}
            state={{ fromSearch: location }}
            className={styles.title}
            data-test-id="result-link"
          >
            {name}
          </Link>
          <div className="ps-2 pe-4">
            <QuickView
              edp={edp}
              datasetRef={datasetRef}
              dataset={dataset}
              node={node}
            />
          </div>
          <QualityMetrics edp={edp} datasetRef={datasetRef} dataset={dataset} />

          <div>
            {isBookmarked(edp._id) && (
              <span className="px-2 py-1 bookmarked-item-icon">
                <StarFill />
              </span>
            )}
          </div>
        </div>

        <p className={styles.description}>{truncateString(description, 350)}</p>

        <div className="d-flex mt-3 flex-wrap">
          <a
            href={
              edp._source?.assetRefs?.[0]?.dataSpace?.url?.startsWith("http")
                ? edp._source.assetRefs[0].dataSpace.url
                : `https://${edp._source.assetRefs[0].dataSpace.url}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="small txt-primary pe-3"
          >
            {edp._source?.assetRefs?.[0]?.dataSpace?.name}
          </a>
          <a
            href={
              edp._source?.assetRefs?.[0]?.publisher?.url?.startsWith("http")
                ? edp._source.assetRefs[0].publisher.url
                : `https://${edp._source.assetRefs[0].publisher.url}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="small txt-primary pe-3"
          >
            {edp._source?.assetRefs?.[0]?.publisher?.name}
          </a>

          <span className="small txt-lighter pe-3">
            {edp?._source?.dataTypes?.join(", ")} (
            {edp?._source?.datasetTree[0]?.fileProperties?.fileType?.toUpperCase()}
            )
          </span>
          <span className="small txt-lighter pe-3">
            {filesize(edp?._source?.volume)}
          </span>
          <span className="small txt-lighter pe-3">
            {t("dataset.edpVersion")} {(parseInt(edp._version) ?? 1).toFixed(1)}
          </span>
          <a
            href={edp._source?.assetRefs?.[0]?.license?.url}
            target="_blank"
            className="small txt-primary pe-3"
          >
            {t("dataset.license")} {edp._source?.assetRefs?.[0]?.license?.name}
          </a>
          <span className="small txt-lighter pe-3">
            {t("dataset.assetUploaded")}{" "}
            {new Date(
              edp._source?.assetRefs?.[0]?.publishDate,
            ).toLocaleDateString()}{" "}
            ({moment(edp._source?.assetRefs?.[0]?.publishDate).fromNow()})
          </span>
        </div>
      </div>
      <DatasetOptionsDropdown edp={edp} />
    </div>
  );
};

export default ParentNodeView;
