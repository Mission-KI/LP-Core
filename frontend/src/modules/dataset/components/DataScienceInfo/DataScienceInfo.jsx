import GeneralEdpScienceOverview from './GeneralEdpScienceOverview';
import AdditionalArchiveAttributes from './AdditionalArchiveAttributes';
import AdditionalStructuredDataAttributes from './AdditionalStructuredDataAttributes';

const DataScienceInfo = ({ datasetDetails, datasetRef }) => {

    const datasetTreeItem = datasetDetails?._source?.datasetTree[0];

    const isStructuredDataset = datasetRef.includes("#/structuredDatasets");
    const isArchiveDataset = datasetRef.includes("#/archiveDatasets");

    return (
        <div>
            <div className="row w-100">

                <GeneralEdpScienceOverview
                    datasetRef={datasetRef}
                    datasetDetails={datasetDetails}
                />

                {isArchiveDataset && (
                    <AdditionalArchiveAttributes
                        datasetDetails={datasetDetails}
                    />
                )}

                {isStructuredDataset && (
                    <AdditionalStructuredDataAttributes
                        datasetDetails={datasetDetails}
                    />
                )}

            </div>
        </div>
    );
}

export default DataScienceInfo;

