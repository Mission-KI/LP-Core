import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import LanguageSelector from '../../../common/components/widgets/LanguageSelector';
import { useTranslation } from "react-i18next";

const HomeHeader = () => {

    const { t } = useTranslation();

    return (
        <Navbar bg="white" data-bs-theme="light" className="py-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className="me-4">
                        {t('header.home')}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/support" className="me-1 d-none d-md-block">
                        {t('header.support')}
                    </Nav.Link>
                    <LanguageSelector />
                    <Nav.Link className='d-flex align-items-center ms-2'>
                        <span className="badge badge-primary bgc-primary">Alpha</span>
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <div className="ps-2">
                        <Link to="/register" className="btn text-white btn-primary">{t('auth.signUp')}</Link>
                    </div>
                    <div className="ps-2">
                        <Link to="/login" className="btn btn-outline-primary">
                            {t('auth.logIn')}
                        </Link>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default HomeHeader;
