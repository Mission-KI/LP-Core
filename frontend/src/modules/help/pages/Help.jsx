import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import assetPropertiesImg from '../../common/assets/img/help_topics/asset_properties.webp';

const Help = () => {
    const { t } = useTranslation();

    useEffect(() => {
        const handleLoad = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const topOffset = element.offsetTop - headerHeight;

                    window.scrollTo({
                        top: topOffset,
                        behavior: 'smooth',
                    });
                }
            }
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, [window.location]);


    return (
        <div className='container' style={{ maxWidth: 1150 }}>
            <h2 className='bold mb-4'>Help</h2>

            <div class="alert alert-primary" role="alert">
                {t('help.alert')}
            </div>

            <p className='fw-500 mt-5'>
                Topics
            </p>

            <a href="/help#asset-properties-topic" className='txt-primary ft-500' style={{ fontSize: '14pt' }}>EDP asset properties</a>

            {/* <img src={assetPropertiesImg} alt="" style={{ maxWidth: 450 }} className='mb-5' /> */}

            <div id='asset-properties-topic' className='pt-5'>
                <h4 className="mb-3 pt-5">
                    EDP asset properties
                </h4>

                <div dangerouslySetInnerHTML={{ __html: t('assetProperties') }} />
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
};

export default Help;
