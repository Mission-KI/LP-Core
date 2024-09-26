import React from 'react'
import { Star } from 'react-bootstrap-icons'
import ResultItem from './ResultItem'

function Results() {
    return (
        <div className='mt-5'>
            <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                <span className='bold'>233.102 Datasets</span>
                <div>
                    <span className='d-flex align-items-center fw-500'>
                        Bookmarks
                        <Star className='ms-2' />
                    </span>
                </div>
            </div>

           <ResultItem />
           <ResultItem />
           <ResultItem />
           <ResultItem />

        </div>
    )
}

export default Results
