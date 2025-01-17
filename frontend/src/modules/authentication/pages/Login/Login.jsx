import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../common/contexts/AuthContext';
import Button from '../../../common/components/Button';
import styles from './Login.module.css'
import { useTranslation } from 'react-i18next';

export default function Login() {

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
        <div className={styles.loginPageWrapper}>

            <div style={{ maxWidth: 470 }} className='w-100'>

                <p className='text-danger mb-3'>{t('auth.dev')}</p>

                <h2 className='mb-4 bold'>{t('auth.logIn')}</h2>

                {error && <span className='text-danger small'>{error}</span>} { }

                <form onSubmit={handleSubmit}>
                    <div className='py-2'>
                        <label className='mb-1'>{t('auth.email')}</label>
                        <input type="text" name='email' className='form-control py-3' placeholder={t('auth.emailPlaceholder')} />
                    </div>
                    <div className='py-2'>
                        <label className='mb-1'>{t('auth.password')}</label>
                        <input type="password" name='password' className='form-control py-3' placeholder='••••••••' />
                    </div>

                    <div className='py-2 mt-3'>
                        <Button variant="primary" size="lg" type="submit" loading={loading} >
                            {t('auth.logIn')}
                        </Button>
                    </div>

                </form>

            </div>

        </div>
    )
}
