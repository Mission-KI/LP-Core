import React from 'react'
import { Link } from "react-router-dom";
import styles from './Results.module.css'

function ResultItem() {
    return (
        <div className={styles.resultItem}>

            <Link to="/details/Logistik" className={styles.title}>Logistik Transportaufträge</Link>
            <p className='medium pt-3'>Ein multidimensionaler Datensatz bestehend aus 86 Attributen mit unterschiedlichen Datentypen und 8.424 Zeilen. In dem Datensatz sind Transportevents zwischen zwei geographischen Lokationen beschrieben inklusive Frachtrate, Tonnage, etc.</p>

            <div className='d-flex justify-content-between mt-4 flex-wrap'>
                <span className='medium text-muted text-decoration-underline me-2'>Dataroom MDS</span>
                <span className='medium text-muted text-decoration-underline me-2'>serie-a-logistic solutions</span>
                <span className='medium text-muted me-2'>Files (CVS)</span>
                <span className='medium text-muted me-2'>78,2 MB</span>
                <span className='medium text-muted me-2'>License other-commercial</span>
                <span className='medium text-muted me-2'>Version 1.0</span>
                <span className='medium text-muted me-2'>two years ago</span>
            </div>

        </div>
    )
}

export default ResultItem
