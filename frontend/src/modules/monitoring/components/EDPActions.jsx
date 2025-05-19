import { CloudArrowUp, Download, Pencil, Trash3 } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router";

const EDPActions = ({ analytics }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogs = (type, status) => {
    const searchParams = new URLSearchParams(location.search);
    const publisher = searchParams.get("publisher");
    const dataspace = searchParams.get("dataspace");

    const newParams = new URLSearchParams({
      type,
      status,
    });

    if (publisher) {
      newParams.set("publisher", publisher);
    }

    if (dataspace) {
      newParams.set("dataspace", dataspace);
    }

    const basePath = location.pathname.includes("/monitoring")
      ? "/monitoring"
      : "/admin";
    navigate(`${basePath}/logs?${newParams.toString()}`);
  };

  return (
    <>
      <h5 className="bold mt-5 mb-4">EDP actions</h5>
      <table className="table table-bordered table-hover">
        <tbody>
          <tr
            className="pointer"
            onClick={() => {
              navigateToLogs("upload", "success");
            }}
          >
            <th>
              <CloudArrowUp className="me-2 text-success" /> Successful EDP
              uploads
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.uploads.successful?.toLocaleString()}
            </td>
          </tr>
          <tr
            className="pointer"
            onClick={() => {
              navigateToLogs("upload", "fail");
            }}
          >
            <th>
              <CloudArrowUp className="me-2 txt-danger" /> Failed EDP uploads
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.uploads.failed?.toLocaleString()}
            </td>
          </tr>
          <tr
            className="pointer"
            onClick={() => {
              navigateToLogs("edit", "success");
            }}
          >
            <th>
              <Pencil className="me-2 text-success" /> Successful EDP updates
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.edits.successful?.toLocaleString()}
            </td>
          </tr>
          <tr
            className="pointer"
            onClick={() => {
              navigateToLogs("edit", "fail");
            }}
          >
            <th>
              <Pencil className="me-2 txt-danger" /> Failed EDP updates
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.edits.failed?.toLocaleString()}
            </td>
          </tr>
          <tr
            className="pointer"
            onClick={() => {
              navigateToLogs("delete", "success");
            }}
          >
            <th>
              <Trash3 className="me-2 text-success" /> Successful EDP deletions
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.deletions.successful?.toLocaleString()}
            </td>
          </tr>
          <tr
            className="pointer"
            onClick={() => {
              navigateToLogs("delete", "fail");
            }}
          >
            <th>
              <Trash3 className="me-2 txt-danger" /> Failed EDP deletions
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.deletions.failed?.toLocaleString()}
            </td>
          </tr>
          <tr
            className="pointer"
            onClick={() => {
              navigateToLogs("download", "success");
            }}
          >
            <th>
              <Download className="me-2" /> Asset downloads
            </th>
            <td className="text-end">
              {analytics?.edp_event_counts?.downloads?.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default EDPActions;
