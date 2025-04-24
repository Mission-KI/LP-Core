import { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { InfoCircleFill } from "react-bootstrap-icons";
import styles from "./QuickView.module.css";
import DataScienceInfo from "../../../dataset/components/DataScienceInfo/DataScienceInfo";
import EDPActions from "../../../dataset/components/EDPActions";

function QuickView({ edp }) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const datasetRef = edp?._source?.datasetTree[0]?.dataset?.$ref;

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
        data-test-id="quick-view"
      >
        <div className="container">
          <div>
            <div className="pb-4">
              <EDPActions edp={edp} />
            </div>
            <DataScienceInfo edp={edp} datasetRef={datasetRef} />
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default QuickView;
