import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

const AdditionalArchiveAttributes = ({ dataset, edp }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-6 pb-0">
        <p className="small mb-0 lh-2 text-uppercase">
          {t("dataset.compression")}
        </p>
      </div>
      <div className="col-6 pb-0">
        <p className="small mb-0 lh-2">{dataset?.algorithm}</p>
      </div>
      <div className="col-6 pb-0">
        <p className="small mb-0 lh-2 text-uppercase">
          {t("dataset.uncompressedVolume")}
        </p>
      </div>
      <div className="col-6 pb-0">
        <p className="small mb-0 lh-2">{filesize(dataset?.extractedSize)}</p>
      </div>
    </>
  );
};

export default AdditionalArchiveAttributes;
