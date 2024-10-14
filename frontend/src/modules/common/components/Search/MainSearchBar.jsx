import React, { useState, useEffect, useRef } from 'react';
import { Filter, Search, Question, X } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './SearchBar.module.css';
import SearchSuggestions from './SearchSuggestions';
import { useNavigate } from 'react-router';
import Filters from '../../../search_engine/components/Filters/Filters';
import { useTranslation } from 'react-i18next';

function MainSearchBar({ datasets }) {

    const { t } = useTranslation();

    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef(null);
    const navigate = useNavigate();

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
                <InputGroup.Text>
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
                        <X />
                    </InputGroup.Text>
                )}
                <SearchSuggestions
                    localSearchTerm={localSearchTerm}
                    setLocalSearchTerm={setLocalSearchTerm}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                />

                <InputGroup.Text>
                    <Filters datasets={datasets} />
                </InputGroup.Text>
            </InputGroup>
            <div className='ps-3'>
                <div className='rounded-circle border bg-white d-flex justify-content-center align-items-center' style={{ width: 42, height: 42 }}>
                    <Question className='h5 m-0' />
                </div>
            </div>
        </form>
    );
}

export default MainSearchBar;
