import { useState } from "react";
import styles from "./Header.module.css";
import { Gear } from "react-bootstrap-icons";
import SettingsModal from "../../common/components/SettingsModal/SettingsModal";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import UserDropdown from "../../monitoring/components/UserDropdown";

function Header() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      <nav className={`container px-5 ${styles.navbar}`}>
        <div className="d-flex align-items-center">
          <Breadcrumbs />
        </div>
        <div className="ms-auto d-flex align-items-center pe-2">
          <div className="ps-4">
            <Gear
              onClick={() => {
                setShowSettingsModal(true);
              }}
              style={{ fontSize: 22 }}
              className="pointer txt-lighter"
            />
          </div>
          <div className="ps-4 position-relative">
            <UserDropdown />
          </div>
        </div>
      </nav>
      <SettingsModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
      />
    </>
  );
}

export default Header;
