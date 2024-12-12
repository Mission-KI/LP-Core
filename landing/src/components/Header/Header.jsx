import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';
import { appUrl } from '../../api/config';
import { List, MenuButton } from 'react-bootstrap-icons';

const Header = () => {
    const { t, i18n } = useTranslation();

    var searchPageRedirectUrl;
    if (i18n.language === 'en' || i18n.language === 'English') {
        searchPageRedirectUrl = appUrl + '/en';
    } else if (i18n.language === 'de' || i18n.language === 'German') {
        searchPageRedirectUrl = appUrl + '/de';
    } else {
        searchPageRedirectUrl = appUrl + '/en';
    }

    return (
        <Navbar bg="white" data-bs-theme="light" fixed="top" expand="md" className="py-3">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 text-dark'><List /></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className='mb-3 mb-md-0'>
                    <Nav className="me-auto">
                        <a href="/" className="nav-link me-4">
                            Landing page
                        </a>
                        <a style={{ whiteSpace: 'nowrap' }} href={searchPageRedirectUrl} className="nav-link me-4 pe-3">
                            {t('header.search')}
                        </a>
                        <div className='me-4'>
                            <LanguageSelector />
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="badge badge-primary bg-danger" style={{ fontSize: '10pt' }}>
                                Alpha
                            </span>
                        </div>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="ms-md-auto">
                    <div>
                        <a href="https://beebucket.ai/kontakt/" className="btn btn-primary fw-500">
                            {t('auth.register')}
                        </a>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
