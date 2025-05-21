import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getAutocompleteSuggestions } from "../../api/elastic";
import { useSettings } from "../../contexts/SettingsContext";
import { getQuerySuggestions } from "../../../search/utils/query_suggestions";

function SimilarEdpSuggestions({
  localSearchTerm,
  setLocalSearchTerm,
  showSuggestions,
  setShowSuggestions,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { expertMode } = useSettings();

  const handleSelectSuggestion = (suggestion) => {
    setLocalSearchTerm(suggestion);
    setShowSuggestions(false);

    const params = new URLSearchParams(window.location.search);
    params.set("q", suggestion);
    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (localSearchTerm) {
        try {
          const fetchedSuggestions =
            await getAutocompleteSuggestions(localSearchTerm);

          const mergedSuggestions = expertMode
            ? [
                ...new Set([
                  ...getQuerySuggestions(localSearchTerm),
                  ...fetchedSuggestions,
                ]),
              ]
            : fetchedSuggestions;

          setSuggestions(mergedSuggestions.slice(0, 10));
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [localSearchTerm, expertMode]);

  return (
    showSuggestions && (
      <Dropdown.Menu
        show
        className="border-0 shadow rounded w-100 bgc-body"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 10,
          transform: "translateY(10px)",
        }}
      >
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <span className="txt-lighter">{suggestion}</span>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>No suggestions found</Dropdown.Item>
        )}
      </Dropdown.Menu>
    )
  );
}

export default SimilarEdpSuggestions;
