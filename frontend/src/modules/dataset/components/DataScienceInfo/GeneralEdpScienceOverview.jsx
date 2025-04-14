import React from "react";
import { getEdpLanguagesList } from "../../utils/edp_utils";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

const GeneralEdpScienceOverview = ({ datasetTreeItem, edp }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.structure")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {edp?._source?.dataTypes?.join(", ")}
          &nbsp; (
          {edp?._source?.datasetTree[0]?.fileProperties?.fileType?.toUpperCase()}
          )
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.dataFormat")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">{datasetTreeItem?.datasetType}</p>
      </div>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.fileType")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {datasetTreeItem?.fileProperties?.fileType}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.volume")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">{filesize(edp?._source?.volume)}</p>
      </div>

      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.languages")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">{getEdpLanguagesList(edp)}</p>
      </div>
      <div className="col-6 mt-3">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.transferType")}
        </p>
      </div>
      <div className="col-6 mt-3">
        <p className="small mb-1">
          {edp?._source?.transferTypeFlag ?? "unknown"}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.immutability")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">
          {edp?._source?.immutabilityFlag ?? "unknown"}
        </p>
      </div>
    </>
  );
};

export default GeneralEdpScienceOverview;
