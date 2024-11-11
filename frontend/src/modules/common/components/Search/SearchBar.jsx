import React, { useEffect, useRef, useState } from 'react';
import { Search, X, Question, Star, StarFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router';
import SearchSuggestions from './SearchSuggestions';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../widgets/LanguageSelector';
import HelpModal from '../../../search_engine/components/HelpModal/HelpModal';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../../utils/bookmarks';

function SearchBar() {

    const { t } = useTranslation();

    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = e => {
        const newSearchTerm = e.target.value;
        setLocalSearchTerm(newSearchTerm);
        setShowSuggestions(newSearchTerm !== '');
    };

    const clearSearch = () => {
        setLocalSearchTerm('');
        setShowSuggestions(false);
        inputRef.current.querySelector('input').focus();
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

    const handleOnSubmit = e => {
        e.preventDefault();
        navigate('/?q=' + localSearchTerm);
    };

    const handleFocus = () => {
        if (localSearchTerm !== '') {
            setShowSuggestions(true);
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-between w-100'>
            <form className="d-flex align-items-center w-100" style={{ maxWidth: 700 }} onSubmit={handleOnSubmit} ref={inputRef}>
                <InputGroup className={styles.searchBarWrapper}>
                    <InputGroup.Text>
                        <Search />
                    </InputGroup.Text>
                    <Form.Control
                        onChange={handleChange}
                        onFocus={handleFocus}
                        type="search"
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
                </InputGroup>

                <div className='ps-3'>
                    <HelpModal />
                </div>
                <div className='ps-3'>
                    <button
                        onClick={() => navigate('/bookmarks')}
                        className="navIconModalToggleWrapper"
                    >
                        {getBookmarks().length > 0 ? (
                            <StarFill className='h5 m-0' />
                        ) : (
                            <Star className='h5 m-0' />
                        )}
                    </button>
                </div>
            </form >
            <LanguageSelector />
        </div >
    );
}

export default SearchBar;
