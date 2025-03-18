import React, { useState } from 'react';
import { Gear, Star, StarFill } from 'react-bootstrap-icons';
import { getBookmarks } from '../../common/utils/bookmarks';
import { Link } from 'react-router-dom';
import SettingsModal from '../../common/components/SettingsModal/SettingsModal'

const Toolbar = () => {

    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <>
            <div className='pe-1 d-none d-md-block'>
                <span onClick={() => setShowSettingsModal(true)}
                    className="btn-hover px-1 h-100 d-flex align-items-center pointer"
                >
                    <Gear className='h5 m-0' />
                </span>
            </div>
            <div className='ps-1 d-none d-md-block'>
                <Link to="/bookmarks"
                    className="btn-hover px-1 h-100 d-flex align-items-center"
                >
                    {getBookmarks().length > 0 ? (
                        <StarFill className='h5 m-0' />
                    ) : (
                        <Star className='h5 m-0' />
                    )}
                </Link>
            </div>

            <SettingsModal
                showSettingsModal={showSettingsModal}
                setShowSettingsModal={setShowSettingsModal}
            />

        </>
    );
}

export default Toolbar;
