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
                    <Nav.Link as={NavLink} to="/about" className="me-4">
                        {t('header.about')}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/privacy-policy" className="me-4">
                        {t('header.privacyPolicy')}
                    </Nav.Link>
                    <Nav.Link>
                        <a className="txt-primary" href="https://app-daseen-redesign.netlify.app/">
                            {t('header.visit')} daseen.netlify.app
                        </a>
                    </Nav.Link>
                    <LanguageSelector />

                </Nav>
                <Nav className="ms-auto">
                    <div className="ps-2">
                        <a href="https://app-daseen-redesign.netlify.app/register" className="btn btn-primary">{t('auth.signUp')}</a>
                    </div>
                    <div className="ps-2">
                        <a href="https://app-daseen-redesign.netlify.app/" className="btn fw-500 btn-outline-primary">
                            {t('home.openDaseen')}
                        </a>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
