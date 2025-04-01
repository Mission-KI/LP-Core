import { useState, useEffect } from "react";
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
import Image from "./Image";
import DatasetStructure from "../DatasetStructure/DatasetStructure";
import { useNavigate } from "react-router";

const DatasetTabs = ({ datasetDetails, datasetRef }) => {

    const [activeKey, setActiveKey] = useState("structure");
    const datasetTree = datasetDetails?._source?.datasetTree;

    const isDocumentDataset = datasetTree[0]?.dataset?.$ref === "#/documentDatasets/0";
    const isStructuredDataset = datasetTree[0]?.dataset?.$ref === "#/structuredDatasets/0";
    const isUnstructuredDataset = datasetTree[0]?.dataset?.$ref === "#/unstructuredTextDatasets/0";
    const isImageDataset = datasetTree[0]?.dataset?.$ref === "#/imageDatasets/0";

    const { t } = useTranslation();
    const navigate = useNavigate();

    const tabs = [
        {
            eventKey: "structure",
            title: "ASSET STRUCTURE",
            component: <DatasetStructure
                datasetDetails={datasetDetails}
                datasetRef={datasetRef}
            />,
        },
        ...(
            isDocumentDataset
                ? [
                    {
                        eventKey: "document",
                        title: "Document",
                        component: <Document datasetDetails={datasetDetails} />,
                    },
                    {
                        eventKey: "embedded_tables",
                        title: t("dataset.tabs.embeddedTables"),
                        component: <EmbeddedTables datasetDetails={datasetDetails} />,
                    },
                    {
                        eventKey: "embedded_images",
                        title: t("dataset.tabs.embeddedImages"),
                        component: <EmbeddedImages
                            datasetDetails={datasetDetails}
                            datasetRef={datasetRef}
                        />,
                    },
                ] : []
        ),
        ...(
            isStructuredDataset
                ? [
                    {
                        eventKey: "schema",
                        title: "Schema",
                        component: <Schema datasetDetails={datasetDetails} />,
                    },
                ] : []
        ),
        ...(
            isUnstructuredDataset
                ? [
                    {
                        eventKey: "unstructured_text",
                        title: "Unstructured Text",
                        component: <UnstructuredText datasetDetails={datasetDetails} />,
                    },
                    {
                        eventKey: "embedded_tables",
                        title: t("dataset.tabs.embeddedTables"),
                        component: <EmbeddedTables datasetDetails={datasetDetails} />,
                    },
                ] : []
        ),
        ...(
            isImageDataset
                ? [
                    {
                        eventKey: "image",
                        title: "Image",
                        component: <Image datasetDetails={datasetDetails} />,
                    },
                ] : []
        )
    ]

    useEffect(() => {
        if (location.hash) {
            setActiveKey(location.hash.replace("#", ""));
        }
    }, [location.hash]);

    const toggleTab = (key) => {
        setActiveKey(key);
        navigate(`#${key}`, { replace: true });
    }

    return (
        <Tabs
            activeKey={activeKey}
            id={styles.datasetAttributeTabs}
            onSelect={(k) => toggleTab(k)}
            className="dataset-attribute-tabs mb-3"
        >
            {tabs.map(({ eventKey, title, component }) => (
                <Tab key={eventKey} eventKey={eventKey} title={<span className="small text-uppercase">{title}</span>} className={styles.tab}>
                    {component}
                </Tab>
            ))}
        </Tabs>
    );
}

export default DatasetTabs;
