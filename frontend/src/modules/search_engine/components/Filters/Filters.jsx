import React, { useEffect, useState } from 'react';
import { filterSections } from '../../../common/utils/filter_utils';
import { FormGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './Filters.module.css';

function Filters({ datasets }) {
    const [checkedOptions, setCheckedOptions] = useState({});
    const [checkedRadios, setCheckedRadios] = useState({});
    const [rangeValues, setRangeValues] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    // Get query params from URL
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

    // Update state based on URL params
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
        setRangeValues(newRangeValues); // Initialize the range values based on URL params
        setCheckedRadios(newCheckedRadios);
    }, [location]);

    const updateQueryParams = (name, value, checked) => {
        const params = new URLSearchParams(location.search);
        if (checked) {
            params.append(name, value);
        } else {
            const allValues = params.getAll(name);
            allValues.filter(v => v !== value).forEach(v => params.delete(name));
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
            [filter.name_1]: values, // Update only the relevant filter's values
        }));
        updateDoubleRangeParams(filter.name_1, filter.name_2, values); // Update the query params with unique names
    };

    const handleRadioChange = (filter, value) => {
        setCheckedRadios((prev) => ({
            ...prev,
            [filter.name]: value,
        }));
        updateQueryParams(filter.name, value, true);
    };

    return (
        <div className={styles.filtersWrapper}>
            {filterSections.map((filterSection) => (
                <FormGroup key={filterSection.title} className='mb-4'>
                    <label className='mb-2 small fw-500 text-uppercase'>{filterSection.title}</label>
                    <div className='d-flex flex-wrap w-100 align-items-center py-1'>
                        {filterSection.filters.map((filter) => (
                            <div key={filter.name_1}> {/* Use name_1 as a unique key */}
                                {filter.type === 'checkbox' && (
                                    <div className="form-check ps-1 pt-1">
                                        <input
                                            type="checkbox"
                                            className="btn-check"
                                            id={`checkbox-${filter.value}`}
                                            name={filter.name}
                                            value={filter.value}
                                            checked={checkedOptions[filter.label] || false}
                                            onChange={() => handleCheckboxChange(filter)}
                                            autoComplete="off"
                                        />
                                        <label
                                            className={`btn rounded-lg small ${checkedOptions[filter.label] ? 'btn-dark' : 'btn-outline-secondary'}`}
                                            htmlFor={`checkbox-${filter.value}`}
                                        >
                                            {filter.label}
                                        </label>
                                    </div>
                                )}

                                {filter.type === 'radio' && (
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
                                )}

                                {filter.type === 'doublerange' && (
                                    <div style={{ width: 270 }}>
                                        <div className='d-flex flex-column w-100'>
                                            <label className='small text-muted'>{filter.label}</label>
                                            <Slider
                                                range
                                                className='w-100'
                                                min={filter.minValue}
                                                max={filter.maxValue}
                                                value={rangeValues[filter.name_1] || [filter.minValue, filter.maxValue]} // Ensure controlled component
                                                onChange={(values) => handleDoubleRangeChange(filter, values)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </FormGroup>
            ))}
        </div>
    );
}

export default Filters;
