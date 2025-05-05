import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormGroup } from "react-bootstrap";
import { LockFill, UnlockFill } from "react-bootstrap-icons";

const paramName = "freely_available";

export const AccessFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get(paramName);
    if (value === "true" || value === "false") {
      setSelected(value);
    } else {
      setSelected(null);
    }
  }, [location.search]);

  const handleClick = (value) => {
    const searchParams = new URLSearchParams(location.search);
    if (selected === value) {
      searchParams.delete(paramName);
      setSelected(null);
    } else {
      searchParams.set(paramName, value);
      setSelected(value);
    }
    navigate({ search: searchParams.toString() });
  };

  return (
    <FormGroup className="mb-2 col pe-5">
      <div className="d-flex">
        <button
          type="button"
          className={`btn ps-0 ${
            selected === "true" ? "txt-primary" : "txt-lighter"
          }`}
          onClick={() => handleClick("true")}
        >
          <UnlockFill />
        </button>
        <button
          type="button"
          className={`btn ps-0 ${
            selected === "false" ? "txt-primary" : "txt-lighter"
          }`}
          onClick={() => handleClick("false")}
        >
          <LockFill />
        </button>
      </div>
    </FormGroup>
  );
};
