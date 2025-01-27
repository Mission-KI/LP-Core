import React, { useState } from 'react';
import { Question, Gear, Star, StarFill } from 'react-bootstrap-icons';
import { getBookmarks } from '../../common/utils/bookmarks';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SettingsModal from '../../common/components/SettingsModal/SettingsModal'

const Toolbar = () => {

    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <>
            <div className='d-none d-md-block'>
                <Link to="/help"
                    className="btn-hover px-1 h-100 d-flex align-items-center"
                >
                    <Question className='h3 m-0' />
                </Link>
            </div>
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
