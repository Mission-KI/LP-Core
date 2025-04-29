import { useEffect, useState, useRef } from "react";
import { useFilterSections } from "../../../common/utils/filter_utils";
import { FormGroup } from "react-bootstrap";
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

function Filters({ filtersDropdownVisible, setFiltersDropdownVisible }) {
  const { filterSections, loading } = useFilterSections();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

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

  const [checkedOptions, setCheckedOptions] = useState({});

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

  const updateQueryParams = (name, value, checked) => {
    const params = new URLSearchParams(location.search);

    params.delete("page");

    if (checked) {
      params.append(name, value);
    } else {
      const allValues = params.getAll(name);
      params.delete(name);
      allValues
        .filter((v) => v !== value)
        .forEach((v) => params.append(name, v));
    }

    navigate(`/?${params.toString()}`, { replace: true });
  };

  const handleCheckboxChange = (filter) => {
    const isChecked = !checkedOptions[filter.label];
    setCheckedOptions((prev) => ({
      ...prev,
      [filter.label]: isChecked,
    }));
    updateQueryParams(filter.name, filter.value, isChecked);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        filtersDropdownVisible &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setFiltersDropdownVisible(false);
      }
    },
    [filtersDropdownVisible, setFiltersDropdownVisible, dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  let filteredFilterSections = filterSections;

  const urlParams = new URLSearchParams(location.search);
  const dataTypes = urlParams.getAll("dataType");

  if (dataTypes.length > 0) {
    filteredFilterSections = filterSections.filter(
      (section) =>
        section.forDataType === null || dataTypes.includes(section.forDataType)
    );
  } else {
    filteredFilterSections = filterSections;
  }
  if (loading) {
    return "";
  }

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
          <LinesFilter />
          <ColumnsFilter />
          <FileSizeFilter />

          {filteredFilterSections?.map((filterSection, key) => (
            <FormGroup
              key={key}
              className={`mb-2 ${
                filterSection.type === "single_icon"
                    ? "col-1"
                    : ""
              }`}
            >
              <div className="d-flex align-items-center py-1 position-relative h-100">
                {filterSection.type == "single_icon" ? (
                  <div>
                    {filterSection.filters.map((filter, key) => (
                      <button
                        key={key}
                        type="button"
                        className={`btn ps-0 ${checkedOptions[filter.label] ? "txt-primary bold" : "txt-lighter"}`}
                        id={`checkbox-${filter.value}`}
                        name={filter.name}
                        value={filter.value}
                        checked={checkedOptions[filter.label] || false}
                        onClick={() => handleCheckboxChange(filter)}
                        autoComplete="off"
                      >
                        {filter.icon}
                      </button>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </FormGroup>
          ))}
         <ClearFiltersButton />
        </div>
      </div>
    </div>
  );
}

export default Filters;
