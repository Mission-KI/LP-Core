import React, { useEffect, useState, useRef } from 'react';
import { useFilterSections } from '../../../common/utils/filter_utils';
import { FormGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './Filters.module.css';
import { Dropdown } from 'react-bootstrap';
import { ChevronDown, X } from 'react-bootstrap-icons';
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

    const removeFilter = (key) => {
        const params = new URLSearchParams(location.search);
        params.delete(key);
        navigate(`${location.pathname}?${params.toString()}`);
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

    const [selectedFilters, setSelectedFilters] = useState({});
    const ignoredKeys = ["q", "page"];

    useEffect(() => {
        const queryParams = getQueryParams();
        setSelectedFilters(queryParams);
    }, [location]);

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

        params.delete("page");

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
        params.delete("page");

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
        params.delete("page");
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
        <div>
            <div className='d-flex align-items-center mt-4 mb-3'>
                <button onClick={toggleFiltersDropdown} className='btn rounded-lg px-0 me-3 mb-1'>
                    <span className='medium txt-lighter fw-500'>{t('header.filters')} <ChevronDown className='small ms-1' /></span>
                </button>
                <div className='d-flex flex-wrap'>
                    {Object.entries(selectedFilters)
                        .filter(([key]) => !ignoredKeys.includes(key))
                        .map(([key, values]) => (
                            <div key={key} className="bgc-light-gray px-2 rounded me-2 mb-1">
                                <span className="small">{key}</span>:{" "}
                                <span className="small txt-lighter">{values.join(", ")}</span>
                                <button
                                    onClick={() => removeFilter(key)}
                                    className="btn hover-lg txt-regular p-0 small ms-2"
                                >
                                    <X />
                                </button>
                            </div>
                        ))}

                </div>
            </div>

            <div className={`${!filtersDropdownVisible ? 'd-none' : ''}`}>

                <div className={`${styles.filtersWrapper} row`} style={{ maxWidth: 900 }}>
                    {filterSections.map((filterSection) => (
                        <FormGroup key={filterSection.title}
                            className={`mb-2 ${filterSection.type === 'checkboxes' || filterSection.type === 'radio'
                                ? 'col pe-5'
                                : filterSection.type === 'single_icon' ? 'col-1'
                                    : filterSection.type === 'filesize' ? 'col-md-4'
                                        : ''
                                }`}>

                            <div className='d-flex align-items-center py-1 position-relative'>
                                {filterSection.type == 'checkboxes' ? (
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id={`dropdown-filters-${filterSection.type}`} className='small px-0 txt-regular text-decoration-none'>
                                            {t(`filters.${filterSection.title}`)} <ChevronDown className='small ms-2' />
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
                                                    className={`btn ps-0 mb-2 ${checkedOptions[filter.label] ? 'txt-regular bold' : 'txt-lighter'}`}
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
                                    <div className='d-flex w-100'>
                                        {
                                            filterSection.filters.map((filter) => (
                                                <div className='col-md-4'>
                                                    <label className='small mb-2'>{t(`filters.${filter.label}`)}</label>

                                                    <div className='d-flex flex-column w-100' style={{ padding: '0 4px' }}>
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
                                    </div>
                                ) : filterSection.type == 'filesize' ? (
                                    <>
                                        {
                                            filterSection.filters.map((filter) => (
                                                <div style={{ width: '100%' }}>
                                                    <div className='d-flex flex-column w-100'>
                                                        <label className='small mb-2'>{t('filters.sizeRange')}</label>
                                                        <div className='position-relative' style={{ padding: '0 4px' }}>
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
                                                <div className="d-flex">
                                                    {filterSection.filters.map((filter) => (
                                                        <button
                                                            key={filter.value}
                                                            type="button"
                                                            className={`btn ${checkedRadios[filter.name] === filter.value ? 'bold txt-regular' : 'txt-lighter'}`}
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
                    <div className="mt-2">
                        <button
                            className="btn btn-contrast medium"
                            onClick={handleClearFilters}
                        >
                            {t('filters.clear')}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Filters;
