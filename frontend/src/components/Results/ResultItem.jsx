import React from 'react'
import { Link } from "react-router-dom";
import styles from './Results.module.css'

function ResultItem() {
    return (
        <div className={styles.resultItem}>

            <Link to="/details/Logistik" className='bold medium mb-3'>Logistik Transportaufträge</Link>
            <p className='small'>Ein multidimensionaler Datensatz bestehend aus 86 Attributen mit unterschiedlichen Datentypen und 8.424 Zeilen. In dem Datensatz sind Transportevents zwischen zwei geographischen Lokationen beschrieben inklusive Frachtrate, Tonnage, etc.</p>

            <div className='d-flex justify-content-between mt-4'>
                <span className='medium text-decoration-underline'>Dataroom MDS</span>
                <span className='medium text-decoration-underline'>serie-a-logistic solutions</span>
                <span className='medium'>Files (CVS)</span>
                <span className='medium'>78,2 MB</span>
                <span className='medium'>License other-commercial</span>
                <span className='medium'>Version 1.0</span>
                <span className='medium'>two years ago</span>
            </div>

        </div>
    )
}

export default ResultItem
