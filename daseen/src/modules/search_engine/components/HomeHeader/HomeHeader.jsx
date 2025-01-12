import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import { useTranslation } from "react-i18next";
import { landingUrl } from '../../../common/api/config';

const HomeHeader = () => {

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
        <Navbar bg="white" data-bs-theme="light" className="bg-transparent py-3 m-auto" style={{ maxWidth: 1100 }}>
            <Container>
                <Nav>
                    <a className='d-flex align-items-center d-block d-md-none'>
                        <span className="badge badge-primary bgc-danger" style={{ fontSize: '9pt' }}>Alpha</span>
                    </a>
                </Nav>
                <Nav className="me-auto">
                    <a href={landingRedirectUrl} className="nav-link d-none d-md-block me-4 ps-1">
                        Landing
                    </a>
                    <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/" className="d-none d-md-block me-4">
                        {t('header.search')}
                    </Nav.Link>
                    <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/help" className="d-none d-md-block">
                        Help
                    </Nav.Link>
                    <div className='d-none d-md-block'>
                        <LanguageSelector />
                    </div>
                    <Nav.Link className='d-flex align-items-center d-none d-md-block ms-2'>
                        <span className="badge badge-primary bgc-danger" style={{ fontSize: '9pt' }}>Alpha</span>
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <div className="ps-2">
                        <a href="https://beebucket.ai/kontakt/" className="btn fw-500 rounded-lg medium py-2 px-3 btn-contrast">{t('auth.register')}</a>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default HomeHeader;