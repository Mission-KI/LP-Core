import React, { useEffect } from "react";
import $ from "jquery";
import { useTranslation } from "react-i18next";

function AttributeIntegrity({ edp }) {
  useEffect(() => {
    const table = $("#consistencyTable").DataTable({
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
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1500, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table
          id="consistencyTable"
          className="table table-bordered table-hover"
        >
          <thead>
            <tr>
              <th className="py-2 w-33">{t("table.attributes.attribute")}</th>
              <th className="py-2 w-33">
                {t("table.attributes.hasMissingValues")}
              </th>
              <th className="py-2 w-33" style={{ textAlign: "left" }}>
                {t("table.attributes.countMissingValues")}
              </th>
            </tr>
          </thead>
          <tbody>
            {edp?._source?.structuredDatasets[0]?.numericColumns?.map(
              (column, index) => (
                <tr key={index}>
                  <td className="w-33">{column.name}</td>
                  <td className="w-33">{column.nullCount ? "Yes" : "No"}</td>
                  <td className="w-33">{column.nullCount}</td>
                </tr>
              ),
            )}
            {edp?._source?.structuredDatasets[0]?.stringColumns?.map(
              (column, index) => (
                <tr key={index}>
                  <td className="w-33">{column.name}</td>
                  <td className="w-33">{column.nullCount ? "Yes" : "No"}</td>
                  <td className="w-33">{column.nullCount}</td>
                </tr>
              ),
            )}
            {edp?._source?.structuredDatasets?.[0]?.datetimeColumns?.map(
              (column, index) => (
                <tr key={index}>
                  <td className="w-33">{column.name}</td>
                  <td className="w-33">{column.nullCount ? "Yes" : "No"}</td>
                  <td className="w-33">{column.nullCount}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttributeIntegrity;
