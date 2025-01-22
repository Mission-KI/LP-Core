import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./Details.module.css";
import { useNavigate, useParams } from "react-router";
import { getDataset } from "../../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import AttributeList from "../../components/AttributeList";
import AttributeConsistency from "../../components/AttributeConsistency";
import TemporalConsistency from "../../components/TemporalConsistency";
import { useTranslation } from "react-i18next";
import NumericValueDistribution from "../../components/NumericValueDistribution";
import StringValueDistribution from "../../components/StringValueDistribution";
import NumericCorrelationAnalysis from "../../components/NumericCorrelationAnalysis";
import NumericAnomalyAnalysis from "../../components/NumericAnomalyAnalysis";
import DataSeasonality from "../../components/DataSeasonality";
import PageNotFound from "../../../common/pages/PageNotFound";
import QualityMetrics from "../../../search_engine/components/Results/QualityMetrics";
import DataScienceInfo from "../../components/DataScienceInfo";
import DatasetActions from "../../components/DatasetActions";
import { truncateString } from "../../../common/utils/format_utils";
import { ArrowLeft } from "react-bootstrap-icons";

function Details() {
  const { id } = useParams();
  const [datasetDetails, setDatasetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState("attributes");
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const handleToggleTab = (item) => {
    setActiveKey(item);
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
      <div className="container px-3 pb-5">
        <span onClick={() => navigate(-1)} className="pointer d-flex align-items-center txt-lighter medium pb-2"><ArrowLeft className="me-2" /> {t('header.return')}</span>
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex">
            <h3 className="bold d-block pe-3 mb-0" style={{ maxWidth: 600 }}>{datasetDetails?._source?.name}</h3>
            <div className="pt-2">
              <QualityMetrics dataset={datasetDetails} />
            </div>
          </div>
          <DatasetActions datasetDetails={datasetDetails} />
        </div>

        <p className="txt-lighter mt-3 mb-5">
          {truncateString(datasetDetails?._source?.description, 450)}
        </p>

        <div
          className="d-flex mt-4 flex-wrap"
        >
          <a
            href={datasetDetails._source?.dataSpace?.url}
            target="_blank"
            className="small text-decoration-underline txt-primary pe-3"
          >
            {datasetDetails._source?.dataSpace?.name}
          </a>

          <a
            href={`https://${datasetDetails._source?.publisher?.url}`}
            target="_blank"
            rel='noopener noreferrer'
            className="small text-decoration-underline txt-primary pe-3"
          >
            {datasetDetails._source?.publisher?.name}
          </a>

          <a
            href={datasetDetails._source?.license?.url}
            target="_blank"
            className="small text-decoration-underline txt-primary pe-3"
          >
            {datasetDetails?._source?.license?.name}
          </a>

          <span className="small pe-3">
            {t("dataset.version")} {(datasetDetails?._source?.version ?? 1).toFixed(1)}
          </span>
          <span className="small pe-3">
            {t('dataset.assetUploaded')} {new Date(datasetDetails?._source?.publishDate).toLocaleDateString()} ({moment(datasetDetails?._source?.publishDate).fromNow()})
          </span>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="border-lighter shadow rounded bgc-body p-3 mt-4">
              <p className="fw-500 mb-4">{t("dataset.dataScienceInfo")}</p>
              <DataScienceInfo datasetDetails={datasetDetails} />
            </div>
            {datasetDetails?._source?.tags?.length > 0 && (
              <div className="d-flex align-items-center mt-4">
                <span className="small pe-3">{t("dataset.tags")}</span>
                {datasetDetails._source.tags.map((tag) => (
                  <button
                    className="btn btn-basic border small rounded-lg me-3"
                    key={tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-8">
            <Tabs
              activeKey={activeKey}
              id={styles.datasetAttributeTabs}
              onSelect={(k) => setActiveKey(k)}
              className="dataset-attribute-tabs mb-3"
            >
              <Tab
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
                eventKey="attribute_consistency"
                title={
                  <span className="small text-uppercase">
                    {t('dataset.tabs.attributeConsistency')}
                  </span>
                }
                className={styles.tab}
              >
                <AttributeConsistency datasetDetails={datasetDetails} />
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
                    {t('dataset.tabs.numericAnomalyAnalysis')}
                  </span>
                }
                className={styles.tab}
              >
                <NumericAnomalyAnalysis datasetDetails={datasetDetails} />
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
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
