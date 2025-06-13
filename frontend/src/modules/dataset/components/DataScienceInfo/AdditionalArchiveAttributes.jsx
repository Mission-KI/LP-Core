import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

const AdditionalArchiveAttributes = ({ dataset }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="col-6">
        <p className="small lh-sm pb-2 text-uppercase">
          {t("dataset.compression")}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2">{dataset?.algorithm}</p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2 text-uppercase">
          {t("dataset.uncompressedVolume")}
        </p>
      </div>
      <div className="col-6">
        <p className="small lh-sm pb-2">
          {typeof dataset?.extractedSize === "number" &&
          !isNaN(dataset.extractedSize)
            ? filesize(dataset.extractedSize)
            : "Unknown size"}
        </p>
      </div>
    </>
  );
};

export default AdditionalArchiveAttributes;
