import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

const AdditionalArchiveAttributes = ({ dataset, edp }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.compression")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">{dataset?.algorithm}</p>
      </div>
      <div className="col-6">
        <p className="small mb-1 fw-500 text-uppercase">
          {t("dataset.uncompressedVolume")}
        </p>
      </div>
      <div className="col-6">
        <p className="small mb-1">{filesize(dataset?.extractedSize)}</p>
      </div>
    </>
  );
};

export default AdditionalArchiveAttributes;
