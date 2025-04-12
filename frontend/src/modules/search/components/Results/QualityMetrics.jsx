import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  calculateAttributeIntegrity,
  getSignificantVariance,
  isDataTypeConsistent,
} from "../../../dataset/utils/calculations";
import {
  Unlock,
  Soundwave,
  Calendar,
  Activity,
  Sliders2,
  Sliders2Vertical,
  Lock,
  Robot,
} from "react-bootstrap-icons";
import { renderTooltip } from "../../../common/utils/tooltip";

const QualityMetrics = ({ edp }) => {
  return (
    <div className="d-flex">
      {edp?._source?.freely_available ? (
        <div>
          <OverlayTrigger
            delay={{ show: 100, hide: 700 }}
            placement="top"
            overlay={renderTooltip("Open access", "open-access-section")}
          >
            <div>
              <Unlock />
            </div>
          </OverlayTrigger>
        </div>
      ) : (
        <div>
          <OverlayTrigger
            delay={{ show: 100, hide: 700 }}
            placement="top"
            overlay={renderTooltip("Closed access", "closed-access-section")}
          >
            <div>
              <Lock />
            </div>
          </OverlayTrigger>
        </div>
      )}
      {edp?._source?.structuredDatasets[0]?.datetimeColumnCount > 0 && (
        <div className="ps-2">
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
        </div>
      )}
      {edp?._source?.periodicity && (
        <div className="ps-2">
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
        </div>
      )}
      {isDataTypeConsistent(edp) && (
        <div className="ps-2">
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
        </div>
      )}
      {calculateAttributeIntegrity(edp) === "consistent" && (
        <div className="ps-2">
          <OverlayTrigger
            delay={{ show: 100, hide: 700 }}
            placement="top"
            overlay={renderTooltip(
              "Attribute integrity",
              "attribute-integrity-section",
            )}
          >
            <div>
              <Sliders2 />
            </div>
          </OverlayTrigger>
        </div>
      )}
      {getSignificantVariance(edp) && (
        <div className="ps-2">
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
        </div>
      )}
      {edp?._source?.allowedForAiTraining && (
        <div className="ps-2">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Allowed for AI training</Tooltip>}
          >
            <div>
              <Robot />
            </div>
          </OverlayTrigger>
        </div>
      )}
      <div className="ps-2">
        <OverlayTrigger
          delay={{ show: 100, hide: 900 }}
          placement="top"
          className="small"
          overlay={renderTooltip(
            <span style={{ fontSize: 10 }}>
              {edp._source.assetProcessingStatus === "Original Data"
                ? "Unverarbeitete, direkt aus den Quellen stammende Daten"
                : edp._source.assetProcessingStatus === "Processed Data"
                  ? "Redefinierte, konvertierte und semantisch bereinigte sowie transformierte Daten, die eine verbesserte Struktur und höhere Konsistenz aufweisen"
                  : edp._source.assetProcessingStatus === "Refined Data"
                    ? "Feature Engineered und aggregierte Daten. Optimierte und zusammengefasste Datensätze für KI-Training"
                    : edp._source.assetProcessingStatus === "KI/ML Data"
                      ? "KI/ML generierte Ergebnisdatensätze"
                      : "Unbekannter Datenstatus"}
            </span>,
          )}
        >
          <span
            className={`asset-processing-status ${
              edp._source.assetProcessingStatus === "Original Data"
                ? "danger"
                : edp._source.assetProcessingStatus === "Processed Data"
                  ? "warning"
                  : edp._source.assetProcessingStatus === "Refined Data"
                    ? "success"
                    : "primary"
            }`}
          >
            {edp._source.assetProcessingStatus}
          </span>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default QualityMetrics;
