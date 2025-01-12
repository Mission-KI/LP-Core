import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import moment from "moment";
import QuickView from "./QuickView";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { isBookmarked } from "../../../common/utils/bookmarks";
import { StarFill } from "react-bootstrap-icons";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";
import QualityMetrics from "./QualityMetrics";
import { truncateString } from "../../../common/utils/format_utils";

function ResultItem({ dataset }) {

  const { t } = useTranslation();

  return (
    <div className={styles.resultItem}>
      <div className="w-md-100 pe-3">
        <div className="d-flex align-items-center flex-wrap">
          <Link to={`/details/${dataset._id}`} className={styles.title} data-test-id="result-link">
            {truncateString(dataset._source.name, 65)}
          </Link>
          <div className="ps-2 pe-4">
            <QuickView dataset={dataset} />
          </div>
          <QualityMetrics dataset={dataset} />

          <div>
            {isBookmarked(dataset._id) && (
              <span className="px-2 py-1">
                <StarFill className="text-warning" />
              </span>
            )}
          </div>

        </div>

        <p className={styles.description}>{truncateString(dataset._source.description, 350)}</p>

        <div className="d-flex mt-3 flex-wrap">
          <a
            href={dataset._source?.dataSpace?.url}
            target="_blank"
            className="small txt-primary me-3"
          >
            {dataset._source?.dataSpace?.name}
          </a>
          <a
            href={`https://${dataset._source?.publisher?.url}`}
            target='_blank'
            rel='noopener noreferrer'
            className='small txt-primary pe-3'
          >
            {dataset._source?.publisher?.name}
          </a>


          <span className="small txt-lighter pe-3">Files (CSV)</span>
          <span className="small txt-lighter pe-3">
            {filesize(dataset?._source?.volume)}
          </span>
          <a href={dataset?._source?.license?.url} target='_blank'
            className='small txt-primary pe-3'>
            {t('dataset.license')} {dataset?._source?.license?.name}
          </a>
          <span className="small txt-lighter pe-3">
            {t('dataset.assetUploaded')} {new Date(dataset?._source?.publishDate).toLocaleDateString()} ({moment(dataset?._source?.publishDate).fromNow()})
          </span>
        </div>
      </div>
      <div className={`d-md-block d-none ${styles.optionsDropdownWrapper}`}>
        <DatasetOptionsDropdown
          dataset={dataset}
        />
      </div>
    </div>
  );
}

export default ResultItem;
