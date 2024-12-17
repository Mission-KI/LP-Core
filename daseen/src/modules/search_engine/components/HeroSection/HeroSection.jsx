import React from 'react';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import PlaceholderHeroSectionIllustration from '../../../common/assets/img/illustrations/home-page-illustration.jpg'
import { useTranslation } from 'react-i18next';

const HeroSection = ({ datasets }) => {

    const { t } = useTranslation();

    return (
        <div className='w-100' style={{ borderBottom: '1px solid var(--color-light-gray)' }}>
            <div className="container pb-5 pt-3 pt-md-5">
                <div className='row pb-3'>
                    <div className="col-md-6">
                        <h2 className='bold mb-3 text-decoration-none' style={{ width: 'fit-content' }}>{t('page.title')}</h2>
                        <p className='txt-lighter' style={{ fontSize: 17, maxWidth: 450 }}>
                            {t('page.shortDescription')}
                        </p>
                    </div>
                    <div className="col-md-6 d-none d-md-flex justify-content-end">
                        <div style={{ maxWidth: 210 }} className='mb-1'>
                            <img src={PlaceholderHeroSectionIllustration} className="w-100" />
                        </div>
                    </div>
                </div>


                <MainSearchBar />

            </div>
        </div>

    );
}

export default HeroSection;
