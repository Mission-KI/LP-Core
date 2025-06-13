import ImageView from "../../../common/components/ImageView/ImageView";
import { imageBasePath } from "../../../common/api/config";

function NumericCorrelationAnalysis({ dataset, edp }) {
  const correlationGraphUrl = dataset?.correlationGraph;

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
