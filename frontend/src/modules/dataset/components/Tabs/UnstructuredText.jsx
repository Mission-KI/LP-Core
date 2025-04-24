import WordCloud from "react-d3-cloud";
import { useTranslation } from "react-i18next";

const UnstructuredText = ({ dataset }) => {
  const { t } = useTranslation();

  const wordCloudData =
    dataset?.wordCloud?.map(({ word, count }) => ({
      text: word,
      value: count,
    })) || [];

  const allSame = wordCloudData.every(
    (w) => w.value === wordCloudData[0]?.value,
  );
  const fontSize = allSame
    ? () => 25
    : (word) => Math.log2(word.value + 1) * 15;

  return (
    <div style={{ width: "100%" }}>
      <div className="table-responsive">
        <table
          id="unstructuredTextDetailsTable"
          className="table table-bordered table-hover"
        >
          <tbody>
            <tr>
              <td className="py-2">
                <strong>{t("dataset.languages")}</strong>
              </td>
              <td className="txt-lighter">{dataset?.languages?.join(", ")}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>{t("dataset.noOfLines")}</strong>
              </td>
              <td className="txt-lighter">{dataset?.lineCount}</td>
            </tr>
            <tr>
              <td className="py-2">
                <strong>{t("dataset.noOfWords")}</strong>
              </td>
              <td className="txt-lighter">{dataset?.wordCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <WordCloud
        data={wordCloudData}
        fontSize={fontSize}
        rotate={(word) => word.value % 360}
        padding={20}
        height={400}
        spiral="rectangular"
        random={() => 0.5}
      />
    </div>
  );
};

export default UnstructuredText;
