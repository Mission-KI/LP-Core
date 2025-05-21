import { ClearPageFiltersButton } from "./ClearPageFiltersButton";
import DateRangeSelector from "./DateRangeSelector";
import PublisherSelectorDropdown from "./PublisherSelectorDropdown";
import StatusSelectorDropdown from "./StatusSelectorDropdown";
import TypeSelectorDropdown from "./TypeSelectorDropdown";

export const LogFilters = ({ publishers }) => {
  const statuses = ["success", "fail"];
  const types = ["upload", "edit", "delete", "download"];

  return (
    <div className="d-flex align-items-center gap-2">
      <TypeSelectorDropdown types={types} />
      <StatusSelectorDropdown statuses={statuses} />
      <PublisherSelectorDropdown publishers={publishers} />
      <DateRangeSelector />
      <ClearPageFiltersButton />
    </div>
  );
};
