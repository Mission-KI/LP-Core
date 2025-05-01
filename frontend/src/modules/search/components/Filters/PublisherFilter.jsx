import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterValues } from "../../../common/api/elastic";
import { useTranslation } from "react-i18next";
import { Dropdown, FormGroup } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
const paramName = "publisher.name";

export const PublisherFilter = () => {
  const [publishers, setPublishers] = useState([]);
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
          response?.aggregations?.nested_asset_refs?.distinct_publisher_names
            ?.buckets || [];
        setPublishers(buckets);
      } catch (error) {
        console.error("Error fetching publishers:", error);
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
            className="small px-0 txt-regular text-decoration-none"
          >
            {t("filters.publisher")}
            <ChevronDown
              className={`small ms-2 transition-chevron ${open ? "rotate" : ""}`}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="border-0 shadow rounded">
            {publishers.map((publisher, key) => (
              <Dropdown.Item
                key={key}
                as="div"
                className="d-flex align-items-center"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={paramName}
                  value={publisher.key}
                  checked={selected.includes(publisher.key)}
                  onChange={() => handleToggle(publisher.key)}
                  autoComplete="off"
                />
                <label className="ms-2 mb-0">{publisher.key}</label>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </FormGroup>
  );
};
