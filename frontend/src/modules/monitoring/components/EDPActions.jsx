import { CloudArrowUp, Download, Pencil, Trash3 } from "react-bootstrap-icons";

const EDPActions = ({ analytics }) => {
  return (
    <>
      <h5 className="bold mt-5 mb-4">EDP actions</h5>
      <table className="table table-bordered table-hover">
        <tbody>
          <tr>
            <th>
              <CloudArrowUp className="me-2 text-success" /> Successful EDP
              uploads
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.uploads.successful?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>
              <CloudArrowUp className="me-2 txt-danger" /> Failed EDP uploads
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.uploads.failed?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>
              <Pencil className="me-2 text-success" /> Successful EDP updates
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.edits.successful?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>
              <Pencil className="me-2 txt-danger" /> Failed EDP updates
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.edits.failed?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>
              <Trash3 className="me-2 text-success" /> Successful EDP deletions
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.deletions.successful?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <th>
              <Trash3 className="me-2 txt-danger" /> Failed EDP deletions
            </th>
            <td className="text-end">
              {analytics.edp_event_counts.deletions.failed?.toLocaleString()}
            </td>
          </tr>
          <tr>
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
