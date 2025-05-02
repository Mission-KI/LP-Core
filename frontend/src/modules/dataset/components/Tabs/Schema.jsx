import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

const Schema = ({ dataset }) => {
  return (
    <div>
      <JSONPretty
        id="json-pretty"
        data={dataset?.jsonSchema}
        style={{ overflow: "auto", maxHeight: "400px" }}
      ></JSONPretty>
    </div>
  );
};

export default Schema;
