import GeneralEdpScienceOverview from "./GeneralEdpScienceOverview";
import AdditionalArchiveAttributes from "./AdditionalArchiveAttributes";
import AdditionalStructuredDataAttributes from "./AdditionalStructuredDataAttributes";
import { resolveDataset } from "../../utils/edp_utils";

const DataScienceInfo = ({ edp, datasetRef }) => {
  const datasetTreeItem = edp?._source?.datasetTree?.find(
    (item) => item.dataset.$ref === datasetRef,
  );
  const dataset = resolveDataset(edp, datasetRef);

  const isStructuredDataset = datasetRef.includes("#/structuredDatasets");
  const isArchiveDataset = datasetRef.includes("#/archiveDatasets");

  return (
    <div>
      <div className="row w-100">
        <GeneralEdpScienceOverview
          datasetTreeItem={datasetTreeItem}
          edp={edp}
        />

        {isArchiveDataset && (
          <AdditionalArchiveAttributes dataset={dataset} edp={edp} />
        )}

        {isStructuredDataset && (
          <AdditionalStructuredDataAttributes edp={edp} />
        )}
      </div>
    </div>
  );
};

export default DataScienceInfo;
