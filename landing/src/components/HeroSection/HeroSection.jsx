import React, { useEffect, useState } from 'react';
import { ArrowUpCircle, Database, FileEarmarkZip, FileEarmarkZipFill, Grid, Person, PersonCheck } from 'react-bootstrap-icons';
import ExampleGraph1 from '../../assets/img/graphs/exampleGraph1.webp'
import styles from './HeroSection.module.css'
import AnimatedNumber from '../AnimatedNumber';
import { useTranslation } from 'react-i18next';
import { getTotalDatasetCount } from '../../api/elastic';
import { appUrl } from '../../api/config';

const HeroSection = () => {

    const { t } = useTranslation();
    const [totalDatasetCount, setTotalDatasetCount] = useState(0);
    const { i18n } = useTranslation();

    useEffect(() => {
        const getDatasetCount = async () => {
            const totalCount = await getTotalDatasetCount();
            setTotalDatasetCount(totalCount);
        }
        getDatasetCount();
    }, []);


    var searchPageRedirectUrl;
    if (i18n.language == 'en' || i18n.language == 'English') {
        searchPageRedirectUrl = appUrl + '/en'
    } else if (i18n.language == 'de' || i18n.language == 'German') {
        searchPageRedirectUrl = appUrl + '/de'
    } else {
        searchPageRedirectUrl = appUrl + '/en'
    }


    return (
        <div className='bg-white w-100'>
            <div className="container pt-3">
                <div className="row pb-5 pt-5">
                    <div className="col-md-6 pe-5">
                        <h1 className='bold mb-3' style={{ fontSize: '30pt' }}>{t('home.heroSection.welcome')}</h1>
                        <p style={{ textAlign: 'justify' }}>{t('home.heroSection.description')}</p>
                        <div className='d-flex pt-4'>
                            <div className="pe-2">
                                <a href={searchPageRedirectUrl} className="btn btn-primary fw-500 px-4 py-2">
                                    {t('home.openDaseen')}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pt-3">
                        <div className="row">
                            <div className="col-md-6 pb-4">
                                <div className={`card border ${styles.statsCard}`}>
                                    <div className="card-body py-3">
                                        <div className="d-flex justify-content-between flex-wrap">
                                            <div className="">
                                                <span className='text-muted medium d-flex align-items-center'><FileEarmarkZip className='me-2' /> {t('home.dataAssets')}</span>
                                                <div className='d-flex align-items-center'>
                                                    <h2 className='bold mb-0'><AnimatedNumber value={totalDatasetCount} duration={1000} /></h2>
                                                    <span className='text-success fw-500 ps-2'><ArrowUpCircle /> 13%</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                <img src={ExampleGraph1} style={{ height: 58 }} alt="" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pb-4">
                                <div className={`card border ${styles.statsCard}`}>
                                    <div className="card-body py-3">
                                        <div className="d-flex justify-content-between flex-wrap">
                                            <div className="">
                                                <span className='text-muted medium d-flex align-items-center'><Database className='me-2' /> {t('home.dataSpaces')}</span>
                                                <div className='d-flex align-items-center'>
                                                    <h2 className='bold mb-0'><AnimatedNumber value={4} duration={1000} /></h2>
                                                    <span className='text-success fw-500 ps-2'><ArrowUpCircle /> 15%</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                <img src={ExampleGraph1} style={{ height: 58 }} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pb-4">
                                <div className={`card border ${styles.statsCard}`}>
                                    <div className="card-body py-3">
                                        <span className='text-muted medium d-flex align-items-center'><PersonCheck className='me-2' /> {t('home.dataPublishers')}</span>
                                        <h2 className='bold mb-0'><AnimatedNumber value={11} duration={1000} /></h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pb-4">
                                <div className={`card border ${styles.statsCard}`}>
                                    <div className="card-body py-3">
                                        <span className='text-muted medium d-flex align-items-center'><Grid className='me-2' /> {t('home.dataCategories')}</span>
                                        <h2 className='bold mb-0'><AnimatedNumber value={10} duration={1000} /></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeroSection;
