import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {

    const { t } = useTranslation();

    return (
        <div className="container py-5" style={{ maxWidth: 1000 }}>
            <div className='d-flex w-100 justify-content-between'>
                <span className='small'>{t('footer.c')}</span>
                <Link to="/imprint" className='small'>{t('footer.imprint')}</Link>
                <Link to="/data-privacy-policy" className='small'>{t('footer.privacyPolicy')}</Link>
                <Link to="/acceptable-use-policy" className='small'>{t('footer.usePolicy')}</Link>
            </div>
        </div>
    )
}

export default Footer;
