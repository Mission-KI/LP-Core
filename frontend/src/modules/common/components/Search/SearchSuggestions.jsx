import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getAutocompleteSuggestions } from '../../api/elastic';

function SearchSuggestions({ localSearchTerm, setLocalSearchTerm, showSuggestions, setShowSuggestions }) {
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSelectSuggestion = (suggestion) => {
        setLocalSearchTerm(suggestion);
        setShowSuggestions(false);

        const params = new URLSearchParams(window.location.search);
        params.set('q', suggestion);
        navigate(`/?${params.toString()}`);
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (localSearchTerm) {
                try {
                    const fetchedSuggestions = await getAutocompleteSuggestions(localSearchTerm);
                    setSuggestions(fetchedSuggestions);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [localSearchTerm]);

    return showSuggestions && (
        <Dropdown.Menu show className="border-0 shadow-sm rounded-lg w-100" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, transform: 'translateY(10px)' }}>
            {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                    <Dropdown.Item key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                        <span className='txt-lighter'>{suggestion}</span>
                    </Dropdown.Item>
                ))
            ) : (
                <Dropdown.Item disabled>No suggestions found</Dropdown.Item>
            )}
        </Dropdown.Menu>
    );
}

export default SearchSuggestions;
