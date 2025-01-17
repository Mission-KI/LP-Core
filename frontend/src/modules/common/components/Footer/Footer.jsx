import React from 'react';
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { landingUrl } from '../../api/config';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.footer}>
            <div className="container pt-4 pb-4">
                <div className='d-flex w-100 justify-content-between'>
                    <span className={styles.footerLink}>{t('footer.c')}</span>
                    <a href={`${landingUrl}/imprint`} className={styles.footerLink}>{t('footer.imprint')}</a>
                    <a href={`${landingUrl}/privacy-policy`} className={styles.footerLink}>{t('footer.privacyPolicy')}</a>
                    <a href={`${landingUrl}/use-policy`} className={styles.footerLink}>{t('footer.usePolicy')}</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
