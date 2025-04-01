import React from 'react';
import { StarFill } from 'react-bootstrap-icons';
import { isBookmarked } from '../../../common/utils/bookmarks';
import QualityMetrics from './QualityMetrics';
import QuickView from '../QuickView/QuickView';
import { Link } from 'react-router-dom';
import styles from "./Results.module.css";
import { truncateString } from '../../../common/utils/format_utils';
import { filesize } from 'filesize';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import DatasetOptionsDropdown from './DatasetOptionsDropdown';

const ParentNodeView = ({ dataset }) => {

    const { t } = useTranslation();

    return (
        <div className='d-flex'>
            <div>

                <div className="d-flex align-items-center flex-wrap">
                    <Link to={`/details/${dataset._id}`} className={styles.title} data-test-id="result-link">
                        {truncateString(dataset._source.name, 165)}
                    </Link>
                    <div className="ps-2 pe-4">
                        <QuickView dataset={dataset} />
                    </div>
                    <QualityMetrics dataset={dataset} />

                    <div>
                        {isBookmarked(dataset._id) && (
                            <span className="px-2 py-1">
                                <StarFill />
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
                        {dataset._source?.assetRefs?.[0]?.dataSpace?.name}
                    </a>
                    <a
                        href={`https://${dataset._source?.assetRefs?.[0]?.publisher?.url}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='small txt-primary pe-3'
                    >
                        {dataset._source?.assetRefs?.[0]?.publisher?.name}
                    </a>


                    <span className="small txt-lighter pe-3">
                        {dataset?._source?.dataTypes?.join(", ")} ({dataset?._source?.datasetTree[0]?.fileProperties?.fileType?.toUpperCase()})
                        </span>
                    <span className="small txt-lighter pe-3">
                        {filesize(dataset?._source?.volume)}
                    </span>
                    <a href={dataset._source?.assetRefs?.[0]?.license?.url} target='_blank'
                        className='small txt-primary pe-3'>
                        {t('dataset.license')} {dataset._source?.assetRefs?.[0]?.license?.name}
                    </a>
                    <span className="small txt-lighter pe-3">
                        {t('dataset.assetUploaded')} {new Date(dataset._source?.assetRefs?.[0]?.publishDate).toLocaleDateString()} ({moment(dataset._source?.assetRefs?.[0]?.publishDate).fromNow()})
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

export default ParentNodeView;
