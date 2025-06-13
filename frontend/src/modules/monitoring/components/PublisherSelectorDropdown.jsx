import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDown } from "react-bootstrap-icons";

const PublisherSelectorDropdown = ({ publishers }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPublisher, setSelectedPublisher] = useState(
    searchParams.get("publisher") || "Select Publisher",
  );

  useEffect(() => {
    const currentPublisher = searchParams.get("publisher");
    if (!currentPublisher) {
      setSelectedPublisher("Select Publisher");
    }
  }, [searchParams]);

  const handleSelect = (publisher) => {
    setSelectedPublisher(publisher);
    searchParams.set("publisher", publisher);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="basic" id="dropdown-basic">
          {selectedPublisher} <ChevronDown className="ms-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-menu-end"
          style={{ minWidth: "100%" }}
        >
          {publishers?.map((publisher) => (
            <Dropdown.Item key={publisher.key} eventKey={publisher.key}>
              {publisher.key}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default PublisherSelectorDropdown;
