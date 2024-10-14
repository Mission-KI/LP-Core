import React, { useEffect, useState } from 'react';
import { Star, StarFill } from 'react-bootstrap-icons';
import ResultItem from './ResultItem';
import { Spinner } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from 'react-i18next';
import Paginator from '../../../common/components/widgets/Paginator';
import { getTotalCount } from '../../../common/api/elastic';

function Results({ datasets, loading, bookmarks, setBookmarks, pageCount, handlePageChange, currentPage }) {

    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('all');
    const [totalDatasetCount, setTotalDatasetCount] = useState(0);

    useEffect(() => {
        const getTotalDatasetCount = async () => {
            const totalCount = await getTotalCount();
            setTotalDatasetCount(totalCount);
        }
        getTotalDatasetCount();
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#bookmarks') {
            setActiveTab('bookmarks');
        } else {
            setActiveTab('all');
        }
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'bookmarks') {
            window.history.pushState(null, '', '#bookmarks');
        } else {
            window.history.pushState(null, '', '#all');
        }
    };

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: 450 }}>
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
                        <Tab eventKey="all" title={t('common.all')}>
                            <div className='d-block'>

                                <span className='bold d-flex pb-3' style={{ whiteSpace: 'nowrap', marginTop: '-2rem' }}>
                                    {(datasets.hits?.total?.value === 10000 ? totalDatasetCount : datasets.hits?.total?.value)?.toLocaleString()} {t('dataset.datasets')}
                                </span>

                                {datasets?.hits?.hits?.map((dataset) =>
                                    <ResultItem dataset={dataset} key={dataset._id} bookmarks={bookmarks} setBookmarks={setBookmarks} />
                                )}
                                <Paginator
                                    pageCount={pageCount}
                                    handlePageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                            </div>
                        </Tab>
                        <Tab eventKey="bookmarks" title={
                            <div>
                                <span className='d-flex align-items-center fw-500'>
                                    {t('common.bookmarks')}
                                    {bookmarks?.hits?.hits?.length !== 0 ? (
                                        <StarFill className='ms-2' />
                                    ) : <Star className='ms-2' />}
                                </span>
                            </div>
                        }>
                            <div className='d-block'>
                                <span className='bold d-flex pb-3' style={{ whiteSpace: 'nowrap', marginTop: '-2rem' }}>{bookmarks?.hits?.hits?.length} {t('bookmarks.bookmarks')}</span>
                                {bookmarks?.hits?.hits?.map((dataset) =>
                                    <ResultItem dataset={dataset} key={dataset._id} bookmarks={bookmarks} setBookmarks={setBookmarks} />
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Results;
