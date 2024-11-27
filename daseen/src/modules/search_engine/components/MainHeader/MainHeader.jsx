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
                    <Nav.Link as={NavLink} to="/" className="d-none d-md-block me-4">
                        {t('header.home')}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/support" className="me-1 d-none d-md-block">
                        {t('header.support')}
                    </Nav.Link>
                    <LanguageSelector />
                </Nav>
                <div className='px-4 w-100'>
                    <MainSearchBar />
                </div>
                <Nav className="ms-auto">
                    <div className="ps-2">
                        <Link to="/register" className="btn text-white btn-primary">{t('auth.signUp')}</Link>
                    </div>
                    <div className="ps-2 d-none d-md-block">
                        <Link to="/login" className="btn btn-outline-primary">
                            {t('auth.logIn')}
                        </Link>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default MainHeader;
