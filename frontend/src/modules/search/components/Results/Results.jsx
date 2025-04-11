import { useState } from "react";
import { Grid, ListTask } from "react-bootstrap-icons";
import ResultItem from "./ResultItem";
import styles from "./Results.module.css";
import { useTranslation } from "react-i18next";
import Paginator from "../../../common/components/widgets/Paginator";
import ResultItemCard from "./ResultItemCard";
import SkeletonLoader from "../../../common/animations/SkeletonAnimation";

function Results({ edps, loading, pageCount, handlePageChange, currentPage }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="mt-3 pt-3">
      <div className="w-100 mb-2">
        <div className="mb-4">
          <div className="d-flex align-items-center pb-3">
            <span className="bold d-flex pe-4" style={{ whiteSpace: "nowrap" }}>
              {edps.hits?.total?.value >= 10000
                ? `> ${edps.hits.total.value.toLocaleString()}`
                : edps.hits?.total?.value?.toLocaleString()}
              &nbsp;
              {edps.hits?.total?.value === 1
                ? t("dataset.dataset")
                : t("dataset.datasets")}
            </span>
            <div className={styles.resultViewTypeTabs}>
              <span
                onClick={() => setActiveTab("list")}
                className={`pointer medium d-flex align-items-center py-1 px-1 ${activeTab === "list" ? styles.active : ""}`}
              >
                <ListTask className="me-1 small" /> List
              </span>
              <span
                onClick={() => setActiveTab("tiles")}
                className={`pointer medium d-flex align-items-center py-1 px-1 ${activeTab === "tiles" ? styles.active : ""}`}
              >
                <Grid className="me-1 small" /> Tiles
              </span>
            </div>
          </div>

          {loading ? <SkeletonLoader /> : ""}

          {activeTab == "list" ? (
            <div className="col-md-9">
              {edps?.hits?.hits?.map((edp) => (
                <ResultItem edp={edp} key={edp._id} />
              ))}
              <div className="col-md-10">
                <Paginator
                  pageCount={pageCount}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            </div>
          ) : activeTab == "tiles" ? (
            <>
              <div className="row">
                {edps?.hits?.hits?.map((edp) => (
                  <ResultItemCard edp={edp} key={edp._id} />
                ))}
              </div>
              <Paginator
                pageCount={pageCount}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
