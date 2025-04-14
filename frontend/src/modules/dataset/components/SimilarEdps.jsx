import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSimilarEdps } from "../../common/api/elastic";
import { useTranslation } from "react-i18next";
import ResultItemCard from "../../search/components/Results/ResultItemCard";
import { Spinner } from "react-bootstrap";

export const SimilarEdps = () => {
  const { id } = useParams();
  const [edps, setEdps] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchSimilarEdps = async () => {
      try {
        const fetchedEdps = await getSimilarEdps(id);
        setEdps(fetchedEdps);
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarEdps();
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

  return (
    <div className="py-5">
      <h2 className="bold my-3">{t("dataset.similarEdps")}</h2>
      <div className="row">
        {edps?.hits?.hits?.map((edp) => (
          <ResultItemCard edp={edp} key={edp._id} />
        ))}
      </div>
    </div>
  );
};
