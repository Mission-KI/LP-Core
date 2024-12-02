import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import { useTranslation } from "react-i18next";
import { landingUrl } from '../../../common/api/config';

const HomeHeader = () => {

    const { t } = useTranslation();

    return (
        <Navbar bg="white" data-bs-theme="light" className="py-3">
            <Container>
                <Nav className="me-auto">
                    <a href={landingUrl} className="nav-link me-4">
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
