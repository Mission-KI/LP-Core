import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import styles from './MainHeader.module.css'
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { landingUrl } from '../../../common/api/config';
import { List } from 'react-bootstrap-icons';
import { getBookmarks } from '../../../common/utils/bookmarks';
import { Question, Star, StarFill, Sliders2 } from 'react-bootstrap-icons';
import { useState } from 'react';
import PreferencesModal from '../../../common/components/PreferencesModal/PreferencesModal';

const MainHeader = () => {

    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [showPreferencesModal, setShowPreferencesModal] = useState(false);

    var landingRedirectUrl;
    if (i18n.language == 'en' || i18n.language == 'English') {
        landingRedirectUrl = landingUrl + '/en'
    } else if (i18n.language == 'de' || i18n.language == 'German') {
        landingRedirectUrl = landingUrl + '/de'
    } else {
        landingRedirectUrl = landingUrl + '/en'
    }

    return (
        <>
            <Navbar fixed={location.pathname !== '/' ? 'top' : undefined} expand="md" className="py-3" style={{ background: 'var(--header-color)', borderBottom: '1px solid var(--color-light-gray)' }}>
                <Container className='d-flex px-1' style={{ whiteSpace: 'nowrap', flexWrap: 'nowrap' }}>
                    <Navbar.Toggle aria-controls="main-header" className='border-0 ps-0 text-dark'><List /></Navbar.Toggle>
                    <Navbar.Collapse id="main-header" className='mb-3 mb-md-0'>
                        <Nav className="me-auto">
                            <a href={landingRedirectUrl} className="nav-link ps-0 me-4" style={{ whiteSpace: 'nowrap' }}>
                                Landing
                            </a>
                            <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/" className="">
                                {t('header.search')}
                            </Nav.Link>
                            <LanguageSelector />
                        </Nav>
                    </Navbar.Collapse>

                    <div className='px-md-3 w-100'>
                        <MainSearchBar />
                    </div>

                    <Nav className="ms-md-auto pe-4">
                        <div className='d-none d-md-block'>
                            <Link to="/help"
                                className="btn-hover px-1 h-100 d-flex align-items-center"
                            >
                                <Question className='h3 m-0' />
                            </Link>
                        </div>
                        <div className='pe-1 d-none d-md-block'>
                            <span onClick={() => setShowPreferencesModal(true)}
                                className="btn-hover px-1 h-100 d-flex align-items-center pointer"
                            >
                                <Sliders2 className='h5 m-0' />
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
                    </Nav>

                    <Nav className="ms-md-auto">
                        <div className="ps-2 ps-md-0">
                            <a href="https://beebucket.ai/kontakt/" className="btn fw-500 rounded-lg medium py-2 px-3 btn-contrast">{t('auth.register')}</a>
                        </div>
                    </Nav>
                </Container>
            </Navbar>

            <PreferencesModal
                showPreferencesModal={showPreferencesModal}
                setShowPreferencesModal={setShowPreferencesModal}
            />

        </>

    );
};

export default MainHeader;
