import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDown } from "react-bootstrap-icons";

const DataspaceSelectorDropdown = ({ dataspaces }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedDataspace, setSelectedDataspace] = useState(
    searchParams.get("dataspace") || "Select Dataspace",
  );

  useEffect(() => {
    const currentDataspace = searchParams.get("dataspace");
    if (!currentDataspace) {
      setSelectedDataspace("Select Dataspace");
    }
  }, [searchParams]);

  const handleSelect = (dataspace) => {
    setSelectedDataspace(dataspace);
    searchParams.set("dataspace", dataspace);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="basic" id="dropdown-basic">
          {selectedDataspace} <ChevronDown className="ms-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-menu-end"
          style={{ minWidth: "100%" }}
        >
          {dataspaces?.map((dataspace) => (
            <Dropdown.Item key={dataspace.key} eventKey={dataspace.key}>
              {dataspace.key}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DataspaceSelectorDropdown;
