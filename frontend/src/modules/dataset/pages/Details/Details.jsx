import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { getEdp } from "../../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import PageNotFound from "../../../common/pages/PageNotFound";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "react-bootstrap-icons";
import EDPInfoSection from "../../components/EDPInfoSection";
import DatasetAnalyticsSection from "../../components/DatasetAnalyticsSection";
import { SimilarEdps } from "../../components/SimilarEdps";
import classNames from "classnames";

function Details() {
  const { id } = useParams();
  const [edp, setEdp] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const fromSearch = location.state?.fromSearch;
  const canGoBack = fromSearch?.pathname === "/";

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

  useEffect(() => {
    setTimeout(() => {
      const container = document.querySelector(".main-content-wrapper");
      if (container) {
        container.scrollTo(0, 0);
      }
    }, 50);
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
    <>
      <span
        onClick={() => {
          if (canGoBack) navigate(fromSearch.pathname + fromSearch.search);
        }}
        style={{
          opacity: canGoBack ? 1 : 0.7,
          cursor: canGoBack ? "pointer" : "text",
        }}
        className={classNames(
          "d-flex align-items-center txt-lighter medium mt-4 pb-2",
          { "pointer-events-none": !canGoBack },
        )}
      >
        <ArrowLeft className="me-2" />
        {t("header.return")}
      </span>

      <EDPInfoSection edp={edp} />
      <DatasetAnalyticsSection
        edp={edp}
        datasetRef={edp?._source?.datasetTree[0]?.dataset?.$ref}
      />
      <SimilarEdps />
    </>
  );
}

export default Details;
