import React, { useState, useEffect, useRef } from 'react';
import { Filter, Search, Question } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './SearchBar.module.css';
import SearchSuggestions from './SearchSuggestions';
import { useNavigate } from 'react-router';
import Filters from '../Filters/Filters';

function MainSearchBar({ datasets }) {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [filtersDropdopwnVisible, setFiltersDropdopwnVisible] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const toggleFiltersDropdown = () => {
        setFiltersDropdopwnVisible(!filtersDropdopwnVisible);
    };

    const handleChange = e => {
        const newSearchTerm = e.target.value;
        setLocalSearchTerm(newSearchTerm);
        if (newSearchTerm !== '') {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newSearchTerm = e.target.elements.query.value;
        const params = new URLSearchParams(window.location.search);
        params.set('q', newSearchTerm);
        navigate(`/?${params.toString()}`);
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
                    placeholder="Search datasets..."
                    value={localSearchTerm}
                />
                <SearchSuggestions
                    localSearchTerm={localSearchTerm}
                    setLocalSearchTerm={setLocalSearchTerm}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                />

                <InputGroup.Text>
                    <Dropdown show={filtersDropdopwnVisible}>
                        <div onClick={toggleFiltersDropdown} className='rounded-lg hover pointer p-1'>
                            <Filter className='me-2' /> <span className='medium'>Filters</span>
                        </div>
                        <Dropdown.Menu className='border-0 shadow-sm' style={{ width: 300, top: 0, transform: 'translate(-65%, 50px)' }}>
                            <Filters datasets={datasets} />
                        </Dropdown.Menu>
                    </Dropdown>
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
