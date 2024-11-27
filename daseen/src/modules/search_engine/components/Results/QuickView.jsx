import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { InfoCircleFill, Download, StarFill, Star, } from "react-bootstrap-icons";
import styles from "./QuickView.module.css";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { addBookmark, isBookmarked, removeBookmark } from "../../../common/utils/bookmarks";
import DataScienceInfo from "../../../dataset/components/DataScienceInfo";
import DatasetActions from "../../../dataset/components/DatasetActions";

function QuickView({ dataset }) {
  const [show, setShow] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setBookmarked(isBookmarked(dataset?._id));
  }, [dataset]);

  const handleAddBookmark = (id) => {
    addBookmark(id);
    setBookmarked(true);
    window.location.reload();
  };

  const handleRemoveBookmark = (id) => {
    removeBookmark(id);
    setBookmarked(false);
    window.location.reload();
  };

  return (
    <Dropdown ref={dropdownRef} show={show}>
      <Dropdown.Toggle
        as="div"
        id="dropdown-quick-view"
        className="p-0 m-0 pointer border-0 d-flex align-items-center"
        data-test-id="quick-view-toggle-button"
        onClick={toggleDropdown}
      >
        <InfoCircleFill size={18} className="" />
      </Dropdown.Toggle>

      <Dropdown.Menu
        id={styles.QuickView}
        className={`fade border-0 shadow rounded-lg w-100 ${show ? "show" : ""}`}
      >
        <div className="container">
          <div>
            <p className={styles.title}>{dataset?._source?.name}</p>

            <DataScienceInfo datasetDetails={dataset} />

            <div className="d-flex justify--center mt-4">
              <DatasetActions datasetDetails={dataset} />
            </div>

          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default QuickView;
