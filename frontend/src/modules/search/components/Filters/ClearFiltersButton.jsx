import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export const ClearFiltersButton = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClearFilters = () => {
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className="mt-2">
      <button className="btn btn-contrast medium" onClick={handleClearFilters}>
        {t("filters.clear")}
      </button>
    </div>
  );
};
