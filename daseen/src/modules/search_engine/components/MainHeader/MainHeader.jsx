import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import styles from './MainHeader.module.css'
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const MainHeader = () => {

    const location = useLocation();
    const { t } = useTranslation();

    return (
        <Navbar bg="white" data-bs-theme="light" fixed={location.pathname !== '/' ? 'top' : undefined}
            className={`py-3 shadow-sm`}>
            <Container>
                <Nav className="me-auto">
                    <a href="https://daseen-redesign.netlify.app/" className="d-none d-md-block nav-link me-4" style={{ whiteSpace: 'nowrap' }}>
                        Landing page
                    </a>
                    <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/" className="d-none d-md-block">
                        {t('page.title')}
                    </Nav.Link>
                    <LanguageSelector />
                </Nav>
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
