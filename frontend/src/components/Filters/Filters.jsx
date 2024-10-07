import React, { useEffect, useState } from 'react';
import { filterSections } from '../../utils/filter_utils';
import { FormGroup } from 'react-bootstrap';
import CustomCheckbox from 'react-custom-checkbox';
import { Check } from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Filters.module.css'

function Filters({ datasets }) {
    const [checkedOptions, setCheckedOptions] = useState({});
    const [rangeValues, setRangeValues] = useState({});
    const [checkedRadios, setCheckedRadios] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

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
                if (filter.type === 'range') {
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
            allValues.filter(v => v !== value).forEach(v => params.append(name, v));
        }

        navigate(`?${params.toString()}`, { replace: true });
    };

    const updateRangeParams = (name, value) => {
        const params = new URLSearchParams(location.search);
        params.set(name, value);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const updateRadioParams = (name, value) => {
        const params = new URLSearchParams(location.search);
        params.set(name, value);
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

    const handleRangeChange = (filter, value) => {
        setRangeValues((prev) => ({
            ...prev,
            [filter.name]: value,
        }));

        updateRangeParams(filter.name, value);
    };

    const handleRadioChange = (filter, value) => {
        setCheckedRadios((prev) => ({
            ...prev,
            [filter.name]: value,
        }));

        updateRadioParams(filter.name, value);
    };

    return (
        <div className={styles.filtersWrapper}>
            {filterSections.map((filterSection) => (
                <FormGroup key={filterSection.title} className='mb-4'>
                    <label className='mb-2 small fw-500 text-uppercase'>{filterSection.title}</label>
                    {filterSection.filters.map((filter) => (
                        <div className='d-flex justify-content-between align-items-center py-1' key={filter.label}>
                            {filter.type === 'checkbox' && (
                                <CustomCheckbox
                                    checked={checkedOptions[filter.label] || false}
                                    label={<span className='text-muted'>{filter.label}</span>}
                                    name={filter.name}
                                    value={filter.value}
                                    onChange={() => handleCheckboxChange(filter)}
                                    borderColor="var(--bs-secondary-color)"
                                    borderWidth="1px"
                                    icon={<Check className='txt-primary' />}
                                />
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
                            {filter.type === 'range' && (
                                <div className='d-flex flex-column'>
                                    <label className='small text-muted'>{filter.label}</label>
                                    <input
                                        name={filter.name}
                                        type='range'
                                        min={filter.minValue}
                                        max={filter.maxValue}
                                        value={rangeValues[filter.name] || filter.minValue}
                                        onChange={(e) => handleRangeChange(filter, e.target.value)}
                                    />
                                </div>
                            )}

                            {(filter.type === 'checkbox' || filter.type === 'radio') ? (() => {
                                let formattedFilterName = filter.value.toLowerCase().replace(" ", "_") + "_count";
                                const count = datasets?.aggregations?.[formattedFilterName]?.doc_count || 0;
                                console.log(formattedFilterName);
                                return (
                                    <span className={styles.filterCountBadge}>{count}</span>
                                );
                            })() : null}

                        </div>
                    ))}
                </FormGroup>
            ))}
        </div>
    );
}

export default Filters;
