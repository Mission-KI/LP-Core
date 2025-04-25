import { useEffect, useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ClearPageFiltersButton = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paramsExist, setParamsExist] = useState(
    searchParams.has("dataspace") || searchParams.has("publisher"),
  );

  useEffect(() => {
    const checkParams = () => {
      setParamsExist(
        searchParams.has("dataspace") || searchParams.has("publisher"),
      );
    };

    checkParams();
  }, [searchParams]);

  const clearSelection = () => {
    searchParams.delete("dataspace");
    searchParams.delete("publisher");
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
