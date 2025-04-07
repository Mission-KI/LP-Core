import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { ChevronDown, XLg } from "react-bootstrap-icons";

const PublisherSelectorDropdown = ({ analytics }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedPublisher, setSelectedPublisher] = useState(searchParams.get("publisher") || "Select Publisher");

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

    const clearSelection = () => {
        searchParams.delete("publisher");
        navigate(`?${searchParams.toString()}`);
        setSelectedPublisher("Select Publisher");
    };

    return (
        <div className="mb-3 d-flex align-items-center gap-2">
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="basic" id="dropdown-basic">
                    {selectedPublisher} <ChevronDown className="ms-2" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end w-100">
                    {analytics?.publishers?.map((publisher) => (
                        <Dropdown.Item key={publisher.key} eventKey={publisher.key}>
                            {publisher.key}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            {selectedPublisher !== "Select Publisher" && (
                <button
                    className="btn btn-danger d-flex align-items-center"
                    onClick={clearSelection}
                >
                    <XLg className="me-2" /> Clear
                </button>
            )}
        </div>
    );
};

export default PublisherSelectorDropdown;
