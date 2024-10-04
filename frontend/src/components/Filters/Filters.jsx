import React, { useState } from 'react';
import { filters } from '../../utils/filter_utils';
import { FormGroup } from 'react-bootstrap';
import CustomCheckbox from 'react-custom-checkbox';
import { Check, Dot } from 'react-bootstrap-icons';

function Filters() {
    const [checkedOptions, setCheckedOptions] = useState({});

    const handleCheckboxChange = (option) => {
        setCheckedOptions((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    return (
        <div className='d-flex flex-column'>
            {filters.map((filter) => (
                <FormGroup key={filter.name}>
                    <label className='mt-4 mb-2 small text-uppercase'>{filter.label}</label>
                    {filter.type === "checkbox" ? (
                        filter.options.map((option) => (
                            <div className='d-flex align-items-center' key={option}>
                                <CustomCheckbox
                                    checked={!!checkedOptions[option]}
                                    label={option}
                                    onChange={() => handleCheckboxChange(option)}
                                    borderColor="var(--color-primary)"
                                    icon={<Check className='txt-primary' />}
                                />
                            </div>
                        ))
                    ) : filter.type === "range" ? (
                        <div className='d-flex'>
                            <input type="range" name={filter.name} />
                        </div>
                    ) : null}
                </FormGroup>
            ))}
        </div>
    );
}

export default Filters;
