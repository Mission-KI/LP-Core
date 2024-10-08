import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBookmark, removeBookmark, isBookmarked } from '../../../common/utils/bookmarks';

function DatasetOptionsDropdown({ dataset }) {
    const [isBookmarkedState, setIsBookmarkedState] = useState(false);

    useEffect(() => {
        if (dataset?._id) {
            setIsBookmarkedState(isBookmarked(dataset._id));
        }
    }, [dataset]);

    const handleAddBookmark = () => {
        addBookmark(dataset._id);
        setIsBookmarkedState(true);
    };

    const handleRemoveBookmark = () => {
        removeBookmark(dataset._id);
        setIsBookmarkedState(false);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="btn hover-lg rounded-circle px-2 py-1 m-0 pointer">
                <ThreeDots />
            </Dropdown.Toggle>

            <Dropdown.Menu className='border-0 shadow'>
                <Dropdown.Item>
                    Get Dataset
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
