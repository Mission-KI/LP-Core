import { FormGroup, FormControl } from "react-bootstrap";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const LinesFilter = ({ maxRowCount }) => {
  const [range, setRange] = useState([0, 0]);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const min = parseInt(params.get("min_lines")) || 0;
    const max = parseInt(params.get("max_lines")) || maxRowCount;
    setRange([min, max]);
  }, [location.search, maxRowCount]);

  const handleAfterChange = ([min, max]) => {
    const params = new URLSearchParams(location.search);
    params.set("min_lines", min);
    params.set("max_lines", max);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleInputChange = (index, value) => {
    const newValue = parseInt(value);
    if (isNaN(newValue)) return;

    const updatedRange = [...range];
    updatedRange[index] = newValue;

    // Prevent crossing
    if (index === 0 && newValue > range[1]) updatedRange[0] = range[1];
    if (index === 1 && newValue < range[0]) updatedRange[1] = range[0];

    // Clamp to bounds
    updatedRange[0] = Math.max(0, Math.min(updatedRange[0], maxRowCount));
    updatedRange[1] = Math.max(0, Math.min(updatedRange[1], maxRowCount));

    setRange(updatedRange);
    handleAfterChange(updatedRange);
  };

  return (
    <FormGroup className="col-md-12 mb-2">
      <div className="w-100">
        <label className="small mb-2">{t("filters.lines")}</label>
        <div
          className="d-flex align-items-center w-100"
          style={{ padding: "0 4px" }}
        >
          <FormControl
            type="number"
            value={range[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            style={{ width: "min-content", marginRight: "8px" }}
            min={0}
            max={range[1]}
          />
          <Slider
            range
            className="flex-grow-1"
            min={0}
            max={maxRowCount}
            value={range}
            allowCross={false}
            onChange={(newRange) => setRange(newRange)}
            onChangeComplete={handleAfterChange}
          />
          <FormControl
            type="number"
            value={range[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            style={{ width: "fit-content", marginLeft: "8px" }}
            min={range[0]}
            max={maxRowCount}
          />
        </div>
      </div>
    </FormGroup>
  );
};
