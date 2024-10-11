import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import {
  InfoCircleFill,
  StarFill,
  Download,
  Star,
} from "react-bootstrap-icons";
import styles from "./Dropdown.module.css";
import {
  calculateTemporalConsistency,
  calculateTemporalCover,
} from "../../../common/utils/dataset_utils";
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from "../../../common/utils/bookmarks";
import { Link } from "react-router-dom";

function DatasetOverviewPopup(dataset) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [structure, setStructure] = useState("Text (CSV)");
  const [volume, setVolume] = useState(null);
  const [compression, setCompression] = useState("None");
  const [transferType, settransferType] = useState("None");
  const [immutability, setimmutability] = useState("None");
  const [growth, setGrowth] = useState("None");
  const [temporalCover, setTemporalCover] = useState();
  const [temporalConsistency, setTemporalConsistency] = useState();
  const [columnNumber, setcolumnNumber] = useState();
  const [lineNumber, setlineNumber] = useState();
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  useEffect(() => {
    if (dataset?.dataset._id) {
      setIsBookmarkedState(isBookmarked(dataset?.dataset._id));
    }
    if (dataset.dataset) {
      const { _source } = dataset.dataset;
      setName(_source.name);
      setTags(_source.tags || []);
      const volumeValue = _source.volume;
      if (volumeValue) {
        setVolume((volumeValue / 1024 / 1024).toFixed(2)); // Convert to MB and fix to 2 decimal places
      } else {
        setVolume(null); // Set to null if no volume is available
      }
      setCompression(_source.compression ?? "None"); // Use nullish coalescing for compression
      settransferType(_source.transferTypeFlag ?? "None"); // Use nullish coalescing for compression
      setimmutability(_source.immutabilityFlag ?? "None"); // Use nullish coalescing for compression
      setGrowth(_source.growthFlag ?? "None"); // Use nullish coalescing for compression
      //setTemporalCover(calculateTemporalCover(_source.datasets));
      setcolumnNumber(
        _source?.datasets && _source?.datasets?.length > 0
          ? _source.datasets[0].columns.length
          : "No row count available"
      );
      setlineNumber(
        _source?.datasets && _source?.datasets?.length > 0
          ? _source.datasets[0].rowCount
          : "No row count available"
      );
    }
  }, [dataset]);

  const toggleDropdown = (isShown) => {
    setShow(isShown);
  };

  const handleAddBookmark = () => {
    addBookmark(dataset._id);
    setIsBookmarkedState(true);
  };

  const handleRemoveBookmark = () => {
    removeBookmark(dataset._id);
    setIsBookmarkedState(false);
  };

  return (
    <Dropdown
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
      show={show}
    >
      <Dropdown.Toggle
        as="div"
        id="dropdown-basic"
        className="p-0 m-0 border-0 d-flex align-items-center"
      >
        <InfoCircleFill size={20} className="text-secondary" />
      </Dropdown.Toggle>

      <Dropdown.Menu
        className={`fade ${show ? "show" : ""} ${styles["tag-container"]}`}
      >
        <div className="container">
          <div className="row">
            <div className="mw-100">
              <div>
                <p className={styles.dataTitle}>{name}</p>
                <div className={styles.tags}>
                  <div className="tag">
                    <span style={{ fontSize: "14px", color: "#253861" }}>
                      TAGS
                    </span>
                  </div>
                  <div className={styles.tagList}>
                    {tags.length > 0 ? (
                      tags.map((tag, index) => (
                        <div key={index} className={styles.singleTag}>
                          <span className={styles.singleTagtext}>{tag}</span>
                        </div>
                      ))
                    ) : (
                      <p>No tags available</p>
                    )}
                  </div>
                </div>
                <p style={{ color: "#253761", fontWeight: "bold" }}>
                  DATA SCIENCE INFO
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
                    style={{maxWidth: '35% !important'}}
                  >
                    <div className="w-100">
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>STRUCTURE</p>
                        <p className={styles.attribute}>{structure}</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>VOLUME</p>
                        <p className={styles.attribute}>{volume}</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>COMPRESSION</p>
                        <p className={styles.attribute}>{compression}</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>TRANSFER TYPE</p>
                        <p className={styles.attribute}>{transferType}</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>IMMUTABILITY</p>
                        <p className={styles.attribute}>{immutability}</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>GROWTH</p>
                        <p className={styles.attribute}>{growth}</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>GROWTH RATE</p>
                        <p className={styles.attribute}>Unknown</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>TEMPORAL COVER</p>
                        <p className={styles.attribute}>Unknown</p>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <p className={styles.attribute}>TEMPORAL CONSISTENCY</p>
                        <p className={styles.attribute}>Unknown</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-8 ${styles["data-info"]} d-flex flex-row justify-content-between w-100`}
                  >
                    <div>
                      <p className={styles.attribute}>NUMBER OF COLUMNS</p>
                      <p className={styles.attribute}>NUMBER OF LINES</p>
                      <p className={styles.attribute}>DATA TYPES</p>
                      <p className={styles.attribute}>ATTRIBUTE CONSISTENCY</p>
                      <p className={styles.attribute}>LANGUAGES</p>
                      <p className={styles.attribute}>
                        NUMERIC VALUE DISTRIBUTION
                      </p>
                      <p className={styles.attribute}>
                        STRING VALUE DISTRIBUTION
                      </p>
                      <p className={styles.attribute}>
                        NUMERIC CORRELATION ANALYSIS
                      </p>
                      <p className={styles.attribute}>
                        NUMERIC ANOMALY ANALYSIS
                      </p>
                      <p className={styles.attribute}>
                        NUMERIC ANOMALY ANALYSIS
                      </p>
                      <p className={styles.attribute}>DATA SEASONALITY</p>
                    </div>
                    <div>
                      <p className={styles.attribute}>{columnNumber}</p>
                      <p className={styles.attribute}>{lineNumber}</p>
                      <p className={styles.attribute}>time, string, numeric</p>
                      <p className={styles.attribute}>partially inconsistent</p>
                      <p className={styles.attribute}>german, english</p>
                      <p className={styles.attribute}>heterogen</p>
                      <p className={styles.attribute}>heterogen</p>
                      <p className={styles.attribute}>partial correlation</p>
                      <p className={styles.attribute}>anomaly exists</p>
                      <p className={styles.attribute}>seasonal, no trend</p>
                    </div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <Link to={`/details/${dataset.dataset._id}`} className={styles.action}>
                    <span className={styles.actionText}>Details</span>
                  </Link>
                  <div className={styles.action}>
                    <Download style={{ color: "white" }} />
                    <span className={styles.actionText}>Schema (JSON)</span>
                  </div>
                  <div className={styles.action}>
                    <Download style={{ color: "white" }} />
                    <span className={styles.actionText}>Report (PDF)</span>
                  </div>
                  <div className={styles.action}>
                    <Download style={{ color: "white" }} />
                    <span className={styles.actionText}>Get Dataset</span>
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
