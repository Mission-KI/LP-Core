import React, { useState } from 'react';
import { Gear, Palette, ExclamationCircle, Translate, Search } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import LanguageSettings from './LanguagePreferences';
import ThemeSettings from './ThemePreferences';
import SearchPreferences from './SearchPreferences';

function PreferencesModal({ showPreferencesModal, setShowPreferencesModal }) {
    const [selectedTab, setSelectedTab] = useState('search');

    const handleClose = () => setShowPreferencesModal(false);

    return (
        <Modal show={showPreferencesModal} onHide={handleClose} size="lg" centered id="preferencesModal">
            <Modal.Body className='rounded py-0'>
                <div className="d-flex">
                    <div style={{ maxWidth: 200 }} className='w-100'>
                        <nav className="pe-3">
                            <ul className="list-unstyled pb-3">
                                <div className='sidebar-link-group'>
                                    <div className='pb-4 pt-3'>
                                        <span className='small bold text-secondary ps-2'>PREFERENCES</span>
                                    </div>

                                    <li
                                        className={`nav-item px-2 rounded pointer my-1 ${selectedTab === 'search' ? 'active' : ''}`}
                                        onClick={() => setSelectedTab('search')}
                                    >
                                        <a className='nav-link'>
                                            <Search />
                                            <span className='ps-2 medium'>Search</span>
                                        </a>
                                    </li>


                                    <li
                                        className={`nav-item px-2 rounded pointer my-1 ${selectedTab === 'theme' ? 'active' : ''}`}
                                        onClick={() => setSelectedTab('theme')}
                                    >
                                        <a className='nav-link'>
                                            <Palette />
                                            <span className='ps-2 medium'>Theme</span>
                                        </a>
                                    </li>

                                    <li
                                        className={`nav-item px-2 rounded pointer my-1 ${selectedTab === 'language' ? 'active' : ''}`}
                                        onClick={() => setSelectedTab('language')}
                                    >
                                        <a className='nav-link'>
                                            <Translate />
                                            <span className='ps-2 medium'>Language</span>
                                        </a>
                                    </li>

                                </div>
                            </ul>
                        </nav>
                    </div>

                    <div className="w-100 pt-3 pb-5 px-5">

                        {selectedTab === 'search' && (
                            <SearchPreferences />
                        )}
                        {selectedTab === 'language' && (
                            <LanguageSettings />
                        )}
                        {selectedTab === 'theme' && (
                            <ThemeSettings />
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default PreferencesModal;
