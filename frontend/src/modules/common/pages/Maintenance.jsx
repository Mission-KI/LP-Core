import React, { useState } from 'react';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

const Maintenance = ({ handleEnter, password, setPassword, error }) => {
    const { t } = useTranslation();
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    return (
        <div className='container text-center pt-5 mt-5'>
            <ExclamationTriangleFill className='text-warning mb-3' style={{ fontSize: '40pt' }} />
            <h2 className='bold m-auto d-block mb-5' style={{ maxWidth: 500 }}>{t('maintenance')}</h2>
            {!showPasswordSection && (
                <a
                    className='bold txt-primary text-decoration-underline pointer mt-3'
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
                    {error && <p className='text-danger'>{error}</p>}
                </form>
            )}
        </div>
    );
}
export default Maintenance;