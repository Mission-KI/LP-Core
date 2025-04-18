import { useState, useEffect } from "react";
import { getFilterValues } from "../api/elastic";
import {
  LockFill,
  Calendar,
  Activity,
  Sliders2Vertical,
} from "react-bootstrap-icons";
import { OverlayTrigger } from "react-bootstrap";
import { UnlockFill, Soundwave } from "react-bootstrap-icons";
import { renderTooltip } from "./tooltip";
import { useLocation } from "react-router";

export const useFilterSections = () => {
  const [dataSpaces, setDataSpaces] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  const [maxRowCount, setMaxRowCount] = useState(0);
  const [maxColumnCount, setMaxColumnCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchFilterValues = async () => {
      try {
        const response = await getFilterValues();
        setDataSpaces(
          response?.aggregations?.nested_asset_refs?.distinct_dataSpace_names
            ?.buckets || [],
        );
        setLicenses(
          response?.aggregations?.nested_asset_refs?.distinct_license_names
            ?.buckets || [],
        );
        setPublishers(
          response?.aggregations?.nested_asset_refs?.distinct_publisher_names
            ?.buckets || [],
        );
        setDataTypes(response?.aggregations?.distinct_dataTypes?.buckets || []);
        setMaxRowCount(response?.aggregations?.max_row_count?.value || 0);
        setMaxColumnCount(response?.aggregations?.max_column_count?.value || 0);
      } catch (error) {
        console.error("Error fetching dataSpaces and licenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterValues();
  }, [location.search]);

  if (loading) {
    return { filterSections: [], loading };
  }

  const filterSections = [
    {
      title: "dataspaces",
      type: "checkboxes",
      forDataType: null,
      filters: dataSpaces?.map((dataSpace) => ({
        label: dataSpace.key,
        value: dataSpace.key,
        name: "dataSpace.name",
        type: "checkbox",
      })),
    },
    {
      title: "publisher",
      type: "checkboxes",
      forDataType: null,
      filters: publishers?.map((publisher) => ({
        label: publisher.key,
        value: publisher.key,
        name: "publisher.name",
        type: "checkbox",
      })),
    },
    {
      title: "assetProcessingStatus",
      type: "checkboxes",
      forDataType: null,
      filters: [
        {
          label: "Original Data",
          value: "Original Data",
          name: "assetProcessingStatus",
          type: "checkbox",
        },
        {
          label: "Processed Data",
          value: "Processed Data",
          name: "assetProcessingStatus",
          type: "checkbox",
        },
        {
          label: "Refined Data",
          value: "Refined Data",
          name: "assetProcessingStatus",
          type: "checkbox",
        },
        {
          label: "AI/ML Result Data",
          value: "AI/ML Result Data",
          name: "assetProcessingStatus",
          type: "checkbox",
        },
      ],
    },
    {
      title: "licenses",
      type: "checkboxes",
      forDataType: null,
      filters: licenses?.map((license) => ({
        label: license.key,
        value: license.key,
        name: "license.name",
        type: "checkbox",
      })),
    },
    {
      title: "dataFormat",
      type: "checkboxes",
      forDataType: null,
      filters: dataTypes?.map((dataType) => ({
        label: dataType.key,
        value: dataType.key,
        name: "dataType",
        type: "checkbox",
      })),
    },
    {
      title: "accessibility",
      type: "radio",
      forDataType: null,
      filters: [
        {
          label: (
            <OverlayTrigger
              delay={{ show: 100, hide: 700 }}
              placement="top"
              overlay={renderTooltip("Open access", "open-access-section")}
            >
              <div>
                <UnlockFill />
              </div>
            </OverlayTrigger>
          ),
          value: "true",
          name: "freely_available",
          type: "radio",
        },
        {
          label: (
            <OverlayTrigger
              delay={{ show: 100, hide: 700 }}
              placement="top"
              overlay={renderTooltip("Closed access", "closed-access-section")}
            >
              <div>
                <LockFill />
              </div>
            </OverlayTrigger>
          ),
          value: "false",
          name: "freely_available",
          type: "radio",
        },
      ],
    },
    {
      title: "attributes",
      type: "doublerange",
      forDataType: "structured",
      filters: [
        {
          label: "lines",
          name_1: "min_lines",
          name_2: "max_lines",
          type: "doublerange",
          minValue: 0,
          maxValue: maxRowCount,
        },
        {
          label: "columns",
          name_1: "min_columns",
          name_2: "max_columns",
          type: "doublerange",
          minValue: 0,
          maxValue: maxColumnCount,
        },
      ],
    },
    {
      title: "fileSize",
      type: "filesize",
      forDataType: null,
      filters: [
        {
          label: "Size range",
          name_1: "min_size",
          name_2: "max_size",
          type: "doublerange",
          minValue: 0,
          maxValue: 100,
        },
      ],
    },
    {
      title: "",
      type: "single_icon",
      forDataType: "structured",
      filters: [
        {
          label: "hasDatetimeAttribute",
          icon: (
            <OverlayTrigger
              delay={{ show: 100, hide: 700 }}
              placement="top"
              overlay={renderTooltip(
                "Date time attribute",
                "date-time-attribute-section",
              )}
            >
              <div>
                <Calendar />
              </div>
            </OverlayTrigger>
          ),
          value: "true",
          name: "hasDatetimeAttribute",
          type: "checkbox",
        },
      ],
    },
    {
      title: "",
      type: "single_icon",
      forDataType: "structured",
      filters: [
        {
          label: "hasTemporalFrequency",
          icon: (
            <OverlayTrigger
              delay={{ show: 100, hide: 700 }}
              placement="top"
              overlay={renderTooltip(
                "Temporal frequency",
                "temporal-frequency-section",
              )}
            >
              <div>
                <Soundwave />
              </div>
            </OverlayTrigger>
          ),
          value: "true",
          name: "hasTemporalFrequency",
          type: "checkbox",
        },
      ],
    },
    {
      title: "",
      type: "single_icon",
      forDataType: "structured",
      filters: [
        {
          label: "dataTypeConsistency",
          icon: (
            <OverlayTrigger
              delay={{ show: 100, hide: 700 }}
              placement="top"
              overlay={renderTooltip(
                "Data type consistency",
                "data-type-consistency-section",
              )}
            >
              <div>
                <Sliders2Vertical />
              </div>
            </OverlayTrigger>
          ),
          value: "true",
          name: "dataTypeConsistency",
          type: "checkbox",
        },
      ],
    },
    {
      title: "",
      type: "single_icon",
      forDataType: "structured",
      filters: [
        {
          label: "significantVariance",
          icon: (
            <OverlayTrigger
              delay={{ show: 100, hide: 700 }}
              placement="top"
              overlay={renderTooltip(
                "Significant variance",
                "significant-variance-section",
              )}
            >
              <div>
                <Activity />
              </div>
            </OverlayTrigger>
          ),
          value: "true",
          name: "significantVariance",
          type: "checkbox",
        },
      ],
    },
  ];

  return { filterSections, loading };
};
