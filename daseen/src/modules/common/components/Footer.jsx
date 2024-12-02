import React from 'react';
import { useTranslation } from 'react-i18next';
import { landingUrl } from '../api/config';

function Footer() {

    const { t } = useTranslation();

    return (
        <div className="container pt-5 pb-3 mt-4" style={{ maxWidth: 1000 }}>
            <div className='d-flex w-100 justify-content-between'>
                <span className='small txt-lighter'>{t('footer.c')}</span>
                <a href={`${landingUrl}/imprint`} className='small txt-lighter'>{t('footer.imprint')}</a>
                <a href={`${landingUrl}/privacy-policy`} className='small txt-lighter'>{t('footer.privacyPolicy')}</a>
                <a href={`${landingUrl}/use-policy`} className='small txt-lighter'>{t('footer.usePolicy')}</a>
            </div>
        </div>
    )
}

export default Footer;
