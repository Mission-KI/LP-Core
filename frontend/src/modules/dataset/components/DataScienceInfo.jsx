import React from 'react';
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";
import { calculateAttributeConsistency, calculateDataTypesAttribute, calculateTemporalCover, getStringValueDistributionOverview, getTopNumericDistributions, getUniqueNumericDistributions } from "../utils/calculations";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router'

const DataScienceInfo = ({ datasetDetails }) => {

    const { t } = useTranslation();

    const topDistributions = getTopNumericDistributions(datasetDetails);
    const allDistributions = getUniqueNumericDistributions(datasetDetails);
    const navigate = useNavigate();
    const detailViewPath = `/details/${datasetDetails._id}`

    const scienceInfoTabNavigate = (hash) => {
        navigate(detailViewPath + '#' + hash);
    }

    return (
        <div>
            <div className="row w-100">
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.structure")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">Text (CSV)</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.volume")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">{filesize(datasetDetails?._source?.volume)}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.compression")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">{datasetDetails?._source?.compression ?? "None"}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.languages")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">german, english</p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.transferType")}</p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 fw-500">{datasetDetails?._source?.transferTypeFlag ?? "unknown"}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.immutability")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">{datasetDetails?._source?.immutabilityFlag ?? "unknown"}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.dataTypes")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">{calculateDataTypesAttribute(datasetDetails)}</p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.temporalCover")}</p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 fw-500">{calculateTemporalCover(datasetDetails)}</p>
                </div>
                <div className="col-6">
                    <p onClick={() => scienceInfoTabNavigate('temporal_consistency')}
                        className="small mb-1 txt-lighter text-uppercase pointer">
                        {t("dataset.temporalConsistency")}
                    </p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">{datasetDetails?._source?.periodicity ?? "N/A"}</p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.noOfColumns")}</p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 fw-500">
                        {datasetDetails?._source?.structuredDatasets?.[0]?.columnCount ?? "unknown"}
                    </p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.noOfLines")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">
                        {datasetDetails?._source?.structuredDatasets[0]?.rowCount ?? "unknown"}
                    </p>
                </div>
                <div className="col-6 mt-3">
                    <p
                        onClick={() => scienceInfoTabNavigate('attribute_consistency')}
                        className="small mb-1 txt-lighter text-uppercase pointer">
                        {t("dataset.attributeConsistency")}
                    </p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 fw-500">{calculateAttributeConsistency(datasetDetails)}</p>
                </div>
                <div className="col-6">
                    <p onClick={() => scienceInfoTabNavigate('numeric_value_distribution')}
                        className="small mb-1 txt-lighter text-uppercase pointer">
                        {t("dataset.numericValueDistribution")}
                    </p>
                </div>
                <div className="col-6 d-flex align-items-center">
                    <p className="small mb-1 fw-500">{topDistributions}</p>
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
                        <QuestionCircle className="ms-2 text-muted" style={{ cursor: 'pointer' }} />
                    </OverlayTrigger>
                </div>
                <div className="col-6">
                    <p
                        onClick={() => scienceInfoTabNavigate('string_value_distribution')}
                        className="small mb-1 txt-lighter text-uppercase pointer">
                        {t("dataset.stringValueDistribution")}
                    </p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">{getStringValueDistributionOverview(datasetDetails)}</p>
                </div>
                <div className="col-6">
                    <p onClick={() => scienceInfoTabNavigate('correlation_analysis')}
                        className="small mb-1 txt-lighter text-uppercase pointer">
                        {t("dataset.numericCorrelationAnalysis")}
                    </p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">partial correlation</p>
                </div>
                <div className="col-6">
                    <p
                        onClick={() => scienceInfoTabNavigate('anomaly_analysis')}
                        className="small mb-1 txt-lighter text-uppercase pointer">
                        {t("dataset.numericAnomalyAnalysis")}
                    </p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">anomaly exists</p>
                </div>
                <div className="col-6">
                    <p
                        onClick={() => scienceInfoTabNavigate('data_seasonality')}
                        className="small mb-1 txt-lighter text-uppercase pointer">
                        {t("dataset.dataSeasonality")}
                    </p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">seasonal, no trend</p>
                </div>
            </div>
        </div>
    );
}

export default DataScienceInfo;

