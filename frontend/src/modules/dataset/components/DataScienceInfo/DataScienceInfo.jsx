import GeneralEdpScienceOverview from "./GeneralEdpScienceOverview";
import AdditionalArchiveAttributes from "./AdditionalArchiveAttributes";
import AdditionalStructuredDataAttributes from "./AdditionalStructuredDataAttributes";

const DataScienceInfo = ({ edp, datasetRef, dataset }) => {
  const isStructuredDataset = datasetRef.includes("#/structuredDatasets");
  const isArchiveDataset = datasetRef.includes("#/archiveDatasets");

  const datasetTreeItem = edp?._source?.datasetTree?.find(
    (item) => item.dataset.$ref === datasetRef,
  );

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
