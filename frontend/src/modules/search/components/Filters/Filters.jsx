import { useLocation } from "react-router-dom";
import "rc-slider/assets/index.css";
import styles from "./Filters.module.css";
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
import { AppliedFilters } from "./AppliedFilters";

function Filters({ filtersDropdownVisible }) {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dataTypes = urlParams.getAll("dataType");

  return (
    <div>
      <AppliedFilters />
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
