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
        <InfoCircleFill size={20} className="text-secondary" />
      </Dropdown.Toggle>

      <Dropdown.Menu className={`fade border-0 shadow rounded-lg ${show ? "show" : ""}`} style={{ width: 550 }}>
        <div className="container">
          <div className="row">
            <div className="mw-100">
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
                <p className="bold medium mt-3 txt-primary">
                  {t('dataset.dataScienceInfo')}
                </p>
                <div
                  className="row justify-content-between"
                  style={{
                    paddingLeft: "13px",
                    paddingRight: "13px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    className={`col-4 ${styles["data-info"]} d-flex flex-row justify-content-between`}
                    style={{ maxWidth: "35% !important" }}
                  >
                    <div className="w-100">
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>STRUCTURE</p>
                        <p className={styles.attribute}>Text (CSV)</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>VOLUME</p>
                        <p className={styles.attribute}>{filesize(dataset?._source?.volume)}</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>COMPRESSION</p>
                        <p className={styles.attribute}>
                          {dataset?.dataset?._source?.compression ?? "None"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>TRANSFER TYPE</p>
                        <p className={styles.attribute}>
                          {dataset?.dataset?._source?.transferTypeFlag ?? "None"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>IMMUTABILITY</p>
                        <p className={styles.attribute}>
                          {dataset?.dataset_source?.immutabilityFlag ?? "None"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>GROWTH</p>
                        <p className={styles.attribute}>
                          {dataset?.dataset?._source?.growthFlag ?? "None"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>GROWTH RATE</p>
                        <p className={styles.attribute}>Unknown</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>TEMPORAL COVER</p>
                        <p className={styles.attribute}>
                          {calculateTemporalCover(dataset?.dataset?.datasets)}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>TEMPORAL CONSISTENCY</p>
                        <p className={styles.attribute}>
                          {calculateTemporalConsistency(
                            dataset?.dataset?.datasets
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-8 ${styles["data-info"]} d-flex flex-row justify-content-between w-100`}
                  >
                    <div className="w-100">
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>NUMBER OF COLUMNS</p>
                        <p className={styles.attribute}>
                          {dataset?.dataset?._source?.datasets &&
                            dataset?.dataset?._source?.datasets?.length > 0
                            ? dataset?.dataset?._source.datasets[0].columns
                              .length
                            : "No row count available"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>NUMBER OF LINES</p>
                        <p className={styles.attribute}>
                          {dataset?.dataset?._source?.datasets &&
                            dataset?.dataset?._source?.datasets?.length > 0
                            ? dataset?.dataset?._source.datasets[0].rowCount
                            : "No row count available"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>DATA TYPES</p>
                        <p className={styles.attribute}>
                          time, string, numeric
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>
                          ATTRIBUTE CONSISTENCY
                        </p>
                        <p className={styles.attribute}>
                          partially inconsistent
                        </p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>LANGUAGES</p>
                        <p className={styles.attribute}>german, english</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>
                          NUMERIC VALUE DISTRIBUTION
                        </p>
                        <p className={styles.attribute}>heterogen</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>
                          STRING VALUE DISTRIBUTION
                        </p>
                        <p className={styles.attribute}>heterogen</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>
                          NUMERIC CORRELATION ANALYSIS
                        </p>
                        <p className={styles.attribute}>partial correlation</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>
                          NUMERIC ANOMALY ANALYSIS
                        </p>
                        <p className={styles.attribute}>anomaly exists</p>
                      </div>
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <p className={styles.attribute}>
                          NUMERIC ANOMALY ANALYSIS
                        </p>
                        <p className={styles.attribute}>seasonal, no trend</p>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
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
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DatasetOverviewPopup;
