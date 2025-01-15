import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './SearchBar.module.css';
import SearchSuggestions from './SearchSuggestions';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MainSearchBar() {

    const { t } = useTranslation();

    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchTermFromUrl = queryParams.get('q');

        if (searchTermFromUrl) {
            setLocalSearchTerm(searchTermFromUrl);
        }

    }, [location]);

    const handleChange = e => {
        const newSearchTerm = e.target.value;
        setLocalSearchTerm(newSearchTerm);
        if (newSearchTerm !== '') {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const clearSearch = () => {
        setLocalSearchTerm('');
        setShowSuggestions(false);
        inputRef.current.querySelector('input').focus();
        const params = new URLSearchParams(window.location.search);
        params.set('q', '');
        params.delete('page');
        navigate(`/?${params.toString()}`);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newSearchTerm = e.target.elements.query.value;
        const params = new URLSearchParams(window.location.search);
        params.set('q', newSearchTerm);
        params.delete('page');
        navigate(`/?${params.toString()}`);
        setShowSuggestions(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);

    const handleFocus = () => {
        if (localSearchTerm !== '') {
            setShowSuggestions(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex w-100" ref={inputRef}>
            <InputGroup className={styles.searchBarWrapper}>
                <InputGroup.Text className='ps-4 pe-3'>
                    <Search />
                </InputGroup.Text>
                <Form.Control
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="search"
                    name='query'
                    autoComplete="off"
                    id={styles.searchBar}
                    placeholder={t('header.search_placeholder')}
                    value={localSearchTerm}
                />
                {localSearchTerm && (
                    <InputGroup.Text onClick={clearSearch} style={{ cursor: 'pointer' }}>
                        <X className='h4 mb-0' />
                    </InputGroup.Text>
                )}
                <SearchSuggestions
                    localSearchTerm={localSearchTerm}
                    setLocalSearchTerm={setLocalSearchTerm}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                />
            </InputGroup>

        </form>
    );
}

export default MainSearchBar;