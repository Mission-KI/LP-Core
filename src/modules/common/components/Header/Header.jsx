import React from 'react'
import SearchBar from '../Search/SearchBar'
import { ChevronLeft, Download, Star, StarFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { addBookmark, removeBookmark } from '../../utils/bookmarks'

function Header({ datasetDetails }) {

    const navigate = useNavigate();

    return (
        <div id={styles.header}>
            <div className='d-flex flex-wrap align-items-center pe-4'>
                <Link to="/">
                    <h4 style={{ fontWeight: 400 }}>Data <br /> Search <br /> Engine</h4>
                </Link>
            </div>
            <div className='w-100'>
                <div style={{ maxWidth: 700 }}>
                    <SearchBar />
                </div>
                <div className='d-flex justify-content-between w-100'>
                    <div className='d-sm-flex d-none align-items-center pt-3 flex-wrap'>
                        <div className='pe-2 pt-1'>
                            <button
                                className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'
                                onClick={() => navigate(-1)}
                            >
                                <ChevronLeft />
                                <span className='ps-2'>Back</span>
                            </button>
                        </div>
                    </div>
                    <div className="d-sm-flex d-none w-100 align-items-center pt-3 flex-wrap justify-content-end">
                        <div className='pe-2 pt-1'>
                            <button className='btn btn-primary rounded-lg py-1 small'>Find similar EDP</button>
                        </div>
                        <div className='pe-2 pt-1'>
                            <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                <Download className='me-1' /> Schema (JSON)
                            </button>
                        </div>
                        <div className='pe-2 pt-1'>
                            <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                <Download className='me-1' /> Report (pdf)
                            </button>
                        </div>
                        <div className='pe-2 pt-1'>
                            <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                <Download className='me-1' /> Get Dataset
                            </button>
                        </div>
                        <div className='pe-2 pt-1'>
                            <button onClick={() => removeBookmark(datasetDetails?._id)} className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                <Star className='me-1' />
                                Remove Bookmark
                            </button>
                        </div>
                        <div className='pe-2 pt-1'>
                            <button onClick={() => addBookmark(datasetDetails?._id)} className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                Bookmark <StarFill className='txt-white ms-2' />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header
