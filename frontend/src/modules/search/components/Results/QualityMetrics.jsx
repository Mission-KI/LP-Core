import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  calculateAttributeIntegrity,
  isDataTypeConsistent,
} from "../../../dataset/utils/calculations";
import {
  Unlock,
  Gear,
  ClipboardCheck,
  Soundwave,
  Calendar,
  Broadcast,
  Activity,
  Sliders2,
  Sliders2Vertical,
  Lock,
  Robot,
  QuestionCircle,
} from "react-bootstrap-icons";
import { renderTooltip } from "../../../common/utils/tooltip";

const QualityMetrics = ({ dataset }) => {
  return (
    <div className="d-flex">
      {dataset?._source?.freely_available ? (
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
      {dataset?._source?.structuredDatasets[0]?.datetimeColumnCount > 0 && (
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
      {dataset?._source?.periodicity && (
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
      {isDataTypeConsistent(dataset) && (
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
      {calculateAttributeIntegrity(dataset) === "consistent" && (
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
      {dataset?._source?.allowedForAiTraining && (
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
              {dataset._source.assetProcessingStatus === "Original Data"
                ? "Unverarbeitete, direkt aus den Quellen stammende Daten"
                : dataset._source.assetProcessingStatus === "Processed Data"
                  ? "Redefinierte, konvertierte und semantisch bereinigte sowie transformierte Daten, die eine verbesserte Struktur und höhere Konsistenz aufweisen"
                  : dataset._source.assetProcessingStatus === "Refined Data"
                    ? "Feature Engineered und aggregierte Daten. Optimierte und zusammengefasste Datensätze für KI-Training"
                    : dataset._source.assetProcessingStatus === "KI/ML Data"
                      ? "KI/ML generierte Ergebnisdatensätze"
                      : "Unbekannter Datenstatus"}
            </span>,
          )}
        >
          <span
            className={`asset-processing-status ${
              dataset._source.assetProcessingStatus === "Original Data"
                ? "danger"
                : dataset._source.assetProcessingStatus === "Processed Data"
                  ? "warning"
                  : dataset._source.assetProcessingStatus === "Refined Data"
                    ? "success"
                    : "primary"
            }`}
          >
            {dataset._source.assetProcessingStatus}
          </span>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default QualityMetrics;
