import React, { useEffect, useState } from 'react'
import Header from '../../../common/components/Header/Header'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './Details.module.css'
import { useParams } from 'react-router';
import { getDataset } from '../../../common/api/elastic';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import { LineChart } from '../../components/Charts/LineChart';
import { calculateTemporalConsistency, calculateTemporalCover } from '../../../common/utils/dataset_utils';
import AttributeList from '../../components/AttributeList';
import AttributeConsistency from '../../components/AttributeConsistency';
import TemporalConsistency from '../../components/TemporalConsistency';
import { useTranslation } from 'react-i18next';

function Details() {

    const { id } = useParams();
    const [datasetDetails, setDatasetDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState('attributes');

    const { t } = useTranslation();

    useEffect(() => {
        const fetchDatasets = async () => {
            try {
                const fetchedDataset = await getDataset(id);
                setDatasetDetails(fetchedDataset);
            } catch (error) {
                console.error('Error fetching :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDatasets();
    }, [id]);

    const handleToggleTab = (item) => {
        setActiveKey(item);
    };

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
                <Spinner variant='primary' />
            </div>
        );
    }

    return (
        <>
            <Header datasetDetails={datasetDetails} />
            <div className="container px-5 pt-5">
                <h4 className='bold mt-5'>{datasetDetails?._source?.name}</h4>

                <div className='d-flex justify-content-between mt-4 flex-wrap' style={{ maxWidth: 630 }}>
                    <a href={datasetDetails._source?.dataSpace?.url} target='_blank' className='small text-decoration-underline me-2'>{datasetDetails._source?.dataSpace?.name}</a>
                    <span className='small text-decoration-underline me-2'>serie-a-logistic solutions</span>
                    <span className='small me-2'>License other-commercial</span>
                    <span className='small me-2'>Version {(datasetDetails._version).toFixed(1)}</span>
                    <span className='small me-2'>
                        {moment(datasetDetails?._source?._timestamp).fromNow()}
                    </span>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="rounded-lg border bg-white p-3 mt-2">
                            <p className='medium bold'>
                                {t('dataset.dataScienceInfo')}
                            </p>
                            <hr />
                            <div className='d-flex w-100 justify-content-between'>
                                <div>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.structure')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.volume')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.compression')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.transferType')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.immutability')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.growth')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.growthRate')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.temporalCover')}</p>
                                    <p className='small mb-1 text-uppercase' role={'button'} onClick={() => handleToggleTab('temporal_consistency')}>{t('dataset.temporalConsistency')}</p>
                                    <br />
                                    <p className='small mb-1 text-uppercase'>{t('dataset.noOfColumns')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.noOfLines')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.dataTypes')}</p>
                                    <p className='small mb-1 text-uppercase' role={'button'} onClick={() => handleToggleTab('attribute_consistency')}>{t('dataset.attributeConsistency')}</p>
                                    <p className='small mb-1 text-uppercase'>{t('dataset.languages')}</p>
                                    <p className='small mb-1 text-uppercase' role={'button'} onClick={() => handleToggleTab('home1')}>{t('dataset.numericValueDistribution')}</p>
                                    <p className='small mb-1 text-uppercase' role={'button'} onClick={() => handleToggleTab('home2')}>{t('dataset.stringValueDistribution')}</p>
                                    <p className='small mb-1 text-uppercase' role={'button'} onClick={() => handleToggleTab('home3')}>{t('dataset.numericCorrelationAnalysis')}</p>
                                    <p className='small mb-1 text-uppercase' role={'button'} onClick={() => handleToggleTab('home4')}>{t('dataset.numericAnomalyAnalysis')}</p>
                                    <p className='small mb-1 text-uppercase' role={'button'} onClick={() => handleToggleTab('home5')}>{t('dataset.dataSeasonality')}</p>
                                </div>
                                <div>
                                    <p className='small mb-1'>Text (CSV)</p>
                                    <p className='small mb-1'>{(datasetDetails?._source?.volume / 1024 / 1024).toFixed(2)} MB</p>
                                    <p className='small mb-1'>{datasetDetails?._source?.compression ?? 'None'}</p>
                                    <p className='small mb-1'>{datasetDetails?._source?.transferTypeFlag ?? 'None'}</p>
                                    <p className='small mb-1'>{datasetDetails?._source?.immutabilityFlag ?? 'None'}</p>
                                    <p className='small mb-1'>{datasetDetails?._source?.growthFlag ?? 'None'}</p>
                                    <p className='small mb-1'>Unknown</p>
                                    <p className='small mb-1'>{calculateTemporalCover(datasetDetails?.datasets)}</p>
                                    <p className='small mb-1'>{calculateTemporalConsistency(datasetDetails?.datasets)}</p>

                                    <br />
                                    <p className='small mb-1'>
                                        {datasetDetails?._source?.datasets && datasetDetails?._source?.datasets?.length > 0 ? datasetDetails?._source.datasets[0].columns.length : 'No row count available'}
                                    </p>
                                    <p className='small mb-1'>
                                        {datasetDetails?._source?.datasets && datasetDetails?._source?.datasets?.length > 0 ? datasetDetails?._source.datasets[0].rowCount : 'No row count available'}
                                    </p>
                                    <p className='small mb-1'>Time, string, numeric</p>
                                    <p className='small mb-1'>Partially inconsistent</p>
                                    <p className='small mb-1'>German, English</p>
                                    <p className='small mb-1'>Heterogen</p>
                                    <p className='small mb-1'>Heterogen</p>
                                    <p className='small mb-1'>Partial correlation</p>
                                    <p className='small mb-1'>Anomaly exists</p>
                                    <p className='small mb-1'>Seasonal, no trend</p>
                                </div>
                            </div>

                        </div>

                        <div className='d-flex align-items-center mt-4'>
                            <span className='small pe-3'>{t('dataset.tags')}</span>
                            {datasetDetails?._source?.tags?.map((tag) =>
                                <button className='btn btn-basic border small rounded-lg me-3' key={tag}>{tag}</button>
                            )}
                        </div>

                    </div>


                    <div className="col-md-8">
                        <Tabs
                            activeKey={activeKey}
                            id={styles.datasetAttributeTabs}
                            onSelect={(k) => setActiveKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="attributes" title={<span>ATTRIBUTE<br />LIST</span>} className={styles.tab}>
                                <AttributeList datasetDetails={datasetDetails} />
                            </Tab>
                            <Tab eventKey="attribute_consistency" title={<span>ATTRIBUTE<br />CONSISTENCY</span>} className={styles.tab}>
                                <AttributeConsistency datasetDetails={datasetDetails} />
                            </Tab>
                            <Tab eventKey="temporal_consistency" title={<span>TEMPORAL<br />CONSISTENCY</span>} className={styles.tab}>
                                <TemporalConsistency datasetDetails={datasetDetails} />
                            </Tab>
                            <Tab eventKey="home1" title={<span>NUMERIC VALUE<br />DISTRIBUTION</span>} className={styles.tab}>
                                NUMERIC VALUE DISTRIBUTION
                            </Tab>
                            <Tab eventKey="home2" title={<span>STRING VALUE<br />DISTRIBUTION</span>} className={styles.tab}>
                                STRING VALUE DISTRIBUTION
                            </Tab>
                            <Tab eventKey="home3" title={<span>NUMERIC CORRELATION<br />ANALYSIS</span>} className={styles.tab}>
                                NUMERIC CORRELATION ANALYSIS
                            </Tab>
                            <Tab eventKey="home4" title={<span>NUMERIC ANOMALY<br />ANALYSIS</span>} className={styles.tab}>
                                NUMERIC ANOMALY ANALYSIS
                            </Tab>
                            <Tab eventKey="home5" title={<span>DATA<br />SEASONALITY</span>} className={styles.tab}>
                                <LineChart />
                            </Tab>

                        </Tabs>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Details
