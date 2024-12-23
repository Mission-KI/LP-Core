import React, { useState, useEffect, useRef } from 'react';
import { Filter, Search, Question, X, Star, StarFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './SearchBar.module.css';
import SearchSuggestions from './SearchSuggestions';
import { useNavigate, useLocation } from 'react-router-dom';
import Filters from '../../../search_engine/components/Filters/Filters';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../../utils/bookmarks';

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

                <InputGroup.Text className='position-relative'>
                    <Filters />
                </InputGroup.Text>
            </InputGroup>
            <div className='ps-2 d-none d-md-block'>
                <Link to="/help"
                    className="btn px-1 h-100 d-flex align-items-center"
                >
                    <Question className='h3 m-0' />
                </Link>
            </div>
            <div className='ps-1 d-none d-md-block'>
                <Link to="/bookmarks"
                    className="btn px-1 h-100 d-flex align-items-center"
                >
                    {getBookmarks().length > 0 ? (
                        <StarFill className='h5 m-0' />
                    ) : (
                        <Star className='h5 m-0' />
                    )}
                </Link>
            </div>

        </form>
    );
}

export default MainSearchBar;
