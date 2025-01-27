import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const SearchPreferences = () => {
    const { expertMode, setExpertMode, alwaysExpandFilters, setAlwaysExpandFilters } = useSettings();

    const toggleExpertMode = () => {
        setExpertMode(!expertMode);
    };

    const toggleAlwaysExpandFilters = () => {
        setAlwaysExpandFilters(!alwaysExpandFilters);
    };

    return (
        <div>
            <p className='bold' style={{ fontSize: 17 }}>Search Settings</p>

            <div className='py-4'>
                <label className="switch">
                    <input type="checkbox" checked={expertMode} onChange={toggleExpertMode} />
                    <span className="slider round"></span>
                </label>
                <span style={{ marginLeft: '10px' }}>Expert Mode</span>
                <p className='txt-lighter small mt-1'>This will enable complex filters and support in writting complicated search queries.</p>
            </div>

            <div className='pt-2 pb-4'>
                <label className="switch">
                    <input type="checkbox" checked={alwaysExpandFilters} onChange={toggleAlwaysExpandFilters} />
                    <span className="slider round"></span>
                </label>
                <span style={{ marginLeft: '10px' }}>Always expand filters</span>
                <p className='txt-lighter small mt-1'>This will make the filters shown by default without having to toggle them to the view.</p>
            </div>

        </div>
    );
}

export default SearchPreferences;
