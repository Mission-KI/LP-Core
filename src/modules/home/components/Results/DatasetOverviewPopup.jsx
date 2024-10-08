import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';

function DatasetOverviewPopup() {
    const [show, setShow] = useState(false);

    const toggleDropdown = (isShown) => {
        setShow(isShown);
    };

    return (
        <Dropdown
            onMouseEnter={() => toggleDropdown(true)}
            onMouseLeave={() => toggleDropdown(false)}
            show={show}
        >
            <Dropdown.Toggle
                as="div"
                id="dropdown-basic"
                className="p-0 m-0 border-0 d-flex align-items-center"
            >
                <InfoCircleFill size={20} className='text-secondary' />
            </Dropdown.Toggle>

            <Dropdown.Menu className={`fade ${show ? 'show' : ''}`}>
                <div className='p-3'>
                    <p>Dataset info</p>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DatasetOverviewPopup;
