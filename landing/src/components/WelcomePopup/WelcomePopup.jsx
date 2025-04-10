import { t } from "i18next";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 3300);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("hasVisited", "true");
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header className="border-0 px-4" closeButton>
        <Modal.Title>{t("welcome.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <p>{t("welcome.text")}</p>
      </Modal.Body>
    </Modal>
  );
};

export default WelcomePopup;
