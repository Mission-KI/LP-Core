import { imageBasePath } from "../../../common/api/config";

export const Audio = ({ dataset, edp }) => {
  return (
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1000, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table
          id="audioDetailsTable"
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
                <strong>Channels</strong>
              </td>
              <td className="txt-lighter">{dataset.channels}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Duration</strong>
              </td>
              <td className="txt-lighter">{dataset.duration} s</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Sample rate</strong>
              </td>
              <td className="txt-lighter">{dataset.sampleRate}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Bit rate</strong>
              </td>
              <td className="txt-lighter">{dataset.bitRate}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>Bits per sample</strong>
              </td>
              <td className="txt-lighter">{dataset.bitsPerSample}</td>
            </tr>
          </tbody>
        </table>

        <h6 className="bold mt-5">Spectrogram</h6>
        <img
          className="img-fluid mb-4"
          src={`${imageBasePath}${edp._id}/${dataset.spectrogram}`}
        />
      </div>
    </div>
  );
};
