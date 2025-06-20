import EDPActions from "./EDPActions";
import QualityMetrics from "../../search/components/Results/QualityMetrics";
import moment from "moment";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { useState } from "react";
import { stripHtmlTags, truncateString } from "../../common/utils/format_utils";
import { useTranslation } from "react-i18next";

const EDPInfoSection = ({ edp, datasetRef, dataset }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { t } = useTranslation();
  const name = stripHtmlTags(edp?._source?.name);
  const description = stripHtmlTags(edp?._source?.description);

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex">
          <h2 className="bold d-block pe-3 mb-0" style={{ maxWidth: 600 }}>
            {name}
          </h2>
          <div className="pt-2">
            <QualityMetrics
              edp={edp}
              datasetRef={datasetRef}
              dataset={dataset}
            />
          </div>
        </div>
        <EDPActions edp={edp} datasetRef={datasetRef} dataset={dataset} />
      </div>

      <div>
        <p className="mt-3 mb-2">
          {isDescriptionExpanded
            ? description
            : truncateString(description, 450)}
        </p>
        {description?.length > 450 && (
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
          href={
            edp._source?.assetRefs?.[0]?.dataSpace?.url?.startsWith("http")
              ? edp._source.assetRefs[0].dataSpace.url
              : `https://${edp._source.assetRefs[0].dataSpace.url}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="small txt-primary pe-3"
        >
          {edp._source?.assetRefs?.[0]?.dataSpace?.name}
        </a>

        {edp._source?.assetRefs?.[0]?.publisher?.url ? (
          <a
            href={
              edp._source.assetRefs[0].publisher.url.startsWith("http")
                ? edp._source.assetRefs[0].publisher.url
                : `https://${edp._source.assetRefs[0].publisher.url}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="small txt-primary pe-3"
          >
            {edp._source?.assetRefs?.[0]?.publisher?.name}
          </a>
        ) : (
          <span className="small pe-3">
            {edp._source?.assetRefs?.[0]?.publisher?.name}
          </span>
        )}

        <a
          href={edp._source?.assetRefs?.[0]?.license?.url}
          target="_blank"
          className="small txt-primary pe-3"
        >
          {edp._source?.assetRefs?.[0]?.license?.name}
        </a>

        <span className="small pe-3">
          {t("dataset.version")}{" "}
          {(parseInt(edp._source?.assetRefs?.[0]?.assetVersion) ?? 1).toFixed(
            1,
          )}
        </span>

        <span className="small pe-3">
          {t("dataset.edpVersion")} {(parseInt(edp._version) ?? 1).toFixed(1)}
        </span>

        <span className="small pe-3">
          {t("dataset.assetUploaded")} &nbsp;
          {new Date(
            edp._source?.assetRefs?.[0]?.publishDate,
          ).toLocaleDateString()}
          &nbsp; ({moment(edp._source?.assetRefs?.[0]?.publishDate).fromNow()})
        </span>
      </div>
    </>
  );
};

export default EDPInfoSection;
