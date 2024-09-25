import React from 'react'
import { Filter, Search } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './SearchBar.module.css'
import { Question } from 'react-bootstrap-icons'

function SearchBar() {

    const [searchTerm, setSearchTerm] = React.useState('');

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
                    placeholder="Search..."
                    value={searchTerm}
                />
                <InputGroup.Text>
                    <Filter className='me-2' /> <span className='medium'>Filters</span>
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

export default SearchBar
