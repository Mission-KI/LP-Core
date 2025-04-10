import React from "react";

const Image = ({ datasetDetails, datasetRef }) => {
  const imageIndex = datasetRef ? parseInt(datasetRef.split("/")[2], 10) : null;

  const imageDatasets = datasetDetails?._source?.imageDatasets || [];
  const image = imageDatasets[imageIndex] || {};

  if (!image) {
    return <div>Image not found!</div>;
  }

  return (
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1000, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table
          id="imageDetailsTable"
          className="table table-bordered table-hover"
        >
          <tbody>
            <tr>
              <td className="py-2">
                <strong>Codec</strong>
              </td>
              <td className="txt-lighter">{image.codec}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Color Mode</strong>
              </td>
              <td className="txt-lighter">{image.colorMode}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Resolution (Width)</strong>
              </td>
              <td className="txt-lighter">{image.resolution?.width}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Resolution (Height)</strong>
              </td>
              <td className="txt-lighter">{image.resolution?.height}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>DPI (X)</strong>
              </td>
              <td className="txt-lighter">{image.dpi?.x}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>DPI (Y)</strong>
              </td>
              <td className="txt-lighter">{image.dpi?.y}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Brightness</strong>
              </td>
              <td className="txt-lighter">
                {image.brightness ? image.brightness.toFixed(2) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Blurriness</strong>
              </td>
              <td className="txt-lighter">
                {image.blurriness ? image.blurriness.toFixed(2) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Sharpness</strong>
              </td>
              <td className="txt-lighter">
                {image.sharpness ? image.sharpness.toFixed(2) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Brisque</strong>
              </td>
              <td className="txt-lighter">
                {image.brisque ? image.brisque.toFixed(2) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Noise</strong>
              </td>
              <td className="txt-lighter">
                {image.noise ? image.noise.toFixed(2) : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Low Contrast</strong>
              </td>
              <td className="txt-lighter">
                {image.lowContrast ? "Yes" : "No"}
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>ELA Score</strong>
              </td>
              <td className="txt-lighter">
                {image.elaScore ?? <span className="text-danger">N/A</span>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Image;
