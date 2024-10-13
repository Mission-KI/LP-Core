import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { InfoCircleFill, Download, StarFill } from "react-bootstrap-icons";
import styles from "./Dropdown.module.css";
import {
  calculateTemporalConsistency,
  calculateTemporalCover,
} from "../../../common/utils/dataset_utils";
import { filesize } from "filesize";
import { t } from "i18next";

function DatasetOverviewPopup({ dataset }) {
  const [show, setShow] = useState(false);
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

  return (
    <Dropdown ref={dropdownRef} show={show}>
      <Dropdown.Toggle
        as="div"
        id="dropdown-basic"
        className="p-0 m-0 pointer border-0 d-flex align-items-center"
        onClick={toggleDropdown}
      >
        <InfoCircleFill size={18} className="txt-primary" />
      </Dropdown.Toggle>

      <Dropdown.Menu className={`fade border-0 shadow rounded-lg ${show ? "show" : ""}`} style={{ width: 650 }}>
        <div className="container">
          <div>
            <p className={styles.dataTitle}>
              {dataset?._source?.name}
            </p>
            <div className={styles.tags}>
              <span className="text-muted medium">
                TAGS
              </span>
              <div className={styles.tagList}>
                {dataset?.dataset?._source?.tags?.map((tag) => (
                  <button
                    className="btn btn-basic border small rounded-lg me-3"
                    key={tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <p className="medium bold mt-3 txt-primary">
              {t('dataset.dataScienceInfo')}
            </p>
            <hr />
            <div
              className="row"
            >
              <div
                className="col-md-5"
              >
                <div className="w-100">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">STRUCTURE</p>
                    <p className="small">Text (CSV)</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">VOLUME</p>
                    <p className="small">{filesize(dataset?._source?.volume)}</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">COMPRESSION</p>
                    <p className="small">
                      {dataset?.dataset?._source?.compression ?? "None"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">TRANSFER TYPE</p>
                    <p className="small">
                      {dataset?.dataset?._source?.transferTypeFlag ?? "None"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">IMMUTABILITY</p>
                    <p className="small">
                      {dataset?.dataset_source?.immutabilityFlag ?? "None"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">GROWTH</p>
                    <p className="small">
                      {dataset?.dataset?._source?.growthFlag ?? "None"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">GROWTH RATE</p>
                    <p className="small">unknown</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">TEMPORAL COVER</p>
                    <p className="small">
                      {calculateTemporalCover(dataset?.dataset?.datasets)}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">TEMPORAL CONSISTENCY</p>
                    <p className="small">
                      {calculateTemporalConsistency(
                        dataset?.dataset?.datasets
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-7"
              >
                <div className="w-100">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">{t('dataset.noOfColumns')}</p>
                    <p className="small">
                      {dataset?.dataset?._source?.datasets &&
                        dataset?.dataset?._source?.datasets?.length > 0
                        ? dataset?.dataset?._source.datasets[0].columns
                          .length
                        : "No row count available"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">NUMBER OF LINES</p>
                    <p className="small">
                      {dataset?.dataset?._source?.datasets &&
                        dataset?.dataset?._source?.datasets?.length > 0
                        ? dataset?.dataset?._source.datasets[0].rowCount
                        : "No row count available"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">DATA TYPES</p>
                    <p className="small">
                      time, string, numeric
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      ATTRIBUTE CONSISTENCY
                    </p>
                    <p className="small">
                      partially inconsistent
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">LANGUAGES</p>
                    <p className="small">german, english</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      NUMERIC VALUE DISTRIBUTION
                    </p>
                    <p className="small">heterogen</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      STRING VALUE DISTRIBUTION
                    </p>
                    <p className="small">heterogen</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      NUMERIC CORRELATION ANALYSIS
                    </p>
                    <p className="small">partial correlation</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      NUMERIC ANOMALY ANALYSIS
                    </p>
                    <p className="small">anomaly exists</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      NUMERIC ANOMALY ANALYSIS
                    </p>
                    <p className="small">seasonal, no trend</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex w-100 align-items-center pt-3 flex-wrap justify-content-end">
              <div className='pe-2 pt-1'>
                <button className='btn btn-primary rounded-lg py-1 small'>{t('header.findSimilar')}</button>
              </div>
              <div className='pe-2 pt-1'>
                <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                  <Download className='me-1' /> {t('header.schemaJson')}
                </button>
              </div>
              <div className='pe-2 pt-1'>
                <button className='btn btn-primary rounded-lg py-1 small d-flex align-items-center'>
                  <Download className='me-1' /> {t('header.reportPdf')}
                </button>
              </div>
              <div className='pe-2 pt-1'>
                <a href={dataset?._source?.url} target='_blank' className='btn text-white btn-primary rounded-lg py-1 small d-flex align-items-center'>
                  <Download className='me-1' /> {t('header.getDataset')}
                </a>
              </div>

            </div>
            <p
              style={{
                textAlign: "right",
                fontSize: "11px",
                marginTop: "5px",
                marginRight: "5px",
              }}
            >
              via Dataroom
            </p>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DatasetOverviewPopup;
