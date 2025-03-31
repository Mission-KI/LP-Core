import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { getDataset } from "../../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import PageNotFound from "../../../common/pages/PageNotFound";
import { useTranslation } from "react-i18next";
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
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "../../layouts/Details.module.css";
import Structure from "../../components/Tabs/Structure";
import QualityMetrics from "../../../search_engine/components/Results/QualityMetrics";
import DataScienceInfo from "../../components/DataScienceInfo/DataScienceInfo";
import DatasetActions from "../../components/DatasetActions";
import { ArrowLeft, ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { truncateString } from "../../../common/utils/format_utils";
import moment from "moment";

function Details() {
  const { id } = useParams();
  const [datasetDetails, setDatasetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState("structure");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);


  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const fetchedDataset = await getDataset(id);
        setDatasetDetails(fetchedDataset);
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, [id]);

  useEffect(() => {
    if (location.hash) {
      setActiveKey(location.hash.replace("#", ""));
    }
  }, [location.hash]);

  const toggleTab = (key) => {
    setActiveKey(key);
    navigate(`#${key}`, { replace: true });
  }

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner variant="dark" />
      </div>
    );
  }

  if (!datasetDetails) {
    return <PageNotFound />;
  }
  return (
    <>

      <span onClick={() => navigate(-1)} className="pointer d-flex align-items-center txt-lighter medium mt-4 pb-2"><ArrowLeft className="me-2" /> {t('header.return')}</span>
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex">
          <h2 className="bold d-block pe-3 mb-0" style={{ maxWidth: 600 }}>{datasetDetails?._source?.name}</h2>
          <div className="pt-2">
            <QualityMetrics dataset={datasetDetails} />
          </div>
        </div>
        <DatasetActions datasetDetails={datasetDetails} />
      </div>

      <div>
        <p className="txt-lighter mt-3 mb-2">
          {isDescriptionExpanded ? datasetDetails?._source?.description : truncateString(datasetDetails?._source?.description, 450)}
        </p>
        {datasetDetails?._source?.description?.length > 450 && (
          <button className="btn btn-link txt-lighter medium p-0" onClick={toggleDescriptionExpanded}>
            {isDescriptionExpanded ? "Show Less" : "Show More"} {isDescriptionExpanded ? <ChevronUp className="ms-1" /> : <ChevronDown className="ms-1" />}
          </button>
        )}
      </div>

      <div
        className="d-flex mt-4 flex-wrap"
      >
        <a
          href={datasetDetails._source?.dataSpace?.url}
          target="_blank"
          className="small text-decoration-underline txt-primary pe-3"
        >
          {datasetDetails._source?.assetRefs?.[0]?.dataSpace?.name}
        </a>

        <a
          href={`https://${datasetDetails._source?.assetRefs?.[0]?.publisher?.url}`}
          target="_blank"
          rel='noopener noreferrer'
          className="small text-decoration-underline txt-primary pe-3"
        >
          {datasetDetails._source?.assetRefs?.[0]?.publisher?.name}
        </a>

        <a
          href={datasetDetails._source?.assetRefs?.[0]?.publisher?.url}
          target="_blank"
          className="small text-decoration-underline txt-primary pe-3"
        >
          {datasetDetails._source?.assetRefs?.[0]?.license?.name}
        </a>

        <span className="small pe-3">
          {t("dataset.version")} {(parseInt(datasetDetails._source?.assetRefs?.[0]?.assetVersion) ?? 1).toFixed(1)}
        </span>
        <span className="small pe-3">
          {t('dataset.assetUploaded')}
          {new Date(datasetDetails._source?.assetRefs?.[0]?.publishDate).toLocaleDateString()}
          &nbsp; ({moment(datasetDetails._source?.assetRefs?.[0]?.publishDate).fromNow()})
        </span>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="border-lighter shadow rounded bgc-body p-3 mt-4">
            <p className="bold h5 mb-3 pb-4">{t("dataset.dataScienceInfo")}</p>
            <DataScienceInfo datasetDetails={datasetDetails} />
          </div>
          {datasetDetails?._source?.tags?.length > 0 && (
            <div className="d-flex align-items-center flex-wrap mt-5">
              {datasetDetails._source.tags.map((tag) => (
                <span
                  className="py-2 px-3 bgc-primary text-white small rounded-lg me-3 mb-3"
                  key={tag}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {truncateString(tag, 14)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-8">
          <Tabs
            activeKey={activeKey}
            id={styles.datasetAttributeTabs}
            onSelect={(k) => toggleTab(k)}
            className="dataset-attribute-tabs mb-3"
          >
            <Tab
              eventKey="structure"
              title={
                <span className="small text-uppercase">
                  ASSET STRUCTURE
                </span>
              }
              className={styles.tab}
            >
              <Structure datasetDetails={datasetDetails} />
            </Tab>
            {/* <Tab
            eventKey="attributes"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.attributeList')}
              </span>
            }
            className={styles.tab}
          >
            <AttributeList datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="embedded_tables"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.embeddedTables')}
              </span>
            }
            className={styles.tab}
          >
            <EmbeddedTables datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="embedded_images"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.embeddedImages')}
              </span>
            }
            className={styles.tab}
          >
            <EmbeddedImages datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="attribute_consistency"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.attributeIntegrity')}
              </span>
            }
            className={styles.tab}
          >
            <AttributeIntegrity datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="temporal_consistency"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.temporalConsistency')}
              </span>
            }
            className={styles.tab}
          >
            <TemporalConsistency datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="numeric_value_distribution"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.numericValueDistribution')}
              </span>
            }
            className={styles.tab}
          >
            <NumericValueDistribution datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="string_value_distribution"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.stringValueDistribution')}
              </span>
            }
            className={styles.tab}
          >
            <StringValueDistribution datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="correlation_analysis"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.numericCorrelationAnalysis')}
              </span>
            }
            className={styles.tab}
          >
            <NumericCorrelationAnalysis datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="anomaly_analysis"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.numericOutlierAnalysis')}
              </span>
            }
            className={styles.tab}
          >
            <NumericOutlierAnalysis datasetDetails={datasetDetails} />
          </Tab>
          <Tab
            eventKey="data_seasonality"
            title={
              <span className="small text-uppercase">
                {t('dataset.tabs.dataSeasonality')}
              </span>
            }
            className={styles.tab}
          >
            <DataSeasonality datasetDetails={datasetDetails} />
          </Tab> */}
          </Tabs>
        </div>
      </div>

    </>
  );
}

export default Details;
