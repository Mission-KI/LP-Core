import React from "react";
import {
  calculateDataTypesAttribute,
  calculateTemporalCover,
  getNumericCorrelationSummary,
  getStringValueDistributionOverview,
  getTopNumericDistributions,
  getUniqueNumericDistributions,
} from "../../utils/calculations";
import { InfoCircleFill, QuestionCircle } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getNumericOutlierAnalysis } from "../../utils/edp_utils";

const AdditionalStructuredDataAttributes = ({ datasetDetails }) => {
  const navigate = useNavigate();
  const detailViewPath = `/details/${datasetDetails._id}`;

  const topDistributions = getTopNumericDistributions(datasetDetails);
  const allDistributions = getUniqueNumericDistributions(datasetDetails);

  const { t } = useTranslation();

  const scienceInfoTabNavigate = (hash) => {
    navigate(detailViewPath + "#" + hash);
  };

  return (
    <>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.dataTypes")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {calculateDataTypesAttribute(datasetDetails)}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.temporalCover")}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p className="small mb-1">{calculateTemporalCover(datasetDetails)}</p>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("temporal_consistency")}
          className="small mb-1 fw-500 text-uppercase pointer"
        >
          {t("dataset.temporalConsistency")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {datasetDetails?._source?.periodicity ?? "N/A"}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.noOfColumns")}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p className="small mb-1">
          {datasetDetails?._source?.structuredDatasets?.[0]?.columnCount ??
            "unknown"}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.noOfLines")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {datasetDetails?._source?.structuredDatasets[0]?.rowCount ??
            "unknown"}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p
          onClick={() => scienceInfoTabNavigate("numeric_value_distribution")}
          className="small mb-1 fw-500 text-uppercase pointer"
        >
          {t("dataset.numericValueDistribution")}
        </p>
      </div>
      <div className="col-6 mt-3 d-flex align-items-center">
        <p className="small mb-1">{topDistributions}</p>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-numeric-distributions">
              <div className="text-start">
                <ul className="list-unstyled mb-0">
                  {allDistributions.length > 0 ? (
                    allDistributions.map((dist, index) => (
                      <li key={index}>{dist}</li>
                    ))
                  ) : (
                    <li>N/A</li>
                  )}
                </ul>
              </div>
            </Tooltip>
          }
        >
          <QuestionCircle
            className="ms-2 text-muted"
            style={{ cursor: "pointer" }}
          />
        </OverlayTrigger>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("string_value_distribution")}
          className="small mb-1 fw-500 text-uppercase pointer"
        >
          {t("dataset.stringValueDistribution")}
        </p>
      </div>

      <div className="col-6">
        <p className="small mb-1">
          {getStringValueDistributionOverview(datasetDetails)}
        </p>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("correlation_analysis")}
          className="small mb-1 fw-500 text-uppercase pointer"
        >
          {t("dataset.numericCorrelationAnalysis")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {getNumericCorrelationSummary(datasetDetails)}
        </p>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("anomaly_analysis")}
          className="small mb-1 fw-500 text-uppercase pointer"
        >
          {t("dataset.numericOutlierAnalysis")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {getNumericOutlierAnalysis(datasetDetails)}
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-outlier">
                {t("dataset.numericOutlierAnalysisTooltipText")}
              </Tooltip>
            }
          >
            <span className="ms-2">
              <InfoCircleFill size={14} className="cursor-pointer" />
            </span>
          </OverlayTrigger>
        </p>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("data_seasonality")}
          className="small mb-1 fw-500 text-uppercase pointer"
        >
          {t("dataset.dataSeasonality")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">seasonal, no trend</p>
      </div>
    </>
  );
};

export default AdditionalStructuredDataAttributes;
