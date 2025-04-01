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
                {t('help.topics')}
            </p>

            <nav className='nav flex-column'>
                <li className='nav-item'>
                    <a href="/help#about" className='nav-link txt-primary'>
                        {t('help.topicAbout')}
                    </a>
                </li>
                <li className='nav-item'>
                    <a href="/help#basics" className='nav-link txt-primary'>
                        {t('help.topicBasics')}
                    </a>
                </li>
                <li className='nav-item'>
                    <a href="/help#functions" className='nav-link txt-primary'>
                        {t('help.topicFunctions')}
                    </a>
                </li>
                <li className='nav-item'>
                    <a href="/help#formats" className='nav-link txt-primary'>
                        {t('help.topicFormats')}
                    </a>
                </li>
            </nav>

            <div id='about' className='pt-5'>
                <h3 className="mb-5 pt-5">
                    {t('help.topicAbout')}
                </h3>

                <div dangerouslySetInnerHTML={{ __html: t('about') }} />
            </div>

            <div id='basics' className='pt-5'>
                <h3 className="mb-5 pt-5">
                    {t('help.topicBasics')}
                </h3>

                <div dangerouslySetInnerHTML={{ __html: t('basics') }} />
            </div>

            <div id='functions' className='pt-5'>
                <h3 className="mb-5 pt-5">
                    {t('help.topicFunctions')}
                </h3>

                <div dangerouslySetInnerHTML={{ __html: t('functions') }} />
            </div>

            <div id='formats' className='pt-5'>
                <h3 className="mb-5 pt-5">
                    {t('help.topicFormats')}
                </h3>

                <div dangerouslySetInnerHTML={{ __html: t('formats') }} />
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
};

export default Help;
