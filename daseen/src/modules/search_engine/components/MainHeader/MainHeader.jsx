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

const MainHeader = () => {

    const location = useLocation();
    const { t, i18n } = useTranslation();

    var landingRedirectUrl;
    if (i18n.language == 'en' || i18n.language == 'English') {
        landingRedirectUrl = landingUrl + '/en'
    } else if (i18n.language == 'de' || i18n.language == 'German') {
        landingRedirectUrl = landingUrl + '/de'
    } else {
        landingRedirectUrl = landingUrl + '/en'
    }

    return (
        <Navbar bg="white" data-bs-theme="light" fixed={location.pathname !== '/' ? 'top' : undefined} expand="md" className="py-3 shadow-sm">
            <Container className='d-flex' style={{ whiteSpace: 'nowrap', flexWrap: 'nowrap' }}>
                <Navbar.Toggle aria-controls="main-header" className='border-0 text-dark'><List /></Navbar.Toggle>
                <Navbar.Collapse id="main-header" className='mb-3 mb-md-0'>
                    <Nav className="me-auto">
                        <a href={landingRedirectUrl} className="nav-link me-4" style={{ whiteSpace: 'nowrap' }}>
                            Landing page
                        </a>
                        <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/" className="">
                            {t('header.search')}
                        </Nav.Link>
                        <LanguageSelector />
                    </Nav>
                </Navbar.Collapse>

                <div className='px-4 w-100'>
                    <MainSearchBar />
                </div>
                <Nav className="ms-auto">
                    <div className="">
                        <a href="https://beebucket.ai/kontakt/" className="btn text-white btn-primary">{t('auth.register')}</a>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default MainHeader;
