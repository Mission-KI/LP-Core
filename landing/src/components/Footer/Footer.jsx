import React from 'react';
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.footer}>
            <div className="container pt-4 pb-4" style={{ maxWidth: 1100 }}>
                <div className='d-flex flex-wrap justify-content-between align-items-center'>
                    <div className='d-flex flex-wrap justify-content-between align-items-center w-100' style={{ maxWidth: 600 }}>
                        <Link to="/imprint" className={styles.footerLink}>{t('footer.imprint')}</Link>
                        <Link to="/privacy-policy" className={styles.footerLink}>{t('footer.privacyPolicy')}</Link>
                        <Link to="/use-policy" className={styles.footerLink}>{t('footer.usePolicy')}</Link>
                    </div>
                    <span className={`${styles.footerLink}`}><span className='txt-primary h6 fw-400 mb-0'>{t('footer.c')}</span></span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
