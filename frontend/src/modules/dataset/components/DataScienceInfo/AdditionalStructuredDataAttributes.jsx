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

const AdditionalStructuredDataAttributes = ({ edp }) => {
  const navigate = useNavigate();
  const detailViewPath = `/details/${edp._id}`;

  const topDistributions = getTopNumericDistributions(edp);
  const allDistributions = getUniqueNumericDistributions(edp);

  const { t } = useTranslation();

  const scienceInfoTabNavigate = (hash) => {
    navigate(detailViewPath + "#" + hash);
  };

  return (
    <>
      <div className="col-6">
        <p className="small lh-sm pb-2 text-uppercase">
          {t("dataset.dataTypes")}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2">{calculateDataTypesAttribute(edp)}</p>
      </div>
      <div className="col-6 mt-3">
        <p className="small lh-sm pb-2 text-uppercase">
          {t("dataset.temporalCover")}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p className="small lh-sm pb-2">{calculateTemporalCover(edp)}</p>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("temporal_consistency")}
          className="small lh-sm pb-2 text-uppercase pointer"
        >
          {t("dataset.temporalConsistency")}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2">{edp?._source?.periodicity ?? "N/A"}</p>
      </div>
      <div className="col-6 mt-3">
        <p className="small lh-sm pb-2 text-uppercase">
          {t("dataset.noOfColumns")}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p className="small lh-sm pb-2">
          {edp?._source?.structuredDatasets?.[0]?.columnCount ?? "unknown"}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2 text-uppercase">
          {t("dataset.noOfLines")}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2">
          {edp?._source?.structuredDatasets[0]?.rowCount ?? "unknown"}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p
          onClick={() => scienceInfoTabNavigate("numeric_value_distribution")}
          className="small lh-sm pb-2 text-uppercase pointer"
        >
          {t("dataset.numericValueDistribution")}
        </p>
      </div>
      <div className="col-6 mt-3 d-flex align-items-center">
        <p className="small lh-sm pb-2">{topDistributions}</p>
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
          className="small lh-sm pb-2 text-uppercase pointer"
        >
          {t("dataset.stringValueDistribution")}
        </p>
      </div>

      <div className="col-6">
        <p className="small lh-sm pb-2">
          {getStringValueDistributionOverview(edp)}
        </p>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("correlation_analysis")}
          className="small lh-sm pb-2 text-uppercase pointer"
        >
          {t("dataset.numericCorrelationAnalysis")}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2">{getNumericCorrelationSummary(edp)}</p>
      </div>
      <div className="col-6">
        <p
          onClick={() => scienceInfoTabNavigate("anomaly_analysis")}
          className="small lh-sm pb-2 text-uppercase pointer"
        >
          {t("dataset.numericOutlierAnalysis")}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2">
          {getNumericOutlierAnalysis(edp)}
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
    </>
  );
};

export default AdditionalStructuredDataAttributes;
