import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styles from './Results.module.css'
import moment from 'moment';
import DatasetOverviewPopup from './DatasetOverviewPopup';
import DatasetOptionsDropdown from './DatasetOptionsDropdown';
import { isBookmarked } from '../../../common/utils/bookmarks';
import { Dropdown } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';

function ResultItem({ dataset }) {

    const [isBookmarkedState, setIsBookmarkedState] = useState(false);

    useEffect(() => {
        if (dataset?._id) {
            setIsBookmarkedState(isBookmarked(dataset._id));
        }
    }, [dataset]);

    return (
        <div className={styles.resultItem}>
            <div className='w-100 pe-3'>
                <Link to={`/details/${dataset._id}`} className={styles.title}>
                    {dataset._source.name}
                    <div className='ps-2'>
                        <DatasetOverviewPopup dataset={dataset} />
                    </div>
                </Link>
                <p className='medium pt-2'>{dataset._source.description}</p>

                <div className='d-flex justify-content-between mt-4 flex-wrap'>
                    <a href={dataset._source?.dataSpace?.url} target='_blank' className='medium text-muted text-decoration-underline me-2'>{dataset._source?.dataSpace?.name}</a>
                    <span className='medium text-muted text-decoration-underline pe-2'>serie-a-logistic solutions</span>
                    <span className='medium text-muted pe-2'>Files (CSV)</span>
                    <span className='medium text-muted pe-2'>{(dataset?._source?.volume / 1024 / 1024).toFixed(2)} MB</span>
                    <span className='medium text-muted pe-2'>License other-commercial</span>
                    <span className='medium text-muted pe-2'>Version 1.0</span>
                    <span className='medium text-muted pe-2'>{moment(dataset?._source?._timestamp).fromNow()}</span>
                </div>
            </div>
            <div>
                {isBookmarkedState && (
                    <span className='px-2 py-1'><StarFill /></span>
                )}
                <DatasetOptionsDropdown
                    dataset={dataset}
                    isBookmarkedState={isBookmarkedState}
                    setIsBookmarkedState={setIsBookmarkedState}
                />

            </div>

        </div>
    )
}

export default ResultItem;
