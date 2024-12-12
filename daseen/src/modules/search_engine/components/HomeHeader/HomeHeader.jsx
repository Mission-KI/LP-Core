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
        <Navbar bg="white" data-bs-theme="light" className="py-3">
            <Container>
                <Nav className="me-auto">
                    <a href={landingRedirectUrl} className="nav-link me-4">
                        Landing page
                    </a>
                    <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/" className="d-none d-md-block">
                        {t('header.search')}
                    </Nav.Link>
                    <LanguageSelector />
                    <Nav.Link className='d-flex align-items-center ms-2'>
                        <span className="badge badge-primary bg-danger" style={{ fontSize: '10pt' }}>Alpha</span>
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <div className="ps-2">
                        <a href="https://beebucket.ai/kontakt/" className="btn text-white btn-primary">{t('auth.register')}</a>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default HomeHeader;
