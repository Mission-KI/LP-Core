import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDown } from "react-bootstrap-icons";

const TypeSelectorDropdown = ({ types }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || "Type",
  );

  useEffect(() => {
    const currentType = searchParams.get("type");
    if (!currentType) {
      setSelectedType("Type");
    }
  }, [searchParams]);

  const handleSelect = (type) => {
    setSelectedType(type);
    searchParams.set("type", type);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="basic" id="dropdown-basic">
          {selectedType} <ChevronDown className="ms-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-menu-end"
          style={{ minWidth: "100%" }}
        >
          {types?.map((type, key) => (
            <Dropdown.Item key={key} eventKey={type}>
              {type}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TypeSelectorDropdown;
