import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThreeDots, ThreeDotsVertical } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBookmark, removeBookmark, isBookmarked } from '../../../common/utils/bookmarks';
import { t } from 'i18next';

function DatasetOptionsDropdown({ dataset }) {


    const handleAddBookmark = () => {
        addBookmark(dataset._id);
        window.location.reload();
    };

    const handleRemoveBookmark = () => {
        removeBookmark(dataset._id);
        window.location.reload();
    };

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="btn hover-lg bg-light rounded-circle px-2 py-1 m-0 pointer">
                <ThreeDotsVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu className='border-0 shadow'>
                <Dropdown.Item href={dataset?._source?.url} target='_blank'>
                    {t('dataset.getDataset')}
                    <span className='small text-muted w-100 d-flex'>via dataspace</span>
                </Dropdown.Item>
                {isBookmarked(dataset._id) ? (
                    <Dropdown.Item onClick={handleRemoveBookmark}>{t('bookmarks.removeBookmark')}</Dropdown.Item>
                ) : (
                    <Dropdown.Item onClick={handleAddBookmark}>{t('bookmarks.bookmark')}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DatasetOptionsDropdown;
