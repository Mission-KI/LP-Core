import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import DatasetAnalyticsSection from "../../components/DatasetAnalyticsSection";
import PageNotFound from "../../../common/pages/PageNotFound";
import { getEdp } from "../../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "react-bootstrap-icons";
import QualityMetrics from "../../../search/components/Results/QualityMetrics";
import { resolveDataset } from "../../utils/edp_utils";
import Breadcrumbs from "../../../common/components/Breadcrumbs";

const Dataset = () => {
  const { id } = useParams();
  const [edp, setEdp] = useState(null);
  const [loading, setLoading] = useState(true);
  const { datasetRef } = useParams();
  const datasetTree = edp?._source?.datasetTree;
  const datasetTreeItem = datasetTree?.find(
    (item) => item.dataset["$ref"] === datasetRef,
  );
  const dataset = resolveDataset(edp, datasetRef);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEdp = async () => {
      try {
        const fetchedEdp = await getEdp(id);
        setEdp(fetchedEdp);
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdp();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner variant="dark" />
      </div>
    );
  }

  if (!edp) {
    return <PageNotFound />;
  }

  return (
    <div>
      <Breadcrumbs edp={edp} dataset_name={datasetTreeItem?.name} />

      <span
        onClick={() => {
          navigate("/");
        }}
        className="d-flex align-items-center txt-lighter pointer medium mt-4 pb-2"
      >
        <ArrowLeft className="me-2" />
        {t("header.return")}
      </span>

      <div className="d-flex gap-5 mt-4">
        <h3 className="bold mb-0" style={{ lineHeight: 1 }}>
          {datasetTreeItem?.name}
        </h3>
        <QualityMetrics edp={edp} datasetRef={datasetRef} dataset={dataset} />
      </div>

      <DatasetAnalyticsSection edp={edp} datasetRef={datasetRef} />
    </div>
  );
};

export default Dataset;
