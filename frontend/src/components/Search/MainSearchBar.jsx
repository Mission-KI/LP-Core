import React, { useState, useEffect, useRef } from 'react';
import { Filter, Search, Question } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './SearchBar.module.css';
import SearchSuggestions from './SearchSuggestions';
import { useNavigate } from 'react-router';

function MainSearchBar({ setSearchTerm }) {
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
        setSearchTerm(newSearchTerm);
        if (newSearchTerm !== '') {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
        navigate('/?q='+newSearchTerm);
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
        <div className="d-flex w-100" ref={inputRef}>
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
                        <Dropdown.Menu className='border-0 shadow-sm' style={{ top: 0, transform: 'translate(-65%, 50px)' }}>
                            <div className='py-3 px-3'>
                                <div className='mb-3'>
                                    <label className='mb-1'>Tags</label>
                                    <input type="text" className='form-control' placeholder='keywords' />
                                </div>
                                <div className='mb-3'>
                                    <label className='mb-1'>Dataroom</label>
                                    <div className='d-flex'>
                                        <button className='btn btn-basic rounded-lg me-2'>MDS</button>
                                        <button className='btn btn-basic rounded-lg me-2'>Medien</button>
                                        <button className='btn btn-basic rounded-lg me-2'>NAP</button>
                                        <button className='btn btn-basic rounded-lg me-2'>Other</button>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label className='mb-1'>File Size</label> <br />
                                    <input type="range" min={0} max={5} className='w-100' />
                                </div>
                                <div className='mb-3'>
                                    <label className='mb-1'>Data Structure</label>
                                    <div className='d-flex'>
                                        <button className='btn btn-basic rounded-lg me-2'>Video & Image</button>
                                        <button className='btn btn-basic rounded-lg me-2'>Audio</button>
                                        <button className='btn btn-basic rounded-lg me-2'>Documents</button>
                                        <button className='btn btn-basic rounded-lg me-2'>Graphs</button>
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup.Text>
            </InputGroup>
            <div className='ps-3'>
                <div className='rounded-circle border bg-white d-flex justify-content-center align-items-center' style={{ width: 42, height: 42 }}>
                    <Question className='h5 m-0' />
                </div>
            </div>
        </div>
    );
}

export default MainSearchBar;
