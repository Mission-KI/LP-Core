import React from 'react'
import { filters } from '../../utils/filter_utils'
import { FormGroup } from 'react-bootstrap'

function Filters() {

    return (
        <div className='d-flex flex-column'>
            {filters.map((filter) => (
                <FormGroup>
                    <label className='mt-4 mb-2 small text-uppercase'>{filter.label}</label>
                    {filter.type == "checkbox" ? (
                        filter.options.map((option) => (
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" className='text-muted' name={filter.name} checked />
                                <label className='ps-2 text-muted'>{option}</label>
                            </div>
                        ))
                    ) : filter.type == "range" ? (
                        <div className='d-flex'>
                            <input type="range" name={filter.name} />
                        </div>
                    ) : ''
                    }
                </FormGroup>
            ))}
        </div>
    )
}

export default Filters
