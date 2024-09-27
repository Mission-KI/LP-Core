import React, { useState } from 'react'
import { Filter, Search } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './SearchBar.module.css'
import { Question } from 'react-bootstrap-icons'
import Dropdown from 'react-bootstrap/Dropdown';

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const [filtersDropdopwnVisible, setFiltersDropdopwnVisible] = useState(false);

    const toggleFiltersDropdown = () => {
        setFiltersDropdopwnVisible(!filtersDropdopwnVisible);
    }

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className="d-flex w-100">
            <InputGroup className={styles.searchBarWrapper}>
                <InputGroup.Text>
                    <Search />
                </InputGroup.Text>
                <Form.Control
                    onChange={handleChange}
                    type="search"
                    placeholder="Search datasets..."
                    value={searchTerm}
                />
                <InputGroup.Text>
                    <div onClick={toggleFiltersDropdown} className='rounded-lg hover pointer p-1'>
                        <Filter className='me-2' /> <span className='medium'>Filters</span>
                    </div>
                </InputGroup.Text>

                <Dropdown show={filtersDropdopwnVisible} align="end">
                    <Dropdown.Menu align="end">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </InputGroup>
            <div className='ps-3'>
                <div className='rounded-circle border bg-white d-flex justify-content-center align-items-center' style={{ width: 42, height: 42 }}>
                    <Question className='h5 m-0' />
                </div>
            </div>
        </div>

    );
}

export default SearchBar
