import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Maintenance = ({ handleEnter, password, setPassword, error }) => {
    const { t } = useTranslation();
    const [showPasswordSection, setShowPasswordSection] = useState(false);

    return (
        <div className='container text-center pt-5 mt-5'>
            <h2>{t('maintenance')}</h2>
            {!showPasswordSection && (
                <a
                    className='text-danger text-decoration-underline pointer mt-3'
                    onClick={() => setShowPasswordSection(true)}
                >
                    Enter Anyways
                </a>
            )}

            {showPasswordSection && (
                <form action="" style={{ maxWidth: 500 }} className='m-auto mt-3'>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className='form-control'
                    />
                    <br />
                    <button onClick={handleEnter} className='btn btn-primary'>
                        Submit
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            )}
        </div>
    );
}

export default Maintenance;
