import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ImageView from "../../../common/components/ImageView/ImageView";
import $ from "jquery";
import { useTranslation } from "react-i18next";
import { imageBasePath } from "../../../common/api/config";

function NumericOutlierAnalysis({ datasetDetails }) {
  useEffect(() => {
    const table = $("#anomalyTable").DataTable({
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
  }, []);

  const { t } = useTranslation();

  return (
    <Tabs
      defaultActiveKey="graphics"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="graphics" title="Graphics">
        <div className="container">
          <div className="row">
            {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map(
              (column) =>
                column.boxPlot && (
                  <div className="col-md-3 mb-3" key={column.name}>
                    <ImageView
                      url={
                        imageBasePath +
                        datasetDetails?._id +
                        "/" +
                        column.boxPlot
                      }
                    />
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
              id="anomalyTable"
              className="table table-bordered table-hover"
            >
              <thead>
                <tr>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.attribute")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.upperQuantile")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.lowerQuantile")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.outlierCountQuantile")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.upperZscore")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.lowerZscore")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.outlierCountZscore")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.upperIqr")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.lowerIqr")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.iqr")}
                  </th>
                  <th className="py-2 small pe-4">
                    {t("table.attributes.outlierCountIqr")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map(
                  (column, index) => (
                    <tr key={index} className="hover">
                      <td className="small">{column.name}</td>
                      <td className="small">{column.upperQuantile}</td>
                      <td className="small">{column.lowerQuantile}</td>
                      <td className="small">{column.percentileOutlierCount}</td>
                      <td className="small">{column.upperZScore}</td>
                      <td className="small">{column.lowerZScore}</td>
                      <td className="small">{column.zScoreOutlierCount}</td>
                      <td className="small">{column.upperIQR}</td>
                      <td className="small">{column.lowerIQR}</td>
                      <td className="small">{column.iqr}</td>
                      <td className="small">{column.iqrOutlierCount}</td>
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

export default NumericOutlierAnalysis;
