import { truncateString } from "../../common/utils/format_utils";
import DatasetTabs from "./Tabs/DatasetTabs";
import DataScienceInfo from "./DataScienceInfo/DataScienceInfo";
import { useTranslation } from "react-i18next";

const DatasetAnalyticsSection = ({ datasetDetails, datasetRef }) => {

    const { t } = useTranslation();

    return (
        <div className="row mt-4">
            <div className="col-md-4">
                <div className="border-lighter shadow rounded bgc-body p-3 mt-4">
                    <p className="bold h5 mb-3 pb-4">{t("dataset.dataScienceInfo")}</p>
                    <DataScienceInfo datasetDetails={datasetDetails} />
                </div>
                {datasetDetails?._source?.tags?.length > 0 && (
                    <div className="d-flex align-items-center flex-wrap mt-5">
                        {datasetDetails._source.tags.map((tag) => (
                            <span
                                className="py-2 px-3 bgc-primary text-white small rounded-lg me-3 mb-3"
                                key={tag}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {truncateString(tag, 14)}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="col-md-8">
                <DatasetTabs
                    datasetDetails={datasetDetails}
                    datasetRef={datasetRef}
                />
            </div>
        </div>

    );
}

export default DatasetAnalyticsSection;
