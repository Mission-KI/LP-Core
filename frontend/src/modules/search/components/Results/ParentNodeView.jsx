import React from "react";
import { StarFill } from "react-bootstrap-icons";
import QualityMetrics from "./QualityMetrics";
import QuickView from "../QuickView/QuickView";
import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import { truncateString } from "../../../common/utils/format_utils";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { useBookmarks } from "../../../bookmarks/contexts/BookmarksContext";

const ParentNodeView = ({ edp }) => {
  const { t } = useTranslation();
  const { isBookmarked } = useBookmarks();

  return (
    <div className="d-flex justify-content-between">
      <div>
        <div className="d-flex align-items-center flex-wrap">
          <Link
            to={`/details/${edp._id}`}
            className={styles.title}
            data-test-id="result-link"
          >
            {truncateString(edp._source.name, 165)}
          </Link>
          <div className="ps-2 pe-4">
            <QuickView edp={edp} />
          </div>
          <QualityMetrics edp={edp} />

          <div>
            {isBookmarked(edp._id) && (
              <span className="px-2 py-1">
                <StarFill />
              </span>
            )}
          </div>
        </div>

        <p className={styles.description}>
          {truncateString(edp._source.description, 350)}
        </p>

        <div className="d-flex mt-3 flex-wrap">
          <a
            href={edp._source?.dataSpace?.url}
            target="_blank"
            className="small txt-primary me-3"
          >
            {edp._source?.assetRefs?.[0]?.dataSpace?.name}
          </a>
          <a
            href={edp._source?.assetRefs?.[0]?.publisher?.url}
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
