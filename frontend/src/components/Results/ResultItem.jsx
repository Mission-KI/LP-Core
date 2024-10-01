import React from 'react'
import { Link } from "react-router-dom";
import styles from './Results.module.css'

function ResultItem({ dataset }) {
    return (
        <div className={styles.resultItem}>
            <Link to={`/details/${dataset._id}`} className={styles.title}>{dataset._source.name}</Link>
            <p className='medium pt-3'>{dataset._source.description}</p>

            <div className='d-flex justify-content-between mt-4 flex-wrap'>
                <a href={dataset._source?.dataSpace?.url} target='_blank' className='medium text-muted text-decoration-underline me-2'>{dataset._source?.dataSpace?.name}</a>
                <span className='medium text-muted text-decoration-underline me-2'>serie-a-logistic solutions</span>
                <span className='medium text-muted me-2'>Files (CSV)</span>
                <span className='medium text-muted me-2'>2,5 MB</span>
                <span className='medium text-muted me-2'>License other-commercial</span>
                <span className='medium text-muted me-2'>Version 1.0</span>
                <span className='medium text-muted me-2'>two years ago</span>
            </div>
        </div>
    )
}

export default ResultItem;
