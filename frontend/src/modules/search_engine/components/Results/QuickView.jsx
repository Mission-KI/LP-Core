import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import {
  InfoCircleFill,
  Download,
  StarFill,
  Star,
} from "react-bootstrap-icons";
import styles from "./Dropdown.module.css";
import { filesize } from "filesize";
import { t } from "i18next";
import { Link } from "react-router-dom";
import {
  addBookmark,
  isBookmarked,
  removeBookmark,
} from "../../../common/utils/bookmarks";

function QuickView({ dataset, bookmarks, setBookmarks }) {
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

    setBookmarks((prevBookmarks) => {
      const currentHits = prevBookmarks.hits?.hits || [];
      return {
        ...prevBookmarks,
        hits: {
          ...prevBookmarks.hits,
          hits: [...currentHits, dataset],
        },
      };
    });
  };

  const handleRemoveBookmark = (id) => {
    removeBookmark(id);
    setBookmarked(false);

    setBookmarks((prevBookmarks) => {
      const currentHits = prevBookmarks.hits?.hits || [];
      return {
        ...prevBookmarks,
        hits: {
          ...prevBookmarks.hits,
          hits: currentHits.filter((item) => item._id !== id),
        },
      };
    });
  };

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

      <Dropdown.Menu
        className={`fade border-0 shadow rounded-lg w-100 ${show ? "show" : ""}`}
        style={{ maxWidth: 650, minWidth: 350 }}
      >
        <div className="container">
          <div>
            <p className={styles.dataTitle}>{dataset?._source?.name}</p>
            {dataset?.dataset?._source?.tags?.length > 0 && (
              <div className={styles.tags}>
                <span className="text-muted medium">{t("dataset.tags")}</span>
                <div className={styles.tagList}>
                  {dataset.dataset._source.tags.map((tag) => (
                    <button
                      className="btn btn-basic border small rounded-lg me-3"
                      key={tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="medium bold mt-3 txt-primary">
              {t("dataset.dataScienceInfo")}
            </p>
            <hr />
            <div className="row">
              <div className="col-md-5">
                <div className="w-100">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.structure")}
                    </p>
                    <p className="small">Text (CSV)</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.volume")}
                    </p>
                    <p className="small">
                      {filesize(dataset?._source?.volume)}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.compression")}
                    </p>
                    <p className="small">zip</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.transferType")}
                    </p>
                    <p className="small">
                      {dataset?._source?.transferTypeFlag ?? "unknown"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.immutability")}
                    </p>
                    <p className="small">
                      {dataset?._source?.immutabilityFlag ?? "unknown"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.growth")}
                    </p>
                    <p className="small">
                      {dataset?._source?.growthFlag ?? "unknown"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.growthRate")}
                    </p>
                    <p className="small">unknown</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.temporalCover")}
                    </p>
                    <p className="small">unknown</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.temporalConsistency")}
                    </p>
                    <p className="small">unknown</p>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="w-100">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.noOfColumns")}
                    </p>
                    <p className="small">
                      {dataset?._source?.structuredDatasets[0]?.columnCount}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.noOfLines")}
                    </p>
                    <p className="small">
                      {dataset?._source?.structuredDatasets[0]?.rowCount}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.dataTypes")}
                    </p>
                    <p className="small">
                      {dataset?._source?.dataTypes.map(
                        (dataType, index, arr) => (
                          <span key={index}>
                            {dataType}
                            {index < arr.length - 1 && ", "}
                          </span>
                        )
                      )}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.attributeConsistency")}
                    </p>
                    <p className="small">partially inconsistent</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.languages")}
                    </p>
                    <p className="small">german, english</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.numericValueDistribution")}
                    </p>
                    <p className="small">heterogen</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.stringValueDistribution")}
                    </p>
                    <p className="small">heterogen</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.numericCorrelationAnalysis")}
                    </p>
                    <p className="small">partial correlation</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.numericAnomalyAnalysis")}
                    </p>
                    <p className="small">anomaly exists</p>
                  </div>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <p className="small text-uppercase">
                      {t("dataset.dataSeasonality")}
                    </p>
                    <p className="small">seasonal, no trend</p>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <hr />
            <div className="d-flex w-100 align-items-center pt-3 flex-wrap justify-content-end">
              <div className="pe-2 pt-1">
                <Link
                  to={`/details/${dataset._id}`}
                  className="btn text-white btn-primary rounded-lg py-1 small"
                >
                  {t("dataset.details")}
                </Link>
              </div>
              {!bookmarked ? (
                <div className="pe-2 pt-1">
                  <button
                    onClick={() => handleAddBookmark(dataset?._id)}
                    className="btn btn-primary rounded-lg py-1 small d-flex align-items-center"
                  >
                    {t("header.bookmark")} <Star className="txt-white ms-2" />
                  </button>
                </div>
              ) : (
                <div className="pe-2 pt-1">
                  <button
                    onClick={() => handleRemoveBookmark(dataset?._id)}
                    className="btn btn-primary rounded-lg py-1 small d-flex align-items-center"
                  >
                    <StarFill className="me-1" />
                    {t("header.removeBookmark")}
                  </button>
                </div>
              )}
              <div className="pe-2 pt-1">
                <button className="btn btn-primary rounded-lg py-1 small d-flex align-items-center">
                  <Download className="me-1" /> {t("header.schemaJson")}
                </button>
              </div>
              <div className="pe-2 pt-1">
                <button className="btn btn-primary rounded-lg py-1 small d-flex align-items-center">
                  <Download className="me-1" /> {t("header.reportPdf")}
                </button>
              </div>
              <div className="pe-2 pt-1">
                <a
                  href={dataset?._source?.url}
                  target="_blank"
                  className="btn text-white btn-primary rounded-lg py-1 small d-flex align-items-center"
                >
                  <Download className="me-1" /> {t("header.getDataset")}
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
              via dataspace
            </p>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default QuickView;
