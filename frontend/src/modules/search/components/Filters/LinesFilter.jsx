import { FormGroup } from "react-bootstrap";
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

  return (
    <FormGroup className="col-md-6 mb-2">
      <div className="w-100">
        <label className="small mb-2">{t("filters.lines")}</label>

        <div className="d-flex flex-column w-100" style={{ padding: "0 4px" }}>
          <Slider
            range
            className="w-100"
            min={0}
            max={maxRowCount}
            value={range}
            allowCross={false}
            onChange={(newRange) => setRange(newRange)}
            onChangeComplete={handleAfterChange}
          />
          <div className="d-flex justify-content-between mt-2">
            <span className="small txt-lighter">{range[0]}</span>
            <span className="small txt-lighter">{range[1]}</span>
          </div>
        </div>
      </div>
    </FormGroup>
  );
};
