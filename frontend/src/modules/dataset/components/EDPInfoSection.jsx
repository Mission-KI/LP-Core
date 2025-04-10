import DatasetActions from "./DatasetActions";
import QualityMetrics from "../../search/components/Results/QualityMetrics";
import moment from "moment";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { useState } from "react";
import { truncateString } from "../../common/utils/format_utils";
import { useTranslation } from "react-i18next";

const EDPInfoSection = ({ datasetDetails }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { t } = useTranslation();

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex">
          <h2 className="bold d-block pe-3 mb-0" style={{ maxWidth: 600 }}>
            {datasetDetails?._source?.name}
          </h2>
          <div className="pt-2">
            <QualityMetrics dataset={datasetDetails} />
          </div>
        </div>
        <DatasetActions datasetDetails={datasetDetails} />
      </div>

      <div>
        <p className="txt-lighter mt-3 mb-2">
          {isDescriptionExpanded
            ? datasetDetails?._source?.description
            : truncateString(datasetDetails?._source?.description, 450)}
        </p>
        {datasetDetails?._source?.description?.length > 450 && (
          <button
            className="btn btn-link txt-lighter medium p-0"
            onClick={toggleDescriptionExpanded}
          >
            {isDescriptionExpanded ? "Show Less" : "Show More"}{" "}
            {isDescriptionExpanded ? (
              <ChevronUp className="ms-1" />
            ) : (
              <ChevronDown className="ms-1" />
            )}
          </button>
        )}
      </div>

      <div className="d-flex mt-4 flex-wrap">
        <a
          href={datasetDetails._source?.dataSpace?.url}
          target="_blank"
          className="small text-decoration-underline txt-primary pe-3"
        >
          {datasetDetails._source?.assetRefs?.[0]?.dataSpace?.name}
        </a>

        <a
          href={`https://${datasetDetails._source?.assetRefs?.[0]?.publisher?.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="small text-decoration-underline txt-primary pe-3"
        >
          {datasetDetails._source?.assetRefs?.[0]?.publisher?.name}
        </a>

        <a
          href={datasetDetails._source?.assetRefs?.[0]?.publisher?.url}
          target="_blank"
          className="small text-decoration-underline txt-primary pe-3"
        >
          {datasetDetails._source?.assetRefs?.[0]?.license?.name}
        </a>

        <span className="small pe-3">
          {t("dataset.version")}{" "}
          {(
            parseInt(datasetDetails._source?.assetRefs?.[0]?.assetVersion) ?? 1
          ).toFixed(1)}
        </span>

        <span className="small pe-3">
          {t("dataset.edpVersion")}{" "}
          {(parseInt(datasetDetails._version) ?? 1).toFixed(1)}
        </span>

        <span className="small pe-3">
          {t("dataset.assetUploaded")} &nbsp;
          {new Date(
            datasetDetails._source?.assetRefs?.[0]?.publishDate,
          ).toLocaleDateString()}
          &nbsp; (
          {moment(
            datasetDetails._source?.assetRefs?.[0]?.publishDate,
          ).fromNow()}
          )
        </span>
      </div>
    </>
  );
};

export default EDPInfoSection;
