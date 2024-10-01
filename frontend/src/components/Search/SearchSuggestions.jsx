import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function SearchSuggestions({ localSearchTerm, setLocalSearchTerm, showSuggestions, setShowSuggestions }) {
    const suggestions = ['BeebucketCsv', 'Another wonderful test', 'Another test to have more variety', 'Test'];
    const navigate = useNavigate();

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(localSearchTerm.toLowerCase())
    );

    const handleSelectSuggestion = (suggestion) => {
        setLocalSearchTerm(suggestion);
        setShowSuggestions(false);
        navigate('/?q='+suggestion);
    }

    return showSuggestions ? (
        <Dropdown.Menu show className="border-0 shadow-sm rounded-lg w-100" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, transform: 'translateY(10px)' }}>
            {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                    <Dropdown.Item key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                        {suggestion}
                    </Dropdown.Item>
                ))
            ) : (
                <Dropdown.Item disabled>No suggestions found</Dropdown.Item>
            )}
        </Dropdown.Menu>
    ) : null;
}

export default SearchSuggestions;
