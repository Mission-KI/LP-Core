import React from "react";

const Document = ({ edp, datasetRef }) => {
  const documentIndex = parseInt(datasetRef.split("/")[2], 10);

  const documentDatasets = edp?._source?.documentDatasets || [];
  const document = documentDatasets[documentIndex] || {};

  if (!document) {
    return <div>Document not found!</div>;
  }

  return (
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1000, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table
          id="documentDetailsTable"
          className="table table-bordered table-hover"
        >
          <tbody>
            <tr>
              <td className="py-2">
                <strong>Title</strong>
              </td>
              <td className="txt-lighter">{document.title}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Subject</strong>
              </td>
              <td className="txt-lighter">{document.subject}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Author</strong>
              </td>
              <td className="txt-lighter">{document.author}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Toolchain</strong>
              </td>
              <td className="txt-lighter">{document.toolchain}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Creation Date</strong>
              </td>
              <td className="txt-lighter">{document.creationDate}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Keywords</strong>
              </td>
              <td className="txt-lighter">{document.keywords?.join(", ")}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>DocType</strong>
              </td>
              <td className="txt-lighter">{document.docType}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Pages</strong>
              </td>
              <td className="txt-lighter">{document.numPages}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Images</strong>
              </td>
              <td className="txt-lighter">{document.numImages}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Modified</strong>
              </td>
              <td className="txt-lighter">{document.modified}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Encrypted</strong>
              </td>
              <td className="txt-lighter">{document.encrypted}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Document;
