import DatasetTabs from "./Tabs/DatasetTabs";
import DataScienceInfo from "./DataScienceInfo/DataScienceInfo";
import { useTranslation } from "react-i18next";
import { Tags } from "./Tags";

const DatasetAnalyticsSection = ({ edp, datasetRef }) => {
  const { t } = useTranslation();

  return (
    <div className="row mt-4">
      <div className="col-md-4">
        <div className="border-lighter shadow rounded bgc-body p-3 mt-4">
          <p className="bold h5 mb-3 pb-4">{t("dataset.dataScienceInfo")}</p>
          <DataScienceInfo edp={edp} datasetRef={datasetRef} />
        </div>
        <Tags edp={edp} />
      </div>

      <div className="col-md-8">
        <DatasetTabs edp={edp} datasetRef={datasetRef} />
      </div>
    </div>
  );
};

export default DatasetAnalyticsSection;
