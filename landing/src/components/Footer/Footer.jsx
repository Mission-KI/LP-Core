import React from 'react';
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.footer}>
            <div className="container pt-4 pb-4">
                <div className='d-flex w-100 justify-content-between'>
                    <span className='fw-500'>{t('footer.c')}</span>
                    <Link to="/imprint" className={styles.footerLink}>{t('footer.imprint')}</Link>
                    <Link to="/privacy-policy" className={styles.footerLink}>{t('footer.privacyPolicy')}</Link>
                    <Link to="/acceptable-use-policy" className={styles.footerLink}>{t('footer.usePolicy')}</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
