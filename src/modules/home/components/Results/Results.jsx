import React, { useEffect, useState } from 'react'
import { Star } from 'react-bootstrap-icons'
import ResultItem from './ResultItem'
import Paginator from '../../../common/components/widgets/Paginator'
import { Spinner } from 'react-bootstrap';

function Results({ datasets, loading }) {

    const totalDatasetCount = datasets.hits?.total?.value;

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: 450 }}>
                <Spinner variant='primary' />
            </div>
        );
    }


    return (
        <div className='mt-5 pt-3'>
            <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                <span className='bold'>{totalDatasetCount} Datasets</span>
                <div>
                    <span className='d-flex align-items-center fw-500'>
                        Bookmarks
                        <Star className='ms-2' />
                    </span>
                </div>
            </div>

            {datasets?.hits?.hits?.map((dataset) =>
                <ResultItem dataset={dataset} key={dataset._id} />
            )}

        </div>
    )
}

export default Results
