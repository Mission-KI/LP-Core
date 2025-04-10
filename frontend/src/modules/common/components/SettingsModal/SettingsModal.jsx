import React, { useState } from "react";
import {
  X,
  Palette,
  ExclamationCircle,
  Translate,
  Search,
} from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import LanguageSettings from "./LanguagePreferences";
import ThemeSettings from "./ThemePreferences";
import SearchPreferences from "./SearchPreferences";
import { useTranslation } from "react-i18next";

function SettingsModal({ showSettingsModal, setShowSettingsModal }) {
  const [selectedTab, setSelectedTab] = useState("search");
  const { t } = useTranslation();

  const handleClose = () => setShowSettingsModal(false);

  return (
    <Modal
      show={showSettingsModal}
      onHide={handleClose}
      size="lg"
      centered
      id="settingsModal"
    >
      <Modal.Body className="rounded py-0">
        <div className="d-flex">
          <div style={{ maxWidth: 200 }} className="w-100">
            <nav className="pe-3">
              <ul className="list-unstyled pb-3">
                <div className="sidebar-link-group">
                  <div className="pb-4 pt-3">
                    <span className="small bold text-secondary ps-2">
                      {t("settings.settings")}
                    </span>
                  </div>

                  <li
                    className={`nav-item px-2 rounded pointer my-1 ${selectedTab === "search" ? "active" : ""}`}
                    onClick={() => setSelectedTab("search")}
                  >
                    <a className="nav-link">
                      <Search />
                      <span className="ps-2 medium">{t("header.search")}</span>
                    </a>
                  </li>

                  <li
                    className={`nav-item px-2 rounded pointer my-1 ${selectedTab === "theme" ? "active" : ""}`}
                    onClick={() => setSelectedTab("theme")}
                  >
                    <a className="nav-link">
                      <Palette />
                      <span className="ps-2 medium">{t("settings.theme")}</span>
                    </a>
                  </li>

                  <li
                    className={`nav-item px-2 rounded pointer my-1 ${selectedTab === "language" ? "active" : ""}`}
                    onClick={() => setSelectedTab("language")}
                  >
                    <a className="nav-link">
                      <Translate />
                      <span className="ps-2 medium">
                        {t("settings.language")}
                      </span>
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>

          <button
            onClick={handleClose}
            className="btn btn-hover position-absolute p-1 mx-2 mt-2"
            style={{ right: 0, top: 0 }}
          >
            <X className="h2 mb-0 txt-lighter" />
          </button>

          <div className="w-100 pt-3 pb-5 px-5">
            {selectedTab === "search" && <SearchPreferences />}
            {selectedTab === "language" && <LanguageSettings />}
            {selectedTab === "theme" && <ThemeSettings />}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
