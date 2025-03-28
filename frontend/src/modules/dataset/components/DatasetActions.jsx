import React, { useEffect, useState } from "react";
import { Download, Link45deg, Star, StarFill } from 'react-bootstrap-icons'
import { addBookmark, isBookmarked, removeBookmark } from "../../common/utils/bookmarks";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { notifyEdpDownloadEvent } from "../api/dataset";
import { apiUrl, imageBasePath } from "../../common/api/config";

const DatasetActions = ({ datasetDetails }) => {

    const [bookmarked, setBookmarked] = useState(false);
    const { t } = useTranslation();
    const location = useLocation();

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

    const handleDownload = async (url) => {
        if (!url) return;
        window.open(url, '_blank');
        await notifyEdpDownloadEvent();
    };

    const isHomePage = location.pathname === '/';
    const reportDownloadUrl = imageBasePath + datasetDetails?._id + '/report.pdf';

    return (
        <div className='d-flex'>
            <div className="d-sm-flex d-none w-100">
                {isHomePage && (
                    <div className='pe-2 pt-1'>
                        <Link
                            to={`/details/${datasetDetails._id}`}
                            className='btn-hover px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'
                        >
                            <Link45deg className='me-1' /> {t('dataset.details')}
                        </Link>
                    </div>
                )}
                <form method="GET" action={apiUrl + '/connector/edp/schema/'} className='pe-2 pt-1'>
                    <button type="submit" className='btn btn-hover px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                        <Download className='me-1' /> {t('header.schemaJson')}
                    </button>
                </form>
                <div className='pe-2 pt-1'>
                    <a href={reportDownloadUrl} className='btn-hover px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                        <Download className='me-1' /> {t('header.reportPdf')}
                    </a>
                </div>
                <div className='pe-2 pt-1'>
                    <button
                        className='btn btn-hover px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'
                        onClick={() => handleDownload(datasetDetails?._source?.url)}
                    >
                        <Download className='me-1' /> {t('header.getDataset')}
                    </button>
                </div>
                {!bookmarked ? (
                    <div className='pe-2 pt-1'>
                        <span
                            onClick={() => handleAddBookmark(datasetDetails?._id)}
                            data-test-id="bookmark-button"
                            className='btn-hover px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                            {t('header.bookmark')} <Star className='txt-white ms-2' />
                        </span>
                    </div>

                ) : (
                    <div className='pe-2 pt-1'>
                        <span onClick={() => handleRemoveBookmark(datasetDetails?._id)} className='btn-hover px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                            <StarFill className='me-1' />
                            {t('header.removeBookmark')}
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
}

export default DatasetActions;
