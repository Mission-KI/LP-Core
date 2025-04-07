import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { landingUrl } from '../../../common/api/config';
import Toolbar from '../Toolbar'
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import MobileHeaderDropdown from '../MainHeader/MobileHeaderDropdown';

const HomeHeader = () => {
    const { t, i18n } = useTranslation();
    const [showDropdown, setShowDropdown] = useState(false);

    var landingRedirectUrl;
    if (i18n.language === 'en' || i18n.language === 'English') {
        landingRedirectUrl = landingUrl + '/en';
    } else if (i18n.language === 'de' || i18n.language === 'German') {
        landingRedirectUrl = landingUrl + '/de';
    } else {
        landingRedirectUrl = landingUrl + '/en';
    }

    useEffect(() => {
        const handleScroll = () => {
            if (showDropdown) {
                setShowDropdown(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showDropdown]);

    return (
        <Navbar bg="white" data-bs-theme="light" className="bg-transparent py-3 m-auto" style={{ maxWidth: 1100 }}>
            <Container>
                <Button
                    id="custom-nav-toggle"
                    className="btn-basic me-2 txt-regular bgc-body border-0 d-md-none"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <List size={24} />
                </Button>
                <Nav className="me-auto">
                    <a href={landingRedirectUrl} className="nav-link d-none d-md-block me-4 ps-1">
                        Landing Page
                    </a>
                    <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/" className="d-none d-md-block me-4">
                        {t('header.search')}
                    </Nav.Link>
                    <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/help" className="d-none d-md-block">
                        {t('header.help')}
                    </Nav.Link>
                    <Nav.Link className='d-flex align-items-center d-none d-md-block ms-2'>
                        <span className="badge badge-primary bgc-danger" style={{ fontSize: '10pt' }}>Alpha</span>
                    </Nav.Link>
                </Nav>

                <Nav className="ms-auto">
                    <div className="pe-3 d-none d-md-flex">
                        <Toolbar />
                    </div>
                    <div className="ps-2">
                        <a href="https://beebucket.ai/kontakt/" className="btn fw-500 rounded-lg medium py-2 px-3 btn-basic shadow-sm">{t('auth.register')}</a>
                    </div>
                </Nav>
            </Container>
            {showDropdown && (
                <MobileHeaderDropdown
                    landingRedirectUrl={landingRedirectUrl}
                />
            )}
        </Navbar>
    );
};

export default HomeHeader;
