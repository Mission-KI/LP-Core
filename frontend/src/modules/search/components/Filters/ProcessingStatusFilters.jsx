import {
  Sliders2Vertical,
  Soundwave,
  Activity,
  Calendar,
} from "react-bootstrap-icons";
import { ProcessingStatusFilter } from "./ProcessingStatusFilter";

export const ProcessingStatusFilters = () => {
  const filters = [
    {
      label: "Date time attribute",
      icon: <Calendar />,
      helpTopic: "/data-formats-and-analysis#date-time-attribute-section",
      urlParam: "hasDatetimeAttribute",
    },
    {
      label: "Temporal frequency",
      icon: <Soundwave />,
      helpTopic: "/data-formats-and-analysis#temporal-frequency-section",
      urlParam: "hasTemporalFrequency",
    },
    {
      label: "Data type consistency",
      icon: <Sliders2Vertical />,
      helpTopic: "/data-formats-and-analysis#data-type-consistency-section",
      urlParam: "dataTypeConsistency",
    },
    {
      label: "Significant variance",
      icon: <Activity />,
      helpTopic: "/data-formats-and-analysis#significant-variance-section",
      urlParam: "significantVariance",
    },
  ];

  return (
    <>
      {filters.map((filter, index) => (
        <ProcessingStatusFilter
          key={index}
          urlParam={filter.urlParam}
          icon={filter.icon}
          label={filter.label}
          helpTopic={filter.helpTopic}
        />
      ))}
    </>
  );
};
