import React from 'react';
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { landingUrl } from '../../api/config';
import icon from '../../assets/img/brand/icon.png'

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.footer}>
            <div className="container pt-4 pb-4" style={{ maxWidth: 1100 }}>
                <div className='d-flex flex-wrap justify-content-between align-items-center w-100' style={{ maxWidth: 650 }}>
                    <div className='pe-2'>
                        <img src={icon} className='rounded' style={{ height: 35 }} alt="" />
                    </div>
                    <span className={`${styles.footerLink}`}><span className='txt-primary'>{t('footer.c')}</span></span>
                    <a href={`${landingUrl}/privacy-policy`} className={styles.footerLink}>{t('footer.privacyPolicy')}</a>
                    <a href={`${landingUrl}/use-policy`} className={styles.footerLink}>{t('footer.usePolicy')}</a>
                    <a href={`${landingUrl}/imprint`} className={styles.footerLink}>{t('footer.imprint')}</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
