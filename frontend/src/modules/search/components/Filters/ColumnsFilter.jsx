import { FormGroup } from "react-bootstrap";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import { getFilterValues } from "../../../common/api/elastic";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const ColumnsFilter = () => {
  const [maxColumnCount, setMaxColumnCount] = useState(0);
  const [range, setRange] = useState([0, 0]);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilterValues = async () => {
      try {
        const response = await getFilterValues();
        const fetchedMax = response?.aggregations?.max_column_count?.value || 0;
        setMaxColumnCount(fetchedMax);
      } catch (error) {
        console.error("Error fetching max column count:", error);
      }
    };

    fetchFilterValues();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const min = parseInt(params.get("min_columns")) || 0;
    const max = parseInt(params.get("max_columns")) || maxColumnCount;
    setRange([min, max]);
  }, [location.search, maxColumnCount]);

  const handleAfterChange = ([min, max]) => {
    const params = new URLSearchParams(location.search);
    params.set("min_columns", min);
    params.set("max_columns", max);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <FormGroup className="mb-2">
      <div className="d-flex w-100">
        <div className="col-md-6">
          <label className="small mb-2">{t("filters.columns")}</label>

          <div
            className="d-flex flex-column w-100"
            style={{ padding: "0 4px" }}
          >
            <Slider
              range
              className="w-100"
              min={0}
              max={maxColumnCount}
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
      </div>
    </FormGroup>
  );
};
