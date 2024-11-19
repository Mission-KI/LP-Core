import React, { useEffect, useState } from 'react';
import { CardText, List, Star, StarFill } from 'react-bootstrap-icons';
import ResultItem from './ResultItem';
import { Spinner } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from 'react-i18next';
import Paginator from '../../../common/components/widgets/Paginator';
import { getTotalCount } from '../../../common/api/elastic';
import ResultItemCard from './ResultItemCard';

function Results({ datasets, loading, pageCount, handlePageChange, currentPage }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('list');
    const [totalDatasetCount, setTotalDatasetCount] = useState(0);

    useEffect(() => {
        const getTotalDatasetCount = async () => {
            const totalCount = await getTotalCount();
            setTotalDatasetCount(totalCount);
        }
        getTotalDatasetCount();
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <Spinner variant='primary' />
            </div>
        );
    }

    return (
        <div className='mt-5 pt-5'>
            <div className="w-100 mb-2">
                <div>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={handleTabChange}
                        id="controlled-tab-example"
                        className="d-flex justify-content-end border-0 w-100"
                    >
                        <Tab eventKey="list" title={
                            <>
                                <List className='me-1' /> List view
                            </>
                        }>
                            <div className='d-block'>
                                <span className='bold d-flex pb-3' style={{ whiteSpace: 'nowrap', marginTop: '-2rem' }}>
                                    {(datasets.hits?.total?.value === 10000 ? totalDatasetCount : datasets.hits?.total?.value)?.toLocaleString()} {t('dataset.datasets')}
                                </span>

                                {datasets?.hits?.hits?.map((dataset) =>
                                    <ResultItem dataset={dataset} key={dataset._id} />
                                )}

                            </div>
                        </Tab>
                        <Tab eventKey="tile" title={
                            <><CardText className='me-1' /> Tile view</>
                        }>
                            <div className='d-block'>
                                <span className='bold d-flex pb-3' style={{ whiteSpace: 'nowrap', marginTop: '-2rem' }}>
                                    {(datasets.hits?.total?.value === 10000 ? totalDatasetCount : datasets.hits?.total?.value)?.toLocaleString()} {t('dataset.datasets')}
                                </span>
                                <div className="row">
                                    {datasets?.hits?.hits?.map((dataset) =>
                                        <ResultItemCard dataset={dataset} key={dataset._id} />
                                    )}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                    <Paginator
                        pageCount={pageCount}
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default Results;
