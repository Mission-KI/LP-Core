import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import { renderTooltip } from "../../../common/utils/tooltip";

export const ProcessingStatusFilter = ({
  urlParam,
  icon,
  label,
  helpTopic,
}) => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramValue = params.get(urlParam);
    setIsActive(paramValue === "true");
  }, [location.search, urlParam]);

  const toggleFilter = () => {
    const params = new URLSearchParams(location.search);
    if (isActive) {
      params.delete(urlParam);
    } else {
      params.set(urlParam, "true");
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-2 col-1">
      <div className="d-flex align-items-center py-1 position-relative h-100">
        <button
          type="button"
          className={`btn ps-0 ${isActive ? "text-primary" : "txt-lighter"}`}
          name={urlParam}
          onClick={toggleFilter}
        >
          <OverlayTrigger
            delay={{ show: 100, hide: 700 }}
            placement="top"
            overlay={renderTooltip(label, helpTopic)}
          >
            <div>{icon}</div>
          </OverlayTrigger>
        </button>
      </div>
    </div>
  );
};
