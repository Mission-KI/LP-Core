import GeneralEdpScienceOverview from "./GeneralEdpScienceOverview";
import AdditionalArchiveAttributes from "./AdditionalArchiveAttributes";
import AdditionalStructuredDataAttributes from "./AdditionalStructuredDataAttributes";
import { resolveDataset } from "../../utils/edp_utils";

const DataScienceInfo = ({ datasetDetails, datasetRef }) => {
  const datasetTreeItem = datasetDetails?._source?.datasetTree?.find(
    (item) => item.dataset.$ref === datasetRef,
  );
  const dataset = resolveDataset(datasetDetails, datasetRef);

  const isStructuredDataset = datasetRef.includes("#/structuredDatasets");
  const isArchiveDataset = datasetRef.includes("#/archiveDatasets");

  return (
    <div>
      <div className="row w-100">
        <GeneralEdpScienceOverview
          datasetTreeItem={datasetTreeItem}
          datasetDetails={datasetDetails}
        />

        {isArchiveDataset && (
          <AdditionalArchiveAttributes
            dataset={dataset}
            datasetDetails={datasetDetails}
          />
        )}

        {isStructuredDataset && (
          <AdditionalStructuredDataAttributes datasetDetails={datasetDetails} />
        )}
      </div>
    </div>
  );
};

export default DataScienceInfo;
