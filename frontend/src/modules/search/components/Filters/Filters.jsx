import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "rc-slider/assets/index.css";
import styles from "./Filters.module.css";
import { X } from "react-bootstrap-icons";
import { useCallback } from "react";
import { DataspaceFilter } from "./DataspaceFilter";
import { PublisherFilter } from "./PublisherFilter";
import { AssetProcessingFilter } from "./AssetProcessingFilter";
import { LicenseFilter } from "./LicenseFilter";
import { DataFormatFilter } from "./DataFormatFilter";
import { AccessFilter } from "./AccessFilter";
import { LinesFilter } from "./LinesFilter";
import { ColumnsFilter } from "./ColumnsFilter";
import { FileSizeFilter } from "./FileSizeFilter";
import { ClearFiltersButton } from "./ClearFiltersButton";
import { ProcessingStatusFilters } from "./ProcessingStatusFilters";

function Filters({ filtersDropdownVisible }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const queryObj = {};
    params.forEach((value, key) => {
      if (!queryObj[key]) {
        queryObj[key] = [];
      }
      queryObj[key].push(value);
    });
    return queryObj;
  }, [location.search]);

  const removeFilter = (key) => {
    const params = new URLSearchParams(location.search);
    params.delete(key);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const [selectedFilters, setSelectedFilters] = useState({});
  const ignoredKeys = ["q", "page", "sorting"];

  useEffect(() => {
    const queryParams = getQueryParams();
    setSelectedFilters(queryParams);
  }, [location.search, getQueryParams]);

  const urlParams = new URLSearchParams(location.search);
  const dataTypes = urlParams.getAll("dataType");

  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="d-flex flex-wrap">
          {Object.entries(selectedFilters)
            .filter(([key]) => !ignoredKeys.includes(key))
            .map(([key, values]) => (
              <div key={key} className="bgc-light-gray px-2 rounded me-2 mb-1">
                <span className="small">{key}</span>:{" "}
                <span className="small txt-lighter">{values.join(", ")}</span>
                <button
                  style={{ marginBottom: 1.5 }}
                  onClick={() => removeFilter(key)}
                  className="btn hover-lg txt-primary p-0 small ms-2"
                >
                  <X />
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className={`${!filtersDropdownVisible ? "d-none" : ""}`}>
        <div
          className={`${styles.filtersWrapper} row`}
          style={{ maxWidth: 900 }}
        >
          <DataspaceFilter />
          <PublisherFilter />
          <AssetProcessingFilter />
          <LicenseFilter />
          <DataFormatFilter />
          <AccessFilter />
          {dataTypes.length == 0 || dataTypes.includes("structured") ? (
            <div className="row">
              <LinesFilter />
              <ColumnsFilter />
            </div>
          ) : null}
          <FileSizeFilter />
          <ProcessingStatusFilters />
          <ClearFiltersButton />
        </div>
      </div>
    </div>
  );
}

export default Filters;
