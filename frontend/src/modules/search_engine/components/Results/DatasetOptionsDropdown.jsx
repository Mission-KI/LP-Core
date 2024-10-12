import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBookmark, removeBookmark, isBookmarked } from '../../../common/utils/bookmarks';
import { t } from 'i18next';

function DatasetOptionsDropdown({ dataset, isBookmarkedState, setIsBookmarkedState, bookmarks, setBookmarks }) {

    useEffect(() => {
        if (dataset?._id) {
            setIsBookmarkedState(isBookmarked(dataset._id));
        }
    }, [dataset]);

    const handleAddBookmark = () => {
        const updatedBookmarks = { ...bookmarks };
        updatedBookmarks.hits = updatedBookmarks.hits || { hits: [] };
        updatedBookmarks.hits.hits.push(dataset);

        setBookmarks(updatedBookmarks);
        setIsBookmarkedState(true);
        addBookmark(dataset._id);
    };

    const handleRemoveBookmark = () => {
        const updatedBookmarks = { ...bookmarks };
        updatedBookmarks.hits.hits = updatedBookmarks.hits.hits.filter(
            (item) => item._id !== dataset._id
        );

        setBookmarks(updatedBookmarks);
        setIsBookmarkedState(false);
        removeBookmark(dataset._id);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="btn hover-lg rounded-circle px-2 py-1 m-0 pointer">
                <ThreeDots />
            </Dropdown.Toggle>

            <Dropdown.Menu className='border-0 shadow'>
                <Dropdown.Item href={dataset?._source?.url} target='_blank'>
                    {t('dataset.getDataset')}
                    <span className='small text-muted w-100 d-flex'>via dataroom</span>
                </Dropdown.Item>
                {isBookmarkedState ? (
                    <Dropdown.Item onClick={handleRemoveBookmark}>Remove Bookmark</Dropdown.Item>
                ) : (
                    <Dropdown.Item onClick={handleAddBookmark}>Bookmark</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DatasetOptionsDropdown;
