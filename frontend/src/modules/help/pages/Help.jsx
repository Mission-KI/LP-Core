import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
            <h2 className='bold mb-5'>{t('header.help')}</h2>

            <div class="alert alert-primary" role="alert">
                {t('help.alert')}
            </div>

            <p className='fw-500 mt-5 mb-3'>
                Topics
            </p>

            <nav className='nav flex-column'>
                <li className='nav-item'>
                    <a href="/help#asset-properties-topic" className='nav-link txt-primary'>
                        EDP asset properties
                    </a>
                </li>
                <li className='nav-item'>
                    <a href="/help#expert-mode" className='nav-link txt-primary'>
                        Expert mode
                    </a>
                </li>
            </nav>

            <div id='asset-properties-topic' className='pt-5'>
                <h3 className="mb-5 pt-5">
                    EDP asset properties
                </h3>

                <div dangerouslySetInnerHTML={{ __html: t('assetProperties') }} />
            </div>

            <div id='expert-mode' className='pt-5'>
                <h3 className="mb-5 pt-5">
                    Expert mode
                </h3>

                <div dangerouslySetInnerHTML={{ __html: t('expertMode') }} />
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
};

export default Help;
