import { ClearPageFiltersButton } from "./ClearPageFiltersButton";
import PublisherSelectorDropdown from "./PublisherSelectorDropdown";

export const PageFilters = ({ publishers }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <PublisherSelectorDropdown publishers={publishers} />
      <ClearPageFiltersButton />
    </div>
  );
};
