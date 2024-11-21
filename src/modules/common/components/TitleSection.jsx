import React from 'react';
import LanguageSelector from './widgets/LanguageSelector';
import { useTranslation } from 'react-i18next';

const TitleSection = () => {

    const { t } = useTranslation();

    return (
        <div className='d-flex justify-content-between mb-5'>
            <div className='d-flex align-items-center'>
                <a href="/" className='text-decoration-none h2 mb-0' style={{ width: 'fit-content' }}>{t('page.title')}</a>
                <span className='badge badge-primary bg-danger ms-2' style={{ fontSize: 15 }}>Alpha</span>
            </div>
            <LanguageSelector />
        </div>
    );
}

export default TitleSection;
