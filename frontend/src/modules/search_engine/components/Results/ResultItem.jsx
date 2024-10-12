import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import moment from "moment";
import DatasetOverviewPopup from "./DatasetOverviewPopup";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { isBookmarked } from "../../../common/utils/bookmarks";
import { StarFill } from "react-bootstrap-icons";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

function ResultItem({ dataset, bookmarks, setBookmarks }) {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (dataset?._id) {
      setIsBookmarkedState(isBookmarked(dataset._id));
    }
  }, [dataset]);

  return (
    <div className={styles.resultItem}>
      <div className="w-100 pe-3">
        <div className="d-flex align-items-center">
          <Link to={`/details/${dataset._id}`} className={styles.title}>
            {dataset._source.name}
          </Link>
          <div className="ps-2">
            <DatasetOverviewPopup dataset={dataset} />
          </div>
        </div>

        <p className="medium pt-1">{dataset._source.description}</p>

        <div className="d-flex justify-content-between mt-3 flex-wrap">
          <a
            href={dataset._source?.dataSpace?.url}
            target="_blank"
            className="medium text-muted text-decoration-underline me-2"
          >
            {dataset._source?.dataSpace?.name}
          </a>
          <span className="medium text-muted text-decoration-underline pe-2">
            serie-a-logistic solutions
          </span>
          <span className="medium text-muted pe-2">Files (CSV)</span>
          <span className="medium text-muted pe-2">
            {filesize(dataset?._source?.volume)}
          </span>
          <a href={dataset?._source?.licenseId} target='_blank'
            className='medium text-decoration-underline text-muted pe-2'>
            License
          </a>
          <span className="medium text-muted pe-2">{t('dataset.version')} {dataset?._source?.edps_version}</span>
          <span className="medium text-muted pe-2">
            {moment(dataset?._source?.publishDate).fromNow()}
          </span>
        </div>
      </div>
      <div>
        {isBookmarkedState && (
          <span className="px-2 py-1">
            <StarFill />
          </span>
        )}
        <DatasetOptionsDropdown
          dataset={dataset}
          isBookmarkedState={isBookmarkedState}
          setIsBookmarkedState={setIsBookmarkedState}
          bookmarks={bookmarks} setBookmarks={setBookmarks}
        />
      </div>
    </div>
  );
}

export default ResultItem;
