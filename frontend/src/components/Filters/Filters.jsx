import React, { useEffect, useState } from 'react';
import { filterSections } from '../../utils/filter_utils';
import { FormGroup } from 'react-bootstrap';
import CustomCheckbox from 'react-custom-checkbox';
import { Check } from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function Filters() {
    const [checkedOptions, setCheckedOptions] = useState({});
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

        filterSections.forEach((filterSection) => {
            filterSection.filters.forEach((filter) => {
                newCheckedOptions[filter.label] = queryParams[filter.name]?.includes(filter.value) || false;
            });
        });

        setCheckedOptions(newCheckedOptions);
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

    const handleCheckboxChange = (filter) => {
        const isChecked = !checkedOptions[filter.label];

        setCheckedOptions((prev) => ({
            ...prev,
            [filter.label]: isChecked,
        }));

        updateQueryParams(filter.name, filter.value, isChecked);
    };

    return (
        <div className='d-flex flex-column'>
            {filterSections.map((filterSection) => (
                <FormGroup key={filterSection.title}>
                    <label className='mt-4 mb-2 small text-uppercase'>{filterSection.title}</label>
                    {filterSection.filters.map((filter) => (
                        <div className='d-flex align-items-center' key={filter.label}>
                            {filter.type === 'checkbox' && (
                                <CustomCheckbox
                                    checked={checkedOptions[filter.label] || false}
                                    label={filter.label}
                                    name={filter.name}
                                    value={filter.value}
                                    onChange={() => handleCheckboxChange(filter)}
                                    borderColor="var(--color-primary)"
                                    icon={<Check className='txt-primary' />}
                                />
                            )}
                            {filter.type === 'range' && (
                                <input
                                    name={filter.name}
                                    type='range'
                                    min={filter.minValue}
                                    max={filter.maxValue}
                                />
                            )}
                        </div>
                    ))}
                </FormGroup>
            ))}
        </div>
    );
}

export default Filters;
