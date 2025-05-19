import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { getSimilarEdps } from "../../common/api/elastic";
import { useTranslation } from "react-i18next";
import ResultItem from "../../search/components/Results/ResultItem";
import { Spinner } from "react-bootstrap";
import Paginator from "../../common/components/widgets/Paginator";
import SimilarEdpSearchBar from "../../common/components/Search/SimilarEdpSearchBar";
import { useSettings } from "../../common/contexts/SettingsContext";

const FindSimilar = () => {
  const { id } = useParams();
  const [edps, setEdps] = useState(null);
  const [loading, setLoading] = useState(true);
  const resultsPerPage = 12;
  const [searchParams, setSearchParams] = useState({});
  const pageCount = Math.ceil(edps?.hits?.total?.value / resultsPerPage) || 0;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { expertMode } = useSettings();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const params = {};
    queryParams.forEach((value, key) => {
      params[key] = value;
    });

    setCurrentPage(page);
    setSearchParams(params);
  }, [location]);

  useEffect(() => {
    setEdps([]);
    const fetchSimilarEdps = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get("page")) || 1;
        const from = (page - 1) * resultsPerPage;
        const fetchedEdps = await getSimilarEdps(
          id,
          from,
          resultsPerPage,
          expertMode,
        );
        setEdps(fetchedEdps);
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarEdps();
  }, [id, location.search, expertMode]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set("page", newPage);

    navigate(`?${updatedParams.toString()}`);
  };

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
      <div className="d-flex justify-content-between flex-wrap mb-5">
        <h2
          className="bold mb-0"
          style={{ whiteSpace: "nowrap", lineHeight: "2" }}
        >
          {t("dataset.similarEdps")}
        </h2>
        <div>
          <SimilarEdpSearchBar />
        </div>
      </div>

      <span className="bold d-flex pe-4" style={{ whiteSpace: "nowrap" }}>
        {edps.hits?.total?.value >= 10000
          ? `> ${edps.hits.total.value.toLocaleString()}`
          : edps.hits?.total?.value?.toLocaleString()}
        &nbsp;
        {edps.hits?.total?.value === 1
          ? t("dataset.dataset")
          : t("dataset.datasets")}
      </span>

      <div>
        {edps?.hits?.hits?.map((edp) => (
          <ResultItem edp={edp} key={edp._id} />
        ))}

        <Paginator
          pageCount={pageCount}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default FindSimilar;
