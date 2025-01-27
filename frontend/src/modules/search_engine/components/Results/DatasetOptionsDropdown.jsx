import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Download, Star, StarFill, ThreeDots, ThreeDotsVertical } from 'react-bootstrap-icons';
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
        <Dropdown className='mt-1'>
            <Dropdown.Toggle as="div" className="hover-lg rounded px-1 py-0 m-0 pointer">
                <ThreeDotsVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu className='border-0 shadow bgc-body'>
                <Dropdown.Item className='d-flex align-items-center' href={dataset?._source?.url} target='_blank'>
                    <Download className='me-2' /> {t('dataset.getDataset')}
                </Dropdown.Item>
                {isBookmarked(dataset._id) ? (
                    <Dropdown.Item className='d-flex align-items-center' onClick={handleRemoveBookmark}>
                        <StarFill className='me-2' />
                        {t('bookmarks.removeBookmark')}
                    </Dropdown.Item>
                ) : (
                    <Dropdown.Item className='d-flex align-items-center' onClick={handleAddBookmark}>
                        <Star className='me-2' />
                        {t('bookmarks.bookmark')}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DatasetOptionsDropdown;
