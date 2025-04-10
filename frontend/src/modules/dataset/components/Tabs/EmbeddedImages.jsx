import React, { useEffect } from "react";
import $ from "jquery";

function EmbeddedImages({ datasetDetails, datasetRef }) {
  useEffect(() => {
    const table = $("#embeddedImagesTable").DataTable({
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

  const datasetTree = datasetDetails?._source?.datasetTree || [];
  const imageDatasets = datasetDetails?._source?.imageDatasets || [];

  const treeDatasetRef = datasetTree
    .map((item, index) => ({ ...item, index }))
    .find((item) => item.dataset?.["$ref"] === datasetRef)?.index;

  const fullTreeDatasetRef =
    treeDatasetRef !== undefined ? `#/datasetTree/${treeDatasetRef}` : null;

  const imageReferences = datasetTree.filter(
    (item) =>
      item.parent?.["$ref"] === fullTreeDatasetRef &&
      item.dataset?.["$ref"]?.includes("imageDataset"),
  );

  const imageDatasetIndices = imageReferences
    .map((item) => {
      const match = item.dataset?.["$ref"]?.match(/#\/imageDatasets\/(\d+)/);
      if (!match) {
        console.log("No match for:", item.dataset?.["$ref"]);
      }
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((index) => index !== null);

  const filteredImageDatasets = imageDatasets.filter((_, index) =>
    imageDatasetIndices.includes(index),
  );

  return (
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1000, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table
          id="embeddedImagesTable"
          className="table table-bordered table-hover"
        >
          <thead>
            <tr>
              <th className="py-2">Codec</th>
              <th className="py-2">Color Mode</th>
              <th className="py-2">Resolution (Width)</th>
              <th className="py-2">Resolution (Height)</th>
              <th className="py-2">DPI (X)</th>
              <th className="py-2">DPI (Y)</th>
              <th className="py-2">Brightness</th>
              <th className="py-2">Blurriness</th>
              <th className="py-2">Sharpness</th>
              <th className="py-2">Brisque</th>
              <th className="py-2">Noise</th>
              <th className="py-2">Low Contrast</th>
              <th className="py-2">ELA Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredImageDatasets.map((image, index) => (
              <tr key={index}>
                <td className="txt-lighter">{image.codec}</td>
                <td className="txt-lighter">{image.colorMode}</td>
                <td className="txt-lighter">{image.resolution?.width}</td>
                <td className="txt-lighter">{image.resolution?.height}</td>
                <td className="txt-lighter">{image.dpi?.x}</td>
                <td className="txt-lighter">{image.dpi?.y}</td>
                <td className="txt-lighter">
                  {image.brightness ? image.brightness.toFixed(2) : "N/A"}
                </td>
                <td className="txt-lighter">
                  {image.blurriness ? image.blurriness.toFixed(2) : "N/A"}
                </td>
                <td className="txt-lighter">
                  {image.sharpness ? image.sharpness.toFixed(2) : "N/A"}
                </td>
                <td className="txt-lighter">
                  {image.brisque ? image.brisque.toFixed(2) : "N/A"}
                </td>
                <td className="txt-lighter">
                  {image.noise ? image.noise.toFixed(2) : "N/A"}
                </td>
                <td className="txt-lighter">
                  {image.lowContrast ? "Yes" : "No"}
                </td>
                <td className="txt-lighter">
                  {image.elaScore ?? <span className="text-danger">N/A</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmbeddedImages;
