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
                "/data-formats-and-analysis#date-time-attribute-section",
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
                "/data-formats-and-analysis#temporal-frequency-section",
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
                "/data-formats-and-analysis#data-type-consistency-section",
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
                "/data-formats-and-analysis#significant-variance-section",
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
