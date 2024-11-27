import React, { useEffect, useState } from "react";
import { Download, Star, StarFill } from 'react-bootstrap-icons'
import { addBookmark, isBookmarked, removeBookmark } from "../../common/utils/bookmarks";
import { useTranslation } from "react-i18next";

const DatasetActions = ({ datasetDetails }) => {

    const [bookmarked, setBookmarked] = useState(false);
    const { t } = useTranslation();

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
        <div className='d-flex'>
            <div className="d-sm-flex d-none w-100">
                <div className='pe-2 pt-1'>
                    <span className='pe-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                        <Download className='me-1' /> {t('header.schemaJson')}
                    </span>
                </div>
                <div className='pe-2 pt-1'>
                    <span className='px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                        <Download className='me-1' /> {t('header.reportPdf')}
                    </span>
                </div>
                <div className='pe-2 pt-1'>
                    <a href={datasetDetails?._source?.url} target='_blank' className='px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                        <Download className='me-1' /> {t('header.getDataset')}
                    </a>
                </div>
                {!bookmarked ? (

                    <div className='pe-2 pt-1'>
                        <span onClick={() => handleAddBookmark(datasetDetails?._id)} className='px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
                            {t('header.bookmark')} <Star className='txt-white ms-2' />
                        </span>
                    </div>

                ) : (
                    <div className='pe-2 pt-1'>
                        <span onClick={() => handleRemoveBookmark(datasetDetails?._id)} className='px-2 py-2 txt-primary fw-500 pointer small d-flex align-items-center'>
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
