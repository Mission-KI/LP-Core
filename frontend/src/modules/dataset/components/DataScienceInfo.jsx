import React from 'react';
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";
import { calculateAttributeConsistency, calculateDataTypesAttribute, calculateTemporalCover } from "../utils/calculations";

const DataScienceInfo = ({ datasetDetails }) => {

    const { t } = useTranslation();

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
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.temporalConsistency")}</p>
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
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.attributeConsistency")}</p>
                </div>
                <div className="col-6 mt-3">
                    <p className="small mb-1 fw-500">{calculateAttributeConsistency(datasetDetails)}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.numericValueDistribution")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">heterogen</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.stringValueDistribution")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">heterogen</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.numericCorrelationAnalysis")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">partial correlation</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.numericAnomalyAnalysis")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">anomaly exists</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 txt-lighter text-uppercase">{t("dataset.dataSeasonality")}</p>
                </div>
                <div className="col-6">
                    <p className="small mb-1 fw-500">seasonal, no trend</p>
                </div>
            </div>
        </div>
    );
}

export default DataScienceInfo;

