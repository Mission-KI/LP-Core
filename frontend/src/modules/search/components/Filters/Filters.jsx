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
import { getFilterValues } from "../../../common/api/elastic";
import { useEffect, useState } from "react";

function Filters({ filtersDropdownVisible }) {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dataTypes = urlParams.getAll("dataType");

  const [assetProcessingStatuses, setAssetProcessingStatuses] = useState([]);
  const [maxColumnCount, setMaxColumnCount] = useState(0);
  const [dataFormats, setDataFormats] = useState([]);
  const [dataSpaces, setDataSpaces] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [maxRowCount, setMaxRowCount] = useState(0);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchFilterValues = async () => {
      try {
        const response = await getFilterValues();
        setAssetProcessingStatuses(
          response?.aggregations?.distinct_assetProcessingStatus?.buckets || [],
        );
        setMaxColumnCount(response?.aggregations?.max_column_count?.value || 0);
        setDataFormats(
          response?.aggregations?.distinct_dataTypes?.buckets || [],
        );
        setDataSpaces(
          response?.aggregations?.nested_asset_refs?.distinct_dataSpace_names
            ?.buckets || [],
        );
        setLicenses(
          response?.aggregations?.nested_asset_refs?.distinct_license_names
            .buckets || [],
        );
        setMaxRowCount(response?.aggregations?.max_row_count?.value || 0);
        setPublishers(
          response?.aggregations?.nested_asset_refs?.distinct_publisher_names
            ?.buckets || [],
        );
      } catch (error) {
        console.error("Error fetching filter values:", error);
      }
    };
    fetchFilterValues();
  }, []);

  return (
    <div>
      <AppliedFilters />
      <div className={`${!filtersDropdownVisible ? "d-none" : ""}`}>
        <div
          className={`${styles.filtersWrapper} row`}
          style={{ maxWidth: 900 }}
        >
          <DataspaceFilter dataSpaces={dataSpaces} />
          <PublisherFilter publishers={publishers} />
          <AssetProcessingFilter
            assetProcessingStatuses={assetProcessingStatuses}
          />
          <LicenseFilter licenses={licenses} />
          <DataFormatFilter dataFormats={dataFormats} />
          <AccessFilter />
          {dataTypes.length == 0 || dataTypes.includes("structured") ? (
            <div className="row">
              <LinesFilter maxRowCount={maxRowCount} />
              <ColumnsFilter maxColumnCount={maxColumnCount} />
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
