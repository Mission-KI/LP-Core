import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AttributeList from "../../components/Tabs/AttributeList";
import TemporalConsistency from "../../components/Tabs/TemporalConsistency";
import NumericValueDistribution from "../../components/Tabs/NumericValueDistribution";
import StringValueDistribution from "../../components/Tabs/StringValueDistribution";
import NumericCorrelationAnalysis from "../../components/Tabs/NumericCorrelationAnalysis";
import NumericOutlierAnalysis from "../../components/Tabs/NumericOutlierAnalysis";
import DataSeasonality from "../../components/Tabs/DataSeasonality";
import AttributeIntegrity from "../../components/Tabs/AttributeIntegrity";
import EmbeddedImages from "../../components/Tabs/EmbeddedImages";
import EmbeddedTables from "../../components/Tabs/EmbeddedTables";
import styles from "../../layouts/Details.module.css";
import Structure from "../../components/Tabs/Structure";
import Document from "../../components/Tabs/Document";
import { useTranslation } from "react-i18next";
import Schema from "./Schema";
import UnstructuredText from "./UnstructuredText";
import Image from "./Image";
import EdpStructure from "../EdpStructure/EdpStructure";

const RootDatasetTabs = ({ datasetDetails, datasetRef }) => {

    const [activeKey, setActiveKey] = useState("structure");
    const datasetTree = datasetDetails?._source?.datasetTree;

    const isDocumentDataset = datasetTree[0]?.dataset?.$ref === "#/documentDatasets/0";
    const isStructuredDataset = datasetTree[0]?.dataset?.$ref === "#/structuredDatasets/0";
    const isUnstructuredDataset = datasetTree[0]?.dataset?.$ref === "#/unstructuredTextDatasets/0";
    const isImageDataset = datasetTree[0]?.dataset?.$ref === "#/imageDatasets/0";

    const { t } = useTranslation();

    const tabs = [
        {
            eventKey: "structure",
            title: "ASSET STRUCTURE",
            component: <EdpStructure
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
                        component: <EmbeddedImages datasetDetails={datasetDetails} />,
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

export default RootDatasetTabs;
