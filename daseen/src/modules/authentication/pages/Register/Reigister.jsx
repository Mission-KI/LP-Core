import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../common/contexts/AuthContext';
import Button from '../../../common/components/Button';
import styles from './Register.module.css'
import { useTranslation } from 'react-i18next';

export default function Register() {

    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData(e.target)
        const user = Object.fromEntries(data.entries())

        const response = await login(user);
        if (response.success) {
            toast.success('Successfully logged in!');
        } else {
            setError(response.message);
        }

        setLoading(false);

    };


    return (
        <div className={styles.registerPageWrapper}>

            <div style={{ maxWidth: 940 }} className='w-100'>

                <p className='text-danger mb-3'>{t('auth.dev')}</p>

                <h2 className='mb-4 bold'>{t('auth.signUp')}</h2>

                {error && <span className='text-danger small'>{error}</span>} { }

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className='py-2'>
                                <label className='mb-1'>{t('auth.name')}</label>
                                <input type="text" name='name' className='form-control py-3' placeholder='Enter your name' />
                            </div>
                            <div className='py-2'>
                                <label className='mb-1'>{t('auth.email')}</label>
                                <input type="text" name='email' className='form-control py-3' placeholder='Enter your email' />
                            </div>
                            <div className='py-2'>
                                <label className='mb-1'>{t('auth.password')}</label>
                                <input type="password" name='password' className='form-control py-3' placeholder='••••••••' />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='py-2'>
                                <label className='mb-1'>Organization</label>
                                <input type="text" name='organization' className='form-control py-3' placeholder='Enter your organization' />
                            </div>
                            <div className='py-2'>
                                <label className='mb-1'>Organization size</label>
                                <input type="number" name='organization_size' className='form-control py-3' placeholder='Enter your organization size' />
                            </div>
                            <div className='py-2'>
                                <label className='mb-1'>Area of interest</label>
                                <input type="number" name='area_of_interest' className='form-control py-3' placeholder='Select your area of interest' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-md-6 py-2 mt-3'>
                            <Button variant="primary" size="lg" type="submit" loading={loading} >
                                {t('auth.signUp')}
                            </Button>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}
