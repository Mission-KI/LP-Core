import { useEffect } from "react";
import $ from "jquery";

function EmbeddedTables({ edp, datasetRef }) {
  useEffect(() => {
    const table = $("#embeddedTablesTable").DataTable({
      paging: false,
      searching: true,
      info: true,
      lengthChange: false,
      pageLength: 20,
      order: [],
      responsive: true,
      destroy: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  const embeddedTables =
    edp?._source?.unstructuredTextDatasets[0]?.embeddedTables;

  return (
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1000, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table
          id="embeddedTablesTable"
          className="table table-bordered table-hover"
        >
          <thead>
            <tr>
              <th className="py-2">start line</th>
              <th className="py-2">end line</th>
              <th className="py-2">structured dataset name</th>
            </tr>
          </thead>
          <tbody>
            {embeddedTables?.map((table, index) => (
              <tr key={index}>
                <td className="txt-lighter">{table.startLine}</td>
                <td className="txt-lighter">{table.endLine}</td>
                <td className="txt-lighter">{table.structuredDatasetName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmbeddedTables;
