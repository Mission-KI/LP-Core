import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Results.module.css";
import moment from "moment";
import QuickView from "./QuickView";
import DatasetOptionsDropdown from "./DatasetOptionsDropdown";
import { isBookmarked } from "../../../common/utils/bookmarks";
import { Lock, StarFill } from "react-bootstrap-icons";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ReactComponent as LockOpenMetricIcon } from '../../../common/assets/img/metric_icons/lock-open.svg';
import { ReactComponent as DatetimeMetricIcon } from '../../../common/assets/img/metric_icons/datetime-attribute.svg';
import { ReactComponent as TemporalFrequencyMetricIcon } from '../../../common/assets/img/metric_icons/temporal-frequency.svg';
import DataTypeConsestencyMetricIcon from '../../../common/assets/img/metric_icons/data-type-consistant.png';
import { ReactComponent as AttributeConsestencyMetricIcon } from '../../../common/assets/img/metric_icons/attribute-consistant.svg';
import { ReactComponent as SignificantVarianceMetricIcon } from '../../../common/assets/img/metric_icons/significant-variance.svg';
import { calculateAttributeConsistency } from "../../../dataset/utils/calculations";

function ResultItem({ dataset }) {
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
            <QuickView dataset={dataset} />
          </div>
          <div className="ps-4">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Open access</Tooltip>}
            >
              <div>
                <LockOpenMetricIcon />
              </div>
            </OverlayTrigger>
          </div>
          {dataset?._source?.structuredDatasets[0]?.datetimeColumnCount > 0 && (
            <div className="ps-2">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Date time attribute</Tooltip>}
              >
                <div>
                  <DatetimeMetricIcon />
                </div>
              </OverlayTrigger>
            </div>
          )}
          {dataset?._source?.periodicity && (
            <div className="ps-2">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Temporal frequency</Tooltip>}
              >
                <div>
                  <TemporalFrequencyMetricIcon />
                </div>
              </OverlayTrigger>
            </div>
          )}

          <div className="ps-2">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Data type consistency</Tooltip>}
            >
              <div>
                <img src={DataTypeConsestencyMetricIcon} style={{ height: 18 }} />
              </div>
            </OverlayTrigger>
          </div>

          {calculateAttributeConsistency(dataset) == 'consistent' && (
            <div className="ps-2">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Attribute consistency</Tooltip>}
              >
                <div>
                  <AttributeConsestencyMetricIcon />
                </div>
              </OverlayTrigger>
            </div>
          )}

          <div className="ps-2">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Significant variance</Tooltip>}
            >
              <div>
                <SignificantVarianceMetricIcon />
              </div>
            </OverlayTrigger>
          </div>
          <div className="ps-2">
            <span
              className={`asset-processing-status ${dataset._source.assetProcessingStatus === 'Original Data' ? 'danger' :
                dataset._source.assetProcessingStatus === 'Processed Data' ? 'warning' :
                  dataset._source.assetProcessingStatus === 'Refined Data' ? 'success' : 'primary'}`}
            >
              {dataset._source.assetProcessingStatus}
            </span>
          </div>
        </div>

        <p className="medium pt-1">{dataset._source.description}</p>

        <div className="d-flex justify-content-between mt-3 flex-wrap" style={{ maxWidth: 850 }}>
          <a
            href={dataset._source?.dataSpace?.url}
            target="_blank"
            className="medium text-muted text-decoration-underline me-2"
          >
            {dataset._source?.dataSpace?.name}
          </a>
          <a
            href={`https://${dataset._source?.publisher?.url}`}
            target='_blank'
            rel='noopener noreferrer'
            className='medium text-decoration-underline pe-2'
          >
            {dataset._source?.publisher?.name}
          </a>


          <span className="medium text-muted pe-2">Files (CSV)</span>
          <span className="medium text-muted pe-2">
            {filesize(dataset?._source?.volume)}
          </span>
          <a href={dataset?._source?.license?.url} target='_blank'
            className='medium text-decoration-underline text-muted pe-2'>
            {t('dataset.license')} {dataset?._source?.license?.name}
          </a>
          <span className="medium text-muted pe-2">
            {t('dataset.assetUploaded')} {new Date(dataset?._source?.publishDate).toLocaleDateString()} ({moment(dataset?._source?.publishDate).fromNow()})
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
        />
      </div>
    </div>
  );
}

export default ResultItem;
