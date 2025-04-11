import { useEffect, useState } from "react";
import { getLogs } from "../api/logs";
import { toast } from "react-toastify";

export const Logs = () => {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedAnalytics = await getLogs();
        setLogs(fetchedAnalytics);
      } catch (error) {
        toast.error(error.message || "Failed to fetch.");
      }
    };

    fetchLogs();
  }, []);

  return (
    <>
      <h2 className="bold mt-3">Logs</h2>
      <p>
        Here you can see the audit logs of certain events like edp uploads,
        deletions and more.
      </p>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
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
                <td>{JSON.stringify(log.metadata, null, 2)}</td>
                <td>{log.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
