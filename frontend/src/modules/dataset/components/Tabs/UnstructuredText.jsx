import WordCloud from "react-d3-cloud";

const UnstructuredText = ({ dataset }) => {
  const wordCloudData =
    dataset?.wordCloud?.map(({ word, count }) => ({
      text: word,
      value: count,
    })) || [];

  const allSame = wordCloudData.every(
    (w) => w.value === wordCloudData[0]?.value
  );
  const fontSize = allSame
    ? () => 25
    : (word) => Math.log2(word.value + 1) * 15;

  return (
    <div style={{ width: "100%", height: "400px" }} className="border-lighter">
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
