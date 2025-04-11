import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEdp } from "../../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import PageNotFound from "../../../common/pages/PageNotFound";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "react-bootstrap-icons";
import EDPInfoSection from "../../components/EDPInfoSection";
import DatasetAnalyticsSection from "../../components/DatasetAnalyticsSection";

function Details() {
  const { id } = useParams();
  const [edp, setEdp] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const fetchedDataset = await getEdp(id);
        setEdp(fetchedDataset);
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
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
        onClick={() => navigate(-1)}
        className="pointer d-flex align-items-center txt-lighter medium mt-4 pb-2"
      >
        <ArrowLeft className="me-2" />
        {t("header.return")}
      </span>

      <EDPInfoSection edp={edp} />
      <DatasetAnalyticsSection
        edp={edp}
        datasetRef={edp?._source?.datasetTree[0]?.dataset?.$ref}
      />
    </>
  );
}

export default Details;
