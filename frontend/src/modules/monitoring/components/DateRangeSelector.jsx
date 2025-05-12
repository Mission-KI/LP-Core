import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useSearchParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeSelector = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const updateURLParams = (start, end) => {
    const params = new URLSearchParams(searchParams);

    if (start && end) {
      params.set("period_start", start.toISOString().split("T")[0]);
      params.set("period_end", end.toISOString().split("T")[0]);
    } else {
      params.delete("period_start");
      params.delete("period_end");
    }

    navigate(`?${params.toString()}`);
  };

  const handleDateChange = (update) => {
    setDateRange(update);
    updateURLParams(update[0], update[1]);
  };

  useEffect(() => {
    const start = searchParams.get("period_start");
    const end = searchParams.get("period_end");

    if (start && end) {
      setDateRange([new Date(start), new Date(end)]);
    } else {
      setDateRange([null, null]);
    }
  }, [searchParams]);

  return (
    <div className="d-flex gap-3 align-items-center">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        isClearable
        placeholderText="Select date range"
        className="btn btn-basic py-2 px-4"
      />
    </div>
  );
};

export default DateRangeSelector;
