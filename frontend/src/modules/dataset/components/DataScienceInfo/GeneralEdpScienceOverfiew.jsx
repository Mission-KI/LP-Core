import React from 'react';
import { getEdpLanguagesList } from '../../utils/edp_utils';
import { filesize } from 'filesize';
import { calculateDataTypesAttribute } from '../../utils/calculations';
import { useTranslation } from 'react-i18next';

const GeneralEdpScienceOverfiew = ({ datasetDetails }) => {

    const { t } = useTranslation();

    return (
        <>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.structure")}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">Text (CSV)</p>
            </div>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.volume")}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">{filesize(datasetDetails?._source?.volume)}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.compression")}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">{datasetDetails?._source?.compression ?? "None"}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.languages")}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">{getEdpLanguagesList(datasetDetails)}</p>
            </div>
            <div className="col-6 mt-3">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.transferType")}</p>
            </div>
            <div className="col-6 mt-3">
                <p className="small mb-1">{datasetDetails?._source?.transferTypeFlag ?? "unknown"}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.immutability")}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">{datasetDetails?._source?.immutabilityFlag ?? "unknown"}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.dataTypes")}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">{calculateDataTypesAttribute(datasetDetails)}</p>
            </div>
        </>
    );
}

export default GeneralEdpScienceOverfiew;
