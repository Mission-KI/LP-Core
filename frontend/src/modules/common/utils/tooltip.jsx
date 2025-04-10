import { Tooltip } from "react-bootstrap";
import { QuestionCircle } from "react-bootstrap-icons";

export const renderTooltip = (
  message,
  helpHash = "asset-processing-status-section",
) => (
  <Tooltip>
    <div className="d-flex align-items-center h-100">
      <span>{message}</span>
      <QuestionCircle
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = `/help#${helpHash}`;
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
