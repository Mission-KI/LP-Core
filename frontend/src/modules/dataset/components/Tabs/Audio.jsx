export const Audio = ({ dataset }) => {
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
              <td className="txt-lighter">{dataset.duration}</td>
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
            <tr>
              <td className="py-2">
                <strong>Spectrogram</strong>
              </td>
              <td className="txt-lighter">{dataset.spectrogram}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
