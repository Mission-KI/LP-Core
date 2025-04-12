export const Video = ({ dataset }) => {
  return (
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1000, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table
          id="videoDetailsTable"
          className="table table-bordered table-hover"
        >
          <tbody>
            <tr>
              <td className="py-2">
                <strong>Codec</strong>
              </td>
              <td className="txt-lighter">{dataset.codec}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Resolution</strong>
              </td>
              <td className="txt-lighter">
                {dataset.width}x{dataset.width}
              </td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>FPS</strong>
              </td>
              <td className="txt-lighter">{dataset.fps}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Duration</strong>
              </td>
              <td className="txt-lighter">{dataset.duration}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Pixel format</strong>
              </td>
              <td className="txt-lighter">{dataset.pixelFormat}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
