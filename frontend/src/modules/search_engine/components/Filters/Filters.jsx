import React, { useEffect, useState, useRef } from 'react';
import { filterSections } from '../../../common/utils/filter_utils';
import { FormGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './Filters.module.css';
import { Dropdown } from 'react-bootstrap';
import { ChevronDown, Filter } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

function Filters({ datasets }) {

    const [filtersDropdownVisible, setFiltersDropdownVisible] = useState(false);
    const [checkedOptions, setCheckedOptions] = useState({});
    const [checkedRadios, setCheckedRadios] = useState({});
    const [rangeValues, setRangeValues] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const dropdownRef = useRef(null);

    const handleClearFilters = () => {
        navigate(location.pathname, { replace: true });
    };

    const toggleFiltersDropdown = () => {
        setFiltersDropdownVisible(!filtersDropdownVisible);
    };

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        const queryObj = {};
        params.forEach((value, key) => {
            if (!queryObj[key]) {
                queryObj[key] = [];
            }
            queryObj[key].push(value);
        });
        return queryObj;
    };

    useEffect(() => {
        const queryParams = getQueryParams();
        const newCheckedOptions = {};
        const newRangeValues = {};
        const newCheckedRadios = {};

        filterSections.forEach((filterSection) => {
            filterSection.filters.forEach((filter) => {
                if (filter.type === 'checkbox') {
                    newCheckedOptions[filter.label] = queryParams[filter.name]?.includes(filter.value) || false;
                }
                if (filter.type === 'doublerange') {
                    newRangeValues[filter.name_1] = [
                        queryParams[filter.name_1]?.[0] || filter.minValue,
                        queryParams[filter.name_2]?.[0] || filter.maxValue,
                    ];
                } else if (filter.type === 'range') {
                    newRangeValues[filter.name] = queryParams[filter.name]?.[0] || filter.minValue;
                }

                if (filter.type === 'radio') {
                    newCheckedRadios[filter.name] = queryParams[filter.name]?.[0] || '';
                }
            });
        });

        setCheckedOptions(newCheckedOptions);
        setRangeValues(newRangeValues);
        setCheckedRadios(newCheckedRadios);
    }, [location]);

    const updateQueryParams = (name, value, checked) => {
        const params = new URLSearchParams(location.search);
        if (checked) {
            params.append(name, value);
        } else {
            const allValues = params.getAll(name);
            params.delete(name);
            allValues
                .filter(v => v !== value)
                .forEach(v => params.append(name, v));
        }

        navigate(`?${params.toString()}`, { replace: true });
    };

    const updateDoubleRangeParams = (name_1, name_2, values) => {
        const params = new URLSearchParams(location.search);
        params.set(name_1, values[0]);
        params.set(name_2, values[1]);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleCheckboxChange = (filter) => {
        const isChecked = !checkedOptions[filter.label];
        setCheckedOptions((prev) => ({
            ...prev,
            [filter.label]: isChecked,
        }));
        updateQueryParams(filter.name, filter.value, isChecked);
    };

    const handleDoubleRangeChange = (filter, values) => {
        setRangeValues((prev) => ({
            ...prev,
            [filter.name_1]: values,
        }));
        updateDoubleRangeParams(filter.name_1, filter.name_2, values);
    };

    const handleRadioChange = (filter, value) => {
        setCheckedRadios((prev) => ({
            ...prev,
            [filter.name]: value,
        }));
        updateQueryParams(filter.name, value, true);
    };

    const handleClickOutside = (event) => {
        if (filtersDropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setFiltersDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filtersDropdownVisible]);

    return (
        <Dropdown show={filtersDropdownVisible}>
            <div onClick={toggleFiltersDropdown} className='rounded-lg hover pointer p-1'>
                <Filter className='me-2' /> <span className='medium'>{t('header.filters')}</span>
            </div>
            <Dropdown.Menu ref={dropdownRef} className='border-0 shadow rounded-lg px-2' style={{ width: 350, top: 0, transform: 'translate(-65%, 50px)' }}>

                <div className={styles.filtersWrapper}>
                    {filterSections.map((filterSection) => (
                        <FormGroup key={filterSection.title} className='mb-4'>
                            <label className='mb-2 small fw-500 text-uppercase'>{filterSection.title}</label>
                            <div className='d-flex flex-wrap w-100 align-items-center py-1'>
                                {filterSection.type == 'checkboxes' ? (
                                    <Dropdown>
                                        <Dropdown.Toggle variant="basic" id="dropdown-basic" className='medium' style={{ width: 200 }}>
                                            Select {filterSection.title} <ChevronDown className='small ms-2' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                filterSection.filters.map((filter) => (
                                                    <Dropdown.Item key={filter.value} as="div" className="d-flex align-items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`checkbox-${filter.value}`}
                                                            name={filter.name}
                                                            value={filter.value}
                                                            checked={checkedOptions[filter.label] || false}
                                                            onChange={() => handleCheckboxChange(filter)}
                                                            autoComplete="off"
                                                        />
                                                        <label
                                                            htmlFor={`checkbox-${filter.value}`}
                                                            className="ms-2 mb-0"
                                                        >
                                                            {filter.label}
                                                        </label>
                                                    </Dropdown.Item>
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ) : filterSection.type == 'doublerange' ? (
                                    <>
                                        {
                                            filterSection.filters.map((filter) => (
                                                <div style={{ width: 300 }}>
                                                    <div className='d-flex flex-column w-100'>
                                                        <label className='small text-muted'>{filter.label}</label>
                                                        <Slider
                                                            range
                                                            className='w-100'
                                                            min={filter.minValue}
                                                            max={filter.maxValue}
                                                            value={rangeValues[filter.name_1] || [filter.minValue, filter.maxValue]}
                                                            onChange={(values) => handleDoubleRangeChange(filter, values)}
                                                        />
                                                        <div className='d-flex justify-content-between mt-2'>
                                                            <span className='small text-muted'>{rangeValues[filter.name_1]?.[0] || filter.minValue}</span>
                                                            <span className='small text-muted'>{rangeValues[filter.name_1]?.[1] || filter.maxValue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : filterSection.type === 'radio' ? (
                                    <>
                                        {
                                            filterSection.filters.map((filter) => (
                                                <div className='d-flex py-1'>
                                                    <input
                                                        type='radio'
                                                        name={filter.name}
                                                        value={filter.value}
                                                        checked={checkedRadios[filter.name] === filter.value}
                                                        onChange={() => handleRadioChange(filter, filter.value)}
                                                    />
                                                    <label className='medium ps-2 text-muted'>{filter.label}</label>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : ''}

                            </div>
                        </FormGroup>
                    ))}
                    <div className="d-flex justify-content-end mt-3">
                        <button
                            className="btn btn-primary medium rounded-lg"
                            onClick={handleClearFilters}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Filters;
