import React, { useEffect, useState } from 'react'
import { Star, StarFill } from 'react-bootstrap-icons'
import ResultItem from './ResultItem'
import { Spinner } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Results({ datasets, loading, bookmarks, setBookmarks }) {

    const totalDatasetCount = datasets.hits?.total?.value;

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: 450 }}>
                <Spinner variant='primary' />
            </div>
        );
    }


    return (
        <div className='mt-5 pt-5'>

            <div className="w-100 mb-2">
                <span className='bold d-flex' style={{ whiteSpace: 'nowrap' }}>{totalDatasetCount} Datasets</span>
                <div>
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="d-flex justify-content-end border-0 w-100 mb-3"
                    >
                        <Tab eventKey="home" title="All">
                            <div className='d-block'>
                                {datasets?.hits?.hits?.map((dataset) =>
                                    <ResultItem dataset={dataset} key={dataset._id} bookmarks={bookmarks} setBookmarks={setBookmarks} />
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="bookmarks" title={
                            <div>
                                <span className='d-flex align-items-center fw-500'>
                                    Bookmarks
                                    {bookmarks?.hits?.hits?.length != 0 ? (
                                        <StarFill className='ms-2' />)
                                        : <Star className='ms-2' />
                                    }
                                </span>
                            </div>
                        }>
                            <div className='d-block'>
                                {bookmarks?.hits?.hits?.map((dataset) =>
                                    <ResultItem dataset={dataset} key={dataset._id} bookmarks={bookmarks} setBookmarks={setBookmarks} />
                                )}
                            </div>
                        </Tab>

                    </Tabs >
                </div>

            </div>


        </div >
    )
}

export default Results
