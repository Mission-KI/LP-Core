import ImageView from "../../../common/components/ImageView/ImageView";
import { imageBasePath } from "../../../common/api/config";

function NumericCorrelationAnalysis({ edp }) {
  const correlationGraphUrl =
    edp?._source?.structuredDatasets[0]?.correlationGraph;

  return (
    <>
      {correlationGraphUrl ? (
        <ImageView url={imageBasePath + edp?._id + "/" + correlationGraphUrl} />
      ) : (
        ""
      )}
    </>
  );
}

export default NumericCorrelationAnalysis;
