import React, { useEffect, useState } from "react";
import Header from "../../../common/components/Header/Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./Details.module.css";
import { useParams } from "react-router";
import { getDataset } from "../../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import AttributeList from "../../components/AttributeList";
import AttributeConsistency from "../../components/AttributeConsistency";
import TemporalConsistency from "../../components/TemporalConsistency";
import { useTranslation } from "react-i18next";
import { filesize } from "filesize";
import NumericValueDistribution from "../../components/NumericValueDistribution";
import StringValueDistribution from "../../components/StringValueDistribution";
import NumericCorrelationAnalysis from "../../components/NumericCorrelationAnalysis";
import NumericAnomalyAnalysis from "../../components/NumericAnomalyAnalysis";
import DataSeasonality from "../../components/DataSeasonality";
import PageNotFound from "../../../common/pages/PageNotFound";

function Details() {
  const { id } = useParams();
  const [datasetDetails, setDatasetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState("attributes");

  const { t } = useTranslation();

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
        <Spinner variant="primary" />
      </div>
    );
  }

  if (!datasetDetails) {
    return <PageNotFound />;
  }

  return (
    <>
      <Header datasetDetails={datasetDetails} />
      <div className="container px-3 pt-5">
        <h4 className="bold mt-5">{datasetDetails?._source?.name}</h4>
        <p className="text-muted mt-3 mb-5">
          {datasetDetails?._source?.description}
        </p>

        <div
          className="d-flex justify-content-between mt-4 flex-wrap"
          style={{ maxWidth: 570 }}
        >
          <a
            href={datasetDetails._source?.dataSpace?.url}
            target="_blank"
            className="small text-decoration-underline me-2"
          >
            {datasetDetails._source?.dataSpace?.name}
          </a>

          <a
            href={`https://${datasetDetails._source?.publisher?.name}`}
            target="_blank"
            rel='noopener noreferrer'
            className="small text-decoration-underline me-2"
          >
            {datasetDetails._source?.publisher?.name}
          </a>

          <a
            href={datasetDetails._source?.licenseId}
            target="_blank"
            className="small text-decoration-underline me-2"
          >
            {datasetDetails?._source?.licenseId?.replace(
              "http://dcat-ap.de/def/licenses/",
              ""
            )}
          </a>

          <span className="small me-2">
            {t("dataset.version")} {(datasetDetails?._source?.version ?? 1).toFixed(1)}
          </span>
          <span className="small me-2">
            {t('dataset.assetUploaded')} {moment(datasetDetails?._source?.publishDate).fromNow()}
          </span>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="rounded-lg border bg-white p-3 mt-2">
              <p className="medium bold">{t("dataset.dataScienceInfo")}</p>
              <hr />
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.structure")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.volume")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.compression")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.transferType")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.immutability")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.growth")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.growthRate")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.temporalCover")}
                  </p>
                  <p
                    className="small mb-1 text-uppercase"
                    role={"button"}
                    onClick={() => handleToggleTab("temporal_consistency")}
                  >
                    {t("dataset.temporalConsistency")}
                  </p>
                  <br />
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.noOfColumns")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.noOfLines")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.dataTypes")}
                  </p>
                  <p
                    className="small mb-1 text-uppercase"
                    role={"button"}
                    onClick={() => handleToggleTab("attribute_consistency")}
                  >
                    {t("dataset.attributeConsistency")}
                  </p>
                  <p className="small mb-1 text-uppercase">
                    {t("dataset.languages")}
                  </p>
                  <p
                    className="small mb-1 text-uppercase"
                    role={"button"}
                    onClick={() =>
                      handleToggleTab("numeric_value_distribution")
                    }
                  >
                    {t("dataset.numericValueDistribution")}
                  </p>
                  <p
                    className="small mb-1 text-uppercase"
                    role={"button"}
                    onClick={() => handleToggleTab("string_value_distribution")}
                  >
                    {t("dataset.stringValueDistribution")}
                  </p>
                  <p
                    className="small mb-1 text-uppercase"
                    role={"button"}
                    onClick={() => handleToggleTab("correlation_analysis")}
                  >
                    {t("dataset.numericCorrelationAnalysis")}
                  </p>
                  <p
                    className="small mb-1 text-uppercase"
                    role={"button"}
                    onClick={() => handleToggleTab("anomaly_analysis")}
                  >
                    {t("dataset.numericAnomalyAnalysis")}
                  </p>
                  <p
                    className="small mb-1 text-uppercase"
                    role={"button"}
                    onClick={() => handleToggleTab("data_seasonality")}
                  >
                    {t("dataset.dataSeasonality")}
                  </p>
                </div>
                <div>
                  <p className="small mb-1">Text (CSV)</p>
                  <p className="small mb-1">
                    {filesize(datasetDetails?._source?.volume)}
                  </p>
                  <p className="small mb-1">zip</p>
                  <p className="small mb-1">
                    {datasetDetails?._source?.transferTypeFlag ?? "unknown"}
                  </p>
                  <p className="small mb-1">
                    {datasetDetails?._source?.immutabilityFlag ?? "unknown"}
                  </p>
                  <p className="small mb-1">
                    {datasetDetails?._source?.growthFlag ?? "unknown"}
                  </p>
                  <p className="small mb-1">unknown</p>
                  <p className="small mb-1">unknown</p>
                  <p className="small mb-1">unknown</p>

                  <br />
                  <p className="small mb-1">
                    {datasetDetails?._source?.structuredDatasets?.[0]
                      ?.columnCount ?? "unknown"}
                  </p>
                  <p className="small mb-1">
                    {datasetDetails?._source?.structuredDatasets[0]?.rowCount ??
                      "unknown"}
                  </p>
                  <p className="small mb-1">
                    {datasetDetails?._source?.dataTypes.map(
                      (dataType, index, arr) => (
                        <span key={index}>
                          {dataType}
                          {index < arr.length - 1 && ", "}
                        </span>
                      )
                    )}
                  </p>
                  <p className="small mb-1">partially inconsistent</p>
                  <p className="small mb-1">german, english</p>
                  <p className="small mb-1">heterogen</p>
                  <p className="small mb-1">heterogen</p>
                  <p className="small mb-1">partial correlation</p>
                  <p className="small mb-1">anomaly exists</p>
                  <p className="small mb-1">seasonal, no trend</p>
                </div>
              </div>
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
                  <span className="small">
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
                  <span className="small">
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
                  <span className="small">
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
                  <span className="small">
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
                  <span className="small">
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
                  <span className="small">
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
                  <span className="small">
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
                  <span className="small">
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
