import React from 'react'
import { Star } from 'react-bootstrap-icons'
import ResultItem from './ResultItem'
import Paginator from '../widgets/Paginator'

function Results({ datasets }) {

    return (
        <div className='mt-5'>
            <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                <span className='bold'>{datasets?.hits?.hits?.length} Datasets</span>
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


            <Paginator />

        </div>
    )
}

export default Results
