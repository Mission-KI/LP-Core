import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDown } from "react-bootstrap-icons";

const StatusSelectorDropdown = ({ statuses }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || "Status",
  );

  useEffect(() => {
    const currentStatus = searchParams.get("status");
    if (!currentStatus) {
      setSelectedStatus("Status");
    }
  }, [searchParams]);

  const handleSelect = (status) => {
    setSelectedStatus(status);
    searchParams.set("status", status);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="basic" id="dropdown-basic">
          {selectedStatus} <ChevronDown className="ms-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-menu-end"
          style={{ minWidth: "100%" }}
        >
          {statuses?.map((status, key) => (
            <Dropdown.Item key={key} eventKey={status}>
              {status}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default StatusSelectorDropdown;
