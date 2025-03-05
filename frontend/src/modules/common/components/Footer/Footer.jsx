import React from 'react';
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import { landingUrl } from '../../api/config';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className={`${styles.footer} shadow`}>
            <div className="container pt-4 pb-4" style={{ maxWidth: 1100 }}>
                <div className='d-flex flex-wrap justify-content-between align-items-center'>
                    <div className='d-flex flex-wrap justify-content-between align-items-center w-100' style={{ maxWidth: 600 }}>
                        <a href={`${landingUrl}/privacy-policy`} className={styles.footerLink}>{t('footer.privacyPolicy')}</a>
                        <a href={`${landingUrl}/use-policy`} className={styles.footerLink}>{t('footer.usePolicy')}</a>
                        <a href={`${landingUrl}/imprint`} className={styles.footerLink}>{t('footer.imprint')}</a>
                    </div>
                    <span className={`${styles.footerLink}`}><span className='txt-primary h6 mb-0'>{t('footer.c')}</span></span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
