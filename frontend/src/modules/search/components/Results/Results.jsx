import React, { useEffect, useState } from 'react';
import { CardText, Grid, List, ListColumns, ListTask, Star, StarFill, TicketFill } from 'react-bootstrap-icons';
import ResultItem from './ResultItem';
import { Spinner } from 'react-bootstrap';
import styles from './Results.module.css'
import { useTranslation } from 'react-i18next';
import Paginator from '../../../common/components/widgets/Paginator';
import ResultItemCard from './ResultItemCard';
import SkeletonLoader from '../../../common/animations/SkeletonAnimation';

function Results({ datasets, loading, pageCount, handlePageChange, currentPage }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('list');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='mt-3 pt-3'>
            <div className="w-100 mb-2">
                <div className='mb-4'>

                    <div className='d-flex align-items-center justify-content-between pb-3'>
                        <span className='bold d-flex' style={{ whiteSpace: 'nowrap' }}>
                            {datasets.hits?.total?.value >= 10000
                                ? `> ${datasets.hits.total.value.toLocaleString()}`
                                : datasets.hits?.total?.value?.toLocaleString()}
                            &nbsp;
                            {datasets.hits?.total?.value === 1
                                ? t('dataset.dataset')
                                : t('dataset.datasets')}
                        </span>
                        <div className={styles.resultViewTypeTabs}>
                            <span
                                onClick={() => setActiveTab('list')}
                                className={`pointer medium d-flex align-items-center py-1 me-3 px-1 ${activeTab === 'list' ? styles.active : ''}`}
                            >
                                <ListTask className="me-1" /> List
                            </span>
                            <span
                                onClick={() => setActiveTab('tiles')}
                                className={`pointer medium d-flex align-items-center py-1 px-1 ${activeTab === 'tiles' ? styles.active : ''}`}
                            >
                                <Grid className="me-1" /> Tiles
                            </span>
                        </div>
                    </div>

                    {loading ? (<SkeletonLoader />) : ''}

                    {activeTab == 'list' ? (
                        <div className='col-md-9'>
                            {datasets?.hits?.hits?.map((dataset) =>
                                <ResultItem dataset={dataset} key={dataset._id} />
                            )}
                            <div className='col-md-10'>
                                <Paginator
                                    pageCount={pageCount}
                                    handlePageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    ) : activeTab == 'tiles' ? (
                        <>
                            <div className='row'>
                                {datasets?.hits?.hits?.map((dataset) =>
                                    <ResultItemCard dataset={dataset} key={dataset._id} />
                                )}
                            </div>
                            <Paginator
                                pageCount={pageCount}
                                handlePageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                        </>

                    ) : ''}

                </div>

            </div>
        </div>
    );
}

export default Results;
