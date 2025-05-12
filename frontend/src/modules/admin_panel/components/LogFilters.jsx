import { ClearPageFiltersButton } from "../../monitoring/components/ClearPageFiltersButton";
import DateRangeSelector from "../../monitoring/components/DateRangeSelector";
import PublisherSelectorDropdown from "../../monitoring/components/PublisherSelectorDropdown";
import StatusSelectorDropdown from "../../monitoring/components/StatusSelectorDropdown";
import TypeSelectorDropdown from "../../monitoring/components/TypeSelectorDropdown";
import DataspaceSelectorDropdown from "./DataspaceSelectorDropdown";

export const LogFilters = ({ dataspaces, publishers }) => {
  const statuses = ["success", "fail"];
  const types = ["upload", "edit", "delete", "download"];

  return (
    <div className="d-flex align-items-center gap-2">
      <TypeSelectorDropdown types={types} />
      <StatusSelectorDropdown statuses={statuses} />
      <DataspaceSelectorDropdown dataspaces={dataspaces} />
      <PublisherSelectorDropdown publishers={publishers} />
      <DateRangeSelector />
      <ClearPageFiltersButton />
    </div>
  );
};
