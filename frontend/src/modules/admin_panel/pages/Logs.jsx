import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageFilters } from "../components/PageFilters";
import { getAnalytics } from "../../monitoring/api/analytics";
import { getLogs } from "../../monitoring/api/logs";
import Paginator from "../../common/components/widgets/Paginator";
import { LogFilters } from "../components/LogFilters";

export const Logs = () => {
  const [logs, setLogs] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(logs?.count / itemsPerPage) || 0;
  const navigate = useNavigate();

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const publisher = searchParams.get("publisher");
        const dataspace = searchParams.get("dataspace");
        const fetchedAnalytics = await getAnalytics(dataspace, publisher);
        setAnalytics(fetchedAnalytics);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    fetchAnalytics();
  }, [searchParams]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const publisher = searchParams.get("publisher");
        const dataspace = searchParams.get("dataspace");
        const type = searchParams.get("type");
        const status = searchParams.get("status");
        const period_start = searchParams.get("period_start");
        const period_end = searchParams.get("period_end");
        const page = parseInt(searchParams.get("page")) || 1;
        const fetchedLogs = await getLogs(
          dataspace,
          publisher,
          page,
          type,
          status,
          period_start,
          period_end,
        );
        setLogs(fetchedLogs);
      } catch (error) {
        toast.error(error.message || "Failed to fetch.");
      }
    };

    fetchLogs();
  }, [searchParams]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set("page", newPage);

    navigate(`?${updatedParams.toString()}`);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap mt-4 mb-3">
        <div>
          <h2 className="bold">Logs</h2>
        </div>
        <LogFilters
          dataspaces={analytics?.dataspaces}
          publishers={analytics?.publishers}
        />
      </div>

      <p className="mb-5">
        Here you can see the audit logs of certain events like edp uploads,
        deletions and more.
      </p>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Requested URL</th>
              <th>Status</th>
              <th>Type</th>
              <th>Message</th>
              <th>Metadata</th>
              <th>Datetime</th>
            </tr>
          </thead>
          <tbody>
            {logs?.results?.map((log) => (
              <tr key={log.id}>
                <td>{log.requested_url}</td>
                <td>
                  <span
                    className={`badge ${
                      log.status === "success" ? "bgc-success" : "bgc-danger"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td>{log.type}</td>
                <td>{log.message}</td>
                <td>
                  <JSONPretty
                    id="json-pretty"
                    data={log.metadata}
                    style={{ overflow: "auto", maxHeight: "100px" }}
                  ></JSONPretty>
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(log.created_at))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Paginator
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};
