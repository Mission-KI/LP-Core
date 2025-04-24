import { Tooltip } from "react-bootstrap";
import { QuestionCircle } from "react-bootstrap-icons";

export const renderTooltip = (message, helpTopicPath) => (
  <Tooltip>
    <div className="d-flex align-items-center h-100">
      <span>{message}</span>
      <QuestionCircle
        onClick={(e) => {
          e.stopPropagation();
          window.open(`/help${helpTopicPath}`, "_blank");
        }}
        style={{
          fontSize: "15px !important",
          marginLeft: "7px",
          cursor: "pointer",
          color: "#007bff",
        }}
      />
    </div>
  </Tooltip>
);
