import React, { useState } from 'react';
import { useExpert } from '../../contexts/ExpertContext';

const SearchPreferences = () => {
    const { expertMode, setExpertMode } = useExpert();

    const toggleExpertMode = () => {
        setExpertMode(!expertMode);
    };

    return (
        <div>
            <p className='bold' style={{ fontSize: 17 }}>Search Preferences</p>

            <div className='py-4'>
                <label className="switch">
                    <input type="checkbox" checked={expertMode} onChange={toggleExpertMode} />
                    <span className="slider round"></span>
                </label>
                <span style={{ marginLeft: '10px' }}>Expert Mode</span>
                <p className='txt-lighter small mt-1'>This will enable complex filters and support in writting complicated search queries.</p>
            </div>

        </div>
    );
}

export default SearchPreferences;
