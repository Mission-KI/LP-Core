import { useEffect, useState } from "react";
import SearchBar from "../../../common/components/Search/SearchBar";
import { useTranslation } from "react-i18next";
import Filters from "../Filters/Filters";
import Sorting from "../Sorting/Sorting";
import { useSettings } from "../../../common/contexts/SettingsContext";
import { ChevronDown } from "react-bootstrap-icons";

const HeroSection = () => {
  const { t } = useTranslation();
  const { alwaysExpandFilters } = useSettings();

  const toggleFiltersDropdown = () => {
    setFiltersDropdownVisible(!filtersDropdownVisible);
  };

  useEffect(() => {
    if (alwaysExpandFilters) {
      setFiltersDropdownVisible(alwaysExpandFilters);
    }
  }, [alwaysExpandFilters]);

  const [filtersDropdownVisible, setFiltersDropdownVisible] =
    useState(alwaysExpandFilters);

  return (
    <div className="container pb-4 pt-3 pt-md-5" style={{ maxWidth: 1100 }}>
      <div className="row pb-3">
        <div className="col-md-6">
          <h2
            className="bold mb-2 text-decoration-none"
            style={{ width: "fit-content" }}
          >
            {t("page.title")}
          </h2>
          <p
            className="txt-lighter pb-2"
            style={{ fontSize: 17, maxWidth: 450 }}
          >
            {t("page.shortDescription")}
          </p>
        </div>
      </div>

      <SearchBar />

      <div className="d-flex align-items-center mt-2 mb-3">
        <button
          onClick={toggleFiltersDropdown}
          className="btn rounded-lg px-0 me-3 mb-1"
        >
          <span className="medium txt-lighter">
            {t("header.filters")}{" "}
            <ChevronDown
              className={`small ms-1 transition-chevron ${filtersDropdownVisible ? "rotate" : ""}`}
            />
          </span>
        </button>
        <Sorting />
      </div>
      <Filters
        filtersDropdownVisible={filtersDropdownVisible}
        setFiltersDropdownVisible={setFiltersDropdownVisible}
      />
    </div>
  );
};

export default HeroSection;
