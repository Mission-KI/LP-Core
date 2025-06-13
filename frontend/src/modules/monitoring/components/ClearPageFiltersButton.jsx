import { useEffect, useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ClearPageFiltersButton = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paramsExist, setParamsExist] = useState(false);

  useEffect(() => {
    const checkParams = () => {
      const keysToCheck = [
        "dataspace",
        "publisher",
        "type",
        "status",
        "period_start",
        "period_end",
      ];
      const hasAny = keysToCheck.some((key) => searchParams.has(key));
      setParamsExist(hasAny);
    };

    checkParams();
  }, [searchParams]);

  const clearSelection = () => {
    const keysToClear = [
      "dataspace",
      "publisher",
      "type",
      "status",
      "period_start",
      "period_end",
    ];
    keysToClear.forEach((key) => searchParams.delete(key));
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <button
      className={`btn d-flex align-items-center border-0 ${paramsExist ? "btn-danger" : "btn-basic"}`}
      onClick={clearSelection}
      disabled={!paramsExist}
    >
      <XLg className="me-2" /> Clear
    </button>
  );
};
