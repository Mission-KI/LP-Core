import React, { useEffect, useState, useRef } from 'react';
import { useFilterSections } from '../../../common/utils/filter_utils';
import { FormGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './Filters.module.css';
import { Dropdown } from 'react-bootstrap';
import { ChevronDown, Filter } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

function Filters() {

    const filterSections = useFilterSections();
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
                    newCheckedRadios[filter.name] = queryParams[filter.name]?.[0];
                    console.log(newCheckedRadios)
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

        navigate(`/?${params.toString()}`, { replace: true });
    };

    const updateDoubleRangeParams = (name_1, name_2, values) => {
        const params = new URLSearchParams(location.search);
        params.set(name_1, values[0]);
        params.set(name_2, values[1]);
        navigate(`/?${params.toString()}`, { replace: true });
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
    };

    const handleDoubleRangeComplete = (filter, values) => {
        updateDoubleRangeParams(filter.name_1, filter.name_2, values);
    };

    const handleRadioChange = (filter) => {
        const params = new URLSearchParams(location.search);
        params.delete(filter.name);
        params.set(filter.name, filter.value);
        setCheckedRadios((prev) => ({
            ...prev,
            [filter.name]: filter.value,
        }));
        navigate(`/?${params.toString()}`, { replace: true });
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
        <Dropdown show={filtersDropdownVisible} style={{ width: 'fit-content' }}>
            <button onClick={toggleFiltersDropdown} className='btn rounded-lg mt-2'>
                <span className='medium txt-lighter fw-500'>{t('header.filters')} <ChevronDown className='small ms-1' /></span>
            </button>
            <Dropdown.Menu ref={dropdownRef} className='border-0 shadow px-2' style={{ top: 0, left: 0, transform: 'translate(0%, 50px)', zIndex: 1 }}>

                <div className={`${styles.filtersWrapper} row`}>
                    {filterSections.map((filterSection) => (
                        <FormGroup key={filterSection.title}
                            className={`mb-4 ${filterSection.type === 'checkboxes' || filterSection.type === 'radio'
                                ? 'col-md-6'
                                : filterSection.type === 'single_icon'
                                    ? 'col-md-2'
                                    : ''
                                }`}>

                            {filterSection.title && (
                                <label className="mb-2 small fw-500 text-uppercase">
                                    {t(`filters.${filterSection.title}`)}
                                </label>
                            )}

                            <div className='d-flex flex-wrap w-100 align-items-center py-1 position-relative'>
                                {filterSection.type == 'checkboxes' ? (
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id={`dropdown-filters-${filterSection.type}`} className='medium px-0 txt-primary text-decoration-none'>
                                            {t('filters.select')} <ChevronDown className='small ms-2' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className='border-0 shadow rounded'>
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
                                ) : filterSection.type == 'single_icon' ? (
                                    <div>
                                        {
                                            filterSection.filters.map((filter) => (
                                                <button key={filter.value}
                                                    type="button"
                                                    className={`btn mb-2 ${checkedOptions[filter.label] ? 'text-black bold' : 'text-secondary'}`}
                                                    id={`checkbox-${filter.value}`}
                                                    name={filter.name}
                                                    value={filter.value}
                                                    checked={checkedOptions[filter.label] || false}
                                                    onClick={() => handleCheckboxChange(filter)}
                                                    autoComplete="off"
                                                >
                                                    {filter.icon}
                                                </button>
                                            ))
                                        }
                                    </div>
                                ) : filterSection.type == 'doublerange' ? (
                                    <>
                                        {
                                            filterSection.filters.map((filter) => (
                                                <div style={{ width: 300 }}>
                                                    <div className='d-flex flex-column w-100'>
                                                        <label className='small txt-lighter'>{t(`filters.${filter.label}`)}</label>
                                                        <Slider
                                                            range
                                                            className='w-100'
                                                            min={filter.minValue}
                                                            max={filter.maxValue}
                                                            value={rangeValues[filter.name_1] || [filter.minValue, filter.maxValue]}
                                                            onChange={(values) => handleDoubleRangeChange(filter, values)}
                                                            onChangeComplete={(values) => handleDoubleRangeComplete(filter, values)}
                                                        />
                                                        <div className='d-flex justify-content-between mt-2'>
                                                            <span className='small txt-lighter'>{rangeValues[filter.name_1]?.[0] || filter.minValue}</span>
                                                            <span className='small txt-lighter'>{rangeValues[filter.name_1]?.[1] || filter.maxValue}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : filterSection.type == 'filesize' ? (
                                    <>
                                        {
                                            filterSection.filters.map((filter) => (
                                                <div style={{ width: 300 }}>
                                                    <div className='d-flex flex-column w-100'>
                                                        <label className='small txt-lighter'>{t('filters.sizeRange')}</label>
                                                        <div className='position-relative'>
                                                            <Slider
                                                                range
                                                                className='w-100'
                                                                min={filter.minValue}
                                                                max={filter.maxValue}
                                                                value={rangeValues[filter.name_1] || [filter.minValue, filter.maxValue]}
                                                                onChange={(values) => handleDoubleRangeChange(filter, values)}
                                                                onChangeComplete={(values) => handleDoubleRangeComplete(filter, values)}
                                                            />
                                                            <div className={styles.sizeGroupSeparators}>
                                                                <div className={styles.sizeGroupSeparator}></div>
                                                                <div className={styles.sizeGroupSeparator}></div>
                                                                <div className={styles.sizeGroupSeparator}></div>
                                                                <div className={styles.sizeGroupSeparator}></div>
                                                                <div className={styles.sizeGroupSeparator}></div>
                                                            </div>
                                                        </div>

                                                        <div className='d-flex justify-content-around mt-2'>
                                                            <span className='small txt-lighter p-0'>KB</span>
                                                            <span className='small txt-lighter'>MB</span>
                                                            <span className='small txt-lighter'>GB</span>
                                                            <span className='small txt-lighter'>TB</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                )
                                    : filterSection.type === 'radio' ? (
                                        <>
                                            {
                                                <div className="d-flex flex-wrap">
                                                    {filterSection.filters.map((filter) => (
                                                        <button
                                                            key={filter.value}
                                                            type="button"
                                                            className={`btn mb-2 ${checkedRadios[filter.name] === filter.value ? 'bold' : 'text-secondary'}`}
                                                            onClick={() => handleRadioChange(filter)}
                                                        >
                                                            {filter.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            }
                                        </>
                                    ) : ''}

                            </div>
                        </FormGroup>
                    ))}
                    <div className="d-flex justify-content-end mt-3">
                        <button
                            className="btn btn-dark medium"
                            onClick={handleClearFilters}
                        >
                            {t('filters.clear')}
                        </button>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown >
    );
}

export default Filters;
