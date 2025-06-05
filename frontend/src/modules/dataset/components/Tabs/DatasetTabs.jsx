import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AttributeList from "./AttributeList";
import TemporalConsistency from "./TemporalConsistency";
import NumericValueDistribution from "./NumericValueDistribution";
import StringValueDistribution from "./StringValueDistribution";
import NumericCorrelationAnalysis from "./NumericCorrelationAnalysis";
import NumericOutlierAnalysis from "./NumericOutlierAnalysis";
import DataSeasonality from "./DataSeasonality";
import AttributeIntegrity from "./AttributeIntegrity";
import EmbeddedImages from "./EmbeddedImages";
import EmbeddedTables from "./EmbeddedTables";
import styles from "../../layouts/Details.module.css";
import Document from "./Document";
import { useTranslation } from "react-i18next";
import Schema from "./Schema";
import UnstructuredText from "./UnstructuredText";
import DatasetStructure from "../DatasetStructure/DatasetStructure";
import { datasetHasChildren, resolveDataset } from "../../utils/edp_utils";
import { Image } from "./Image";
import { Video } from "./Video";
import { Audio } from "./Audio";

const DatasetTabs = ({ edp, datasetRef }) => {
  const doesDatasetHaveChildren = datasetHasChildren(edp, datasetRef);
  const isDocumentDataset = datasetRef.includes("#/documentDatasets");
  const isStructuredDataset = datasetRef.includes("#/structuredDatasets");
  const isArchiveDataset = datasetRef.includes("#/archiveDatasets");
  const isSemiStructuredDataset = datasetRef.includes(
    "#/semiStructuredDatasets",
  );
  const isVideoDataset = datasetRef.includes("#/videoDatasets");
  const isAudioDataset = datasetRef.includes("#/audioDatasets");
  const isUnstructuredDataset = datasetRef.includes(
    "#/unstructuredTextDatasets",
  );
  const isImageDataset = datasetRef.includes("#/imageDatasets");

  const getDefaultActiveKey = () => {
    if (doesDatasetHaveChildren) {
      return "structure"; // Default to "structure" if the dataset has children
    }

    // If no children, select the first tab for the dataset type
    if (isDocumentDataset) return "document";
    if (isStructuredDataset) return "attribute_list";
    if (isUnstructuredDataset) return "unstructured_text";
    if (isImageDataset) return "image";
    if (isVideoDataset) return "video";
    if (isAudioDataset) return "audio";

    return "structure";
  };

  const [activeKey, setActiveKey] = useState(getDefaultActiveKey);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dataset = resolveDataset(edp, datasetRef);

  const tabs = [
    ...(doesDatasetHaveChildren
      ? [
          {
            eventKey: "structure",
            title: "ASSET STRUCTURE",
            component: <DatasetStructure edp={edp} datasetRef={datasetRef} />,
          },
        ]
      : []),
    ...(isDocumentDataset
      ? [
          {
            eventKey: "document",
            title: "Document",
            component: <Document edp={edp} datasetRef={datasetRef} />,
          },
          {
            eventKey: "embedded_tables",
            title: t("dataset.tabs.embeddedTables"),
            component: <EmbeddedTables edp={edp} />,
          },
          {
            eventKey: "embedded_images",
            title: t("dataset.tabs.embeddedImages"),
            component: <EmbeddedImages edp={edp} datasetRef={datasetRef} />,
          },
        ]
      : []),
    ...(isStructuredDataset
      ? [
          {
            eventKey: "attribute_list",
            title: t("dataset.tabs.attributeList"),
            component: <AttributeList dataset={dataset} />,
          },
          {
            eventKey: "temporal_consistency",
            title: t("dataset.tabs.temporalConsistency"),
            component: <TemporalConsistency edp={edp} />,
          },
          {
            eventKey: "numeric_value_distribution",
            title: t("dataset.tabs.numericValueDistribution"),
            component: <NumericValueDistribution edp={edp} />,
          },
          {
            eventKey: "string_value_distribution",
            title: t("dataset.tabs.stringValueDistribution"),
            component: <StringValueDistribution edp={edp} />,
          },
          {
            eventKey: "numeric_correlation_analysis",
            title: t("dataset.tabs.numericCorrelationAnalysis"),
            component: <NumericCorrelationAnalysis edp={edp} />,
          },
          {
            eventKey: "numeric_outlier_analysis",
            title: t("dataset.tabs.numericOutlierAnalysis"),
            component: <NumericOutlierAnalysis edp={edp} />,
          },
          {
            eventKey: "attribute_integrity",
            title: t("dataset.tabs.attributeIntegrity"),
            component: <AttributeIntegrity edp={edp} />,
          },
          {
            eventKey: "data_seasonality",
            title: t("dataset.tabs.dataSeasonality"),
            component: <DataSeasonality edp={edp} />,
          },
        ]
      : []),
    ...(isSemiStructuredDataset
      ? [
          {
            eventKey: "schema",
            title: "Schema",
            component: <Schema dataset={dataset} />,
          },
        ]
      : []),
    ...(isUnstructuredDataset
      ? [
          {
            eventKey: "unstructured_text",
            title: "Unstructured Text",
            component: <UnstructuredText dataset={dataset} />,
          },
          {
            eventKey: "embedded_tables",
            title: t("dataset.tabs.embeddedTables"),
            component: <EmbeddedTables edp={edp} />,
          },
        ]
      : []),
    ...(isImageDataset
      ? [
          {
            eventKey: "image",
            title: "Image",
            component: <Image edp={edp} datasetRef={datasetRef} />,
          },
        ]
      : []),
    ...(isVideoDataset
      ? [
          {
            eventKey: "video",
            title: "Video",
            component: <Video dataset={dataset} />,
          },
        ]
      : []),
    ...(isAudioDataset
      ? [
          {
            eventKey: "audio",
            title: "Audio",
            component: <Audio dataset={dataset} edp={edp} />,
          },
        ]
      : []),
  ];

  useEffect(() => {
    if (location.hash) {
      setActiveKey(location.hash.replace("#", ""));
    }
  }, [location]);

  const toggleTab = (key) => {
    setActiveKey(key);
    navigate(`#${key}`, { replace: true });
  };

  return (
    <>
      <Tabs
        activeKey={activeKey}
        id={styles.datasetAttributeTabs}
        onSelect={(k) => toggleTab(k)}
        className="dataset-attribute-tabs mb-3"
      >
        {tabs.map(({ eventKey, title, component }) => (
          <Tab
            key={eventKey}
            eventKey={eventKey}
            title={<span className="small text-uppercase">{title}</span>}
            className={styles.tab}
          >
            {component}
          </Tab>
        ))}
      </Tabs>

      {isArchiveDataset && !doesDatasetHaveChildren && (
        <div className="mt-3">
          <p className="text-muted text-center mt-5">
            {t("dataset.noSupportedType")}
          </p>
        </div>
      )}
    </>
  );
};

export default DatasetTabs;
