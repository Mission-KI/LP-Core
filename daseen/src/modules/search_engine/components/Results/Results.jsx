import React, { useEffect, useState } from 'react';
import { CardText, List, Star, StarFill } from 'react-bootstrap-icons';
import ResultItem from './ResultItem';
import { Spinner } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from 'react-i18next';
import Paginator from '../../../common/components/widgets/Paginator';
import ResultItemCard from './ResultItemCard';

function Results({ datasets, loading, pageCount, handlePageChange, currentPage }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('list');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
                <Spinner variant='primary' />
            </div>
        );
    }

    return (
        <div className='col-md-8 mt-3 pt-5'>
            <div className="w-100 mb-2">
                <div>

                    <span className='bold d-flex pb-3' style={{ whiteSpace: 'nowrap', marginTop: '-2rem' }}>
                        {datasets.hits?.total?.value >= 10000 ? `> ${datasets.hits.total.value.toLocaleString()}` : datasets.hits?.total?.value?.toLocaleString()} {t('dataset.datasets')}
                    </span>

                    {datasets?.hits?.hits?.map((dataset) =>
                        <ResultItem dataset={dataset} key={dataset._id} />
                    )}

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
