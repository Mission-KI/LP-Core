import React from 'react';
import LanguageSelector from '../widgets/LanguageSelector';

const LanguagePreferences = () => {
    return (
        <div>
            <p className='bold' style={{ fontSize: 17 }}>Language</p>

            <div className='d-flex py-4'>
                <span className='me-2 py-2'>Language:</span>
                <div className='border pe-4 py-2 rounded'>
                    <LanguageSelector />
                </div>
            </div>

        </div>
    );
}

export default LanguagePreferences;
