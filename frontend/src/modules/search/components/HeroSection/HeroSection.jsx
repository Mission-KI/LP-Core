import React from 'react';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import { useTranslation } from 'react-i18next';
import Filters from '../Filters/Filters';

const HeroSection = () => {

    const { t } = useTranslation();

    return (
        <div className="container pb-4 pt-3 pt-md-5" style={{ maxWidth: 1100 }}>
            <div className='row pb-3'>
                <div className="col-md-6">
                    <h2 className='bold mb-2 text-decoration-none' style={{ width: 'fit-content' }}>{t('page.title')}</h2>
                    <p className='txt-lighter pb-2' style={{ fontSize: 17, maxWidth: 450 }}>
                        {t('page.shortDescription')}
                    </p>
                </div>
            </div>

            <MainSearchBar />

            <Filters />

        </div>
    );
}

export default HeroSection;