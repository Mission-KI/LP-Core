import { useLocation, useNavigate } from "react-router";
import { X } from "react-bootstrap-icons";
import { useCallback, useEffect, useState } from "react";

export const AppliedFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getQueryParams = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const queryObj = {};
    params.forEach((value, key) => {
      if (!queryObj[key]) {
        queryObj[key] = [];
      }
      queryObj[key].push(value);
    });
    return queryObj;
  }, [location.search]);

  const removeFilter = (key) => {
    const params = new URLSearchParams(location.search);
    params.delete(key);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const [selectedFilters, setSelectedFilters] = useState({});
  const ignoredKeys = ["q", "page", "sorting"];

  useEffect(() => {
    const queryParams = getQueryParams();
    setSelectedFilters(queryParams);
  }, [location.search, getQueryParams]);

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex flex-wrap">
        {Object.entries(selectedFilters)
          .filter(([key]) => !ignoredKeys.includes(key))
          .map(([key, values]) => (
            <div key={key} className="bgc-light-gray px-2 rounded me-2 mb-1">
              <span className="small">{key}</span>:{" "}
              <span className="small txt-lighter">{values.join(", ")}</span>
              <button
                style={{ marginBottom: 1.5 }}
                onClick={() => removeFilter(key)}
                className="btn hover-lg txt-primary p-0 small ms-2"
              >
                <X />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
