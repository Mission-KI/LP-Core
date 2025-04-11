import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ChevronDown, List, SortDown, SortUp } from "react-bootstrap-icons";

const Sorting = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSortChange = (selectedValue) => {
    const params = new URLSearchParams(searchParams);

    if (selectedValue === "default") {
      params.delete("sorting");
    } else {
      params.set("sorting", selectedValue);
    }

    setSearchParams(params);
  };

  const options = [
    {
      value: "default",
      label: (
        <span className="d-flex justify-content-between align-items-center">
          Default <List className="ms-5" />
        </span>
      ),
    },
    {
      value: "oldest",
      label: (
        <span className="d-flex justify-content-between align-items-center">
          Oldest first <SortDown className="ms-5" />
        </span>
      ),
    },
    {
      value: "newest",
      label: (
        <span className="d-flex justify-content-between align-items-center">
          Newest first <SortUp className="ms-5" />
        </span>
      ),
    },
  ];

  const currentSorting = searchParams.get("sorting");

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          variant="text"
          className="btn rounded-lg py-0 px-0 mb-1"
        >
          <span className="medium txt-lighter">
            Sort <ChevronDown className="small ms-1" />
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="border-0 shadow mt-2">
          {options.map((option) => (
            <Dropdown.Item
              key={option.value}
              active={currentSorting === option.value}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Sorting;
