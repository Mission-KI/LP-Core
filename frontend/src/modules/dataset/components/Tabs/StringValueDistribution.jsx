import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ImageView from "../../../common/components/ImageView/ImageView";
import $ from "jquery";
import { imageBasePath } from "../../../common/api/config";

function StringValueDistribution({ edp }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultTab, setDefaultTab] = useState("graphics");

  useEffect(() => {
    const hasDistributionGraph =
      edp?._source?.structuredDatasets[0]?.stringColumns.some(
        (column) => column.distributionGraph,
      );

    if (!hasDistributionGraph) {
      setDefaultTab("table");
    }
  }, [edp]);

  useEffect(() => {
    const table = $("#stringValueDistributionTable").DataTable({
      paging: false,
      searching: true,
      info: true,
      lengthChange: false,
      pageLength: 20,
      order: [],
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, [edp]);

  const getUniqueValueText = (num) => {
    if (num === 1) return "homogen";
    if (num > 1) return "heterogen";
    return "N/A";
  };

  return (
    <Tabs
      activeKey={defaultTab}
      onSelect={(key) => setDefaultTab(key)}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="graphics" title="Graphics">
        <div className="container">
          <div className="dt-container dt-bootstrap5 dt-empty-footer mb-3">
            <div className="row">
              <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                <div className="dt-search">
                  <label for="dt-search-10">Search:</label>
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    id="dt-search-8"
                    placeholder="Search attributes..."
                    aria-controls="anomalyTable"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {edp?._source?.structuredDatasets[0]?.stringColumns
              .filter((column) =>
                column.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map(
                (column) =>
                  column.distributionGraph && (
                    <div
                      className="col-md-3 mb-3 image-card"
                      data-name={column.name}
                      key={column.name}
                    >
                      <ImageView
                        url={
                          imageBasePath +
                          edp?._id +
                          "/" +
                          column.distributionGraph
                        }
                      />
                      <p className="small text-center txt-lighter">
                        {column.name}
                      </p>
                    </div>
                  ),
              )}
          </div>
        </div>
      </Tab>
      <Tab eventKey="table" title="Table">
        <div
          className="m-auto d-block w-100"
          style={{ maxWidth: 1500, overflowX: "auto" }}
        >
          <div className="table-responsive">
            <table
              id="stringValueDistributionTable"
              className="table table-bordered table-hover"
            >
              <thead>
                <tr>
                  <th className="py-2 w-33">column</th>
                  <th className="py-2 w-33">distribution</th>
                  <th className="py-2 w-33" style={{ textAlign: "left" }}>
                    n_unique
                  </th>
                </tr>
              </thead>
              <tbody>
                {edp?._source?.structuredDatasets[0]?.stringColumns.map(
                  (column, index) => (
                    <tr key={index} className="hover">
                      <td className="w-33">{column.name}</td>
                      <td className="w-33">N/A</td>
                      <td className="w-33">
                        {getUniqueValueText(column.numberUnique)}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}

export default StringValueDistribution;
