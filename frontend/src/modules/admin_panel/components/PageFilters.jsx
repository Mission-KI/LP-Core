import { ClearPageFiltersButton } from "../../monitoring/components/ClearPageFiltersButton";
import PublisherSelectorDropdown from "../../monitoring/components/PublisherSelectorDropdown";
import DataspaceSelectorDropdown from "./DataspaceSelectorDropdown";
export const PageFilters = ({ dataspaces, publishers }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <DataspaceSelectorDropdown dataspaces={dataspaces} />
      <PublisherSelectorDropdown publishers={publishers} />
      <ClearPageFiltersButton />
    </div>
  );
};
