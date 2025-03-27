import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from 'react-router-dom';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import { useTranslation } from "react-i18next";
import { landingUrl } from '../../../common/api/config';
import { List } from 'react-bootstrap-icons';
import Toolbar from '../Toolbar'
import { Button } from 'react-bootstrap';
import MobileHeaderDropdown from './MobileHeaderDropdown';

const MainHeader = () => {

    const location = useLocation();
    const { t, i18n } = useTranslation();

    var landingRedirectUrl;
    if (i18n.language == 'en' || i18n.language == 'English') {
        landingRedirectUrl = landingUrl + '/en'
    } else if (i18n.language == 'de' || i18n.language == 'German') {
        landingRedirectUrl = landingUrl + '/de'
    } else {
        landingRedirectUrl = landingUrl + '/en'
    }

    const [showDropdown, setShowDropdown] = useState(false);


    return (
        <Navbar
            fixed={location.pathname !== "/" ? "top" : undefined}
            expand="md"
            className="py-3"
            style={{
                background: "var(--header-color)",
                borderBottom: ".5px solid var(--color-light-gray)"
            }}
        >
            <Container className="d-flex px-3" style={{ whiteSpace: "nowrap", flexWrap: "nowrap" }}>
                <Button
                    id="custom-nav-toggle"
                    className="btn-basic mx-2 txt-regular bgc-body border-0 d-md-none"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <List size={24} />
                </Button>

                <div className="d-none d-md-block">
                    <Nav className="me-auto">
                        <a href={landingRedirectUrl}
                            className="nav-link ps-0 me-4"
                            style={{ whiteSpace: "nowrap" }}>
                            Landing Page
                        </a>
                        <Nav.Link
                            style={{ whiteSpace: "nowrap" }}
                            as={NavLink} to="/"
                            className="me-4">
                            {t("header.search")}
                        </Nav.Link>
                        <Nav.Link style={{ whiteSpace: 'nowrap' }} as={NavLink} to="/help" className="d-none d-md-block">
                            {t('header.help')}
                        </Nav.Link>
                    </Nav>
                </div>

                <div className="px-md-3 w-100">
                    <MainSearchBar />
                </div>

                <Nav className="ms-md-auto pe-4">
                    <Toolbar />
                </Nav>

                <Nav className="ms-md-auto d-none d-md-block">
                    <div className="ps-2 ps-md-0">
                        <a
                            href="https://beebucket.ai/kontakt/"
                            className="btn fw-500 rounded-lg medium py-2 px-3 btn-contrast">
                            {t("auth.register")}
                        </a>
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

export default MainHeader;
