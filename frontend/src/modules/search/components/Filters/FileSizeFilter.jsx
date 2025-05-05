import Slider from "rc-slider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Filters.module.css";

export const FileSizeFilter = () => {
  const [range, setRange] = useState([0, 0]);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const min = parseInt(params.get("min_size")) || 0;
    const max = parseInt(params.get("max_size")) || 100;
    setRange([min, max]);
  }, [location.search]);

  const handleAfterChange = ([min, max]) => {
    const params = new URLSearchParams(location.search);
    params.set("min_size", min);
    params.set("max_size", max);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-2 col-md-8 pe-5">
      <div className="d-flex flex-column w-100">
        <label className="small mb-2">{t("filters.sizeRange")}</label>
        <div className="position-relative" style={{ padding: "0 4px" }}>
          <div className="position-relative">
            <Slider
              range
              className="w-100"
              min={0}
              max={100}
              value={range}
              allowCross={false}
              onChange={(newRange) => setRange(newRange)}
              onChangeComplete={handleAfterChange}
            />
            <div className={styles.sizeGroupSeparators}>
              <div className={styles.sizeGroupSeparator}></div>
              <div className={styles.sizeGroupSeparator}></div>
              <div className={styles.sizeGroupSeparator}></div>
              <div className={styles.sizeGroupSeparator}></div>
              <div className={styles.sizeGroupSeparator}></div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mt-2">
          <span className="small txt-lighter p-0">KB</span>
          <span className="small txt-lighter">MB</span>
          <span className="small txt-lighter">GB</span>
          <span className="small txt-lighter">TB</span>
        </div>
      </div>
    </div>
  );
};
