import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';

const Header = () => {

    const { t } = useTranslation();

    return (
        <Navbar bg="white" data-bs-theme="light" fixed="top" className="py-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className="me-4">
                        {t('header.home')}
                    </Nav.Link>
                    <LanguageSelector />

                </Nav>
                <Nav className="ms-auto">
                    <div className="ps-2">
                        <a href="https://app-daseen-redesign.netlify.app/register" className="btn btn-primary fw-500">{t('auth.register')}</a>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
