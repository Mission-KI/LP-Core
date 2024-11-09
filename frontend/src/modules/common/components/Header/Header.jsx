import React, { useEffect, useLayoutEffect, useState } from 'react'
import SearchBar from '../Search/SearchBar'
import { ChevronLeft, Download, Star, StarFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { addBookmark, isBookmarked, removeBookmark } from '../../utils/bookmarks'
import { useTranslation } from 'react-i18next';

function Header({ datasetDetails }) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [bookmarked, setBookmarked] = useState(false);

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    useEffect(() => {
        setBookmarked(isBookmarked(datasetDetails?._id))
    }, [datasetDetails]);

    const handleAddBookmark = (id) => {
        addBookmark(id);
        setBookmarked(true);
    }

    const handleRemoveBookmark = (id) => {
        removeBookmark(id);
        setBookmarked(false);
    }

    return (
        <div id={styles.header}>
            <div className="container d-flex px-3">
                <div className='d-flex flex-wrap align-items-center'>
                    <Link to="/">
                        <h4 style={{ fontWeight: 400 }}>{t('header.title')}</h4>
                    </Link>
                </div>
                <div className='w-100'>
                    <div>
                        <SearchBar />
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                        <div className='d-sm-flex d-none pt-3 flex-wrap'>
                            <div className='pe-2 pt-1'>
                                <button
                                    className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'
                                    onClick={() => navigate(-1)}
                                >
                                    <ChevronLeft />
                                    <span className='ps-2'>{t('header.back')}</span>
                                </button>
                            </div>
                        </div>
                        <div className="d-sm-flex d-none w-100 align-items-center pt-3 flex-wrap justify-content-end">
                            <div className='pe-2 pt-1'>
                                <button className='btn btn-primary rounded-lg py-1 small'>{t('header.findSimilar')}</button>
                            </div>
                            <div className='pe-2 pt-1'>
                                <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                    <Download className='me-1' /> {t('header.schemaJson')}
                                </button>
                            </div>
                            <div className='pe-2 pt-1'>
                                <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                    <Download className='me-1' /> {t('header.reportPdf')}
                                </button>
                            </div>
                            <div className='pe-2 pt-1'>
                                <a href={datasetDetails?._source?.url} target='_blank' className='btn text-white btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                    <Download className='me-1' /> {t('header.getDataset')}
                                </a>
                            </div>
                            {!bookmarked ? (

                                <div className='pe-2 pt-1'>
                                    <button onClick={() => handleAddBookmark(datasetDetails?._id)} className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                        {t('header.bookmark')} <Star className='txt-white ms-2' />
                                    </button>
                                </div>

                            ) : (
                                <div className='pe-2 pt-1'>
                                    <button onClick={() => handleRemoveBookmark(datasetDetails?._id)} className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                                        <StarFill className='me-1' />
                                        {t('header.removeBookmark')}
                                    </button>
                                </div>
                            )}


                            <div className='pe-2 pt-1'>
                                <Link to="/bookmarks" className='btn rounded-lg py-1 small d-flex align-items-center'>
                                    {t('header.bookmarks')}
                                    {bookmarks?.length ? (
                                        <StarFill className='ms-2' />
                                    ) : (
                                        <Star className='ms-2' />
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header
