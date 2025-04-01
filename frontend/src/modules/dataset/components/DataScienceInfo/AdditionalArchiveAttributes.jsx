import { useTranslation } from "react-i18next";

const AdditionalArchiveAttributes = ({ datasetDetails }) => {

    const { t } = useTranslation();

    return (
        <>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">{t("dataset.compression")}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">{datasetDetails?._source?.compression ?? "None"}</p>
            </div>
            <div className="col-6">
                <p className="small mb-1 fw-500 text-uppercase">Uncompressed volume</p>
            </div>
            <div className="col-6">
                <p className="small mb-1">TBA</p>
            </div>
        </>
    );
}

export default AdditionalArchiveAttributes;
