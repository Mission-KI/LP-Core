import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { useSearchParams } from "react-router-dom";
import { PageFilters } from "../components/PageFilters";
import { getAnalytics } from "../../monitoring/api/analytics";
import { getLogs } from "../../monitoring/api/logs";

export const Logs = () => {
  const [logs, setLogs] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [searchParams] = useSearchParams();

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
        const fetchedLogs = await getLogs(dataspace, publisher);
        setLogs(fetchedLogs);
      } catch (error) {
        toast.error(error.message || "Failed to fetch.");
      }
    };

    fetchLogs();
  }, [searchParams]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap mt-4 mb-3">
        <div>
          <h2 className="bold">Logs</h2>
        </div>
        <PageFilters
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
            {logs?.map((log) => (
              <tr key={log.id}>
                <td>{log.requested_url}</td>
                <td>{log.status}</td>
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
    </>
  );
};
