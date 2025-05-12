import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import DatasetAnalyticsSection from "../../components/DatasetAnalyticsSection";
import PageNotFound from "../../../common/pages/PageNotFound";
import { getEdp } from "../../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "react-bootstrap-icons";

const Dataset = () => {
  const { id } = useParams();
  const [edp, setEdp] = useState(null);
  const [loading, setLoading] = useState(true);
  const { datasetName } = useParams();
  const datasetTree = edp?._source?.datasetTree;
  const dataset = datasetTree?.find((item) => item.name === datasetName);
  const datasetRef = dataset ? dataset.dataset["$ref"] : null;
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
      <span
        onClick={() => {
          navigate("/");
        }}
        className="d-flex align-items-center txt-lighter pointer medium mt-4 pb-2"
      >
        <ArrowLeft className="me-2" />
        {t("header.return")}
      </span>

      <h3 className="mt-4 bold">{datasetName}</h3>

      <DatasetAnalyticsSection edp={edp} datasetRef={datasetRef} />
    </div>
  );
};

export default Dataset;
