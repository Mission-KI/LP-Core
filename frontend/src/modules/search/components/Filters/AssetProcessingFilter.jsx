import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterValues } from "../../../common/api/elastic";
import { useTranslation } from "react-i18next";
import { Dropdown, FormGroup } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
const paramName = "assetProcessingStatus";

export const AssetProcessingFilter = () => {
  const [assetProcessingStatuses, setAssetProcessingStatuses] = useState([]);
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedParams = params.getAll(paramName);
    setSelected(selectedParams);
  }, [location.search]);

  useEffect(() => {
    const fetchFilterValues = async () => {
      try {
        const response = await getFilterValues();
        const buckets =
          response?.aggregations?.distinct_assetProcessingStatus?.buckets || [];
        setAssetProcessingStatuses(buckets);
      } catch (error) {
        console.error("Error fetching assetProcessingStatuses:", error);
      }
    };
    fetchFilterValues();
  }, []);

  const handleToggle = (value) => {
    const params = new URLSearchParams(location.search);
    const currentValues = params.getAll(paramName);

    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    params.delete(paramName);
    newValues.forEach((val) => params.append(paramName, val));

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <FormGroup className="mb-2 col pe-5">
      <div className="d-flex align-items-center py-1 position-relative h-100">
        <Dropdown show={open} onToggle={() => setOpen(!open)}>
          <Dropdown.Toggle
            variant="link"
            id="assetProcessingStatusDropdown"
            className="small px-0 txt-regular text-decoration-none"
          >
            {t("filters.assetProcessingStatus")}
            <ChevronDown
              className={`small ms-2 transition-chevron ${open ? "rotate" : ""}`}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="border-0 shadow rounded">
            {assetProcessingStatuses.map((assetProcessingStatus, key) => (
              <Dropdown.Item
                key={key}
                as="div"
                onClick={() => handleToggle(assetProcessingStatus.key)}
                className="d-flex align-items-center asset-processing-status-dropdown-item"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={paramName}
                  value={assetProcessingStatus.key}
                  checked={selected.includes(assetProcessingStatus.key)}
                  onChange={() => handleToggle(assetProcessingStatus.key)}
                  autoComplete="off"
                />
                <label className="ms-2 mb-0">{assetProcessingStatus.key}</label>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </FormGroup>
  );
};
