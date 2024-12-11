import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';
import { appUrl } from '../../api/config';

const Header = () => {

    const { t } = useTranslation();

    return (
        <Navbar bg="white" data-bs-theme="light" fixed="top" className="py-3">
            <Container>
                <Nav className="me-auto">
                    <a href="/" className="nav-link d-none d-md-block me-4">
                        Landing page
                    </a>
                    <a style={{ whiteSpace: 'nowrap' }} href={appUrl} className="nav-link me-2">
                        {t('header.search')}
                    </a>
                    <LanguageSelector />
                    <div className='d-flex align-items-center ms-3'>
                        <span className="badge badge-primary bg-danger" style={{ fontSize: '10pt' }}>Alpha</span>
                    </div>

                </Nav>
                <Nav className="ms-auto">
                    <div className="ps-2">
                        <a href="https://beebucket.ai/kontakt/" className="btn btn-primary fw-500">{t('auth.register')}</a>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
