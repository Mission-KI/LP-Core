import React from 'react';
import MainSearchBar from '../../../common/components/Search/MainSearchBar';
import PlaceholderHeroSectionIllustration from '../../../common/assets/img/illustrations/home-page-illustration.jpg'
import { useTranslation } from 'react-i18next';
import Filters from '../Filters/Filters';
import { useExpert } from '../../../common/contexts/ExpertContext';

const HeroSection = () => {

    const { t } = useTranslation();
    const { expertMode } = useExpert();

    return (
        <div className='w-100' style={{ borderBottom: '1px solid var(--color-light-gray)' }}>
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

                {expertMode && (
                    <Filters />
                )}


            </div>
        </div>

    );
}

export default HeroSection;