import React, { useState } from 'react';
import ImageView from '../../common/components/ImageView/ImageView';
import SeasonalityDetailView from './SeasonalityDetailView';

function DataSeasonality({ datasetDetails }) {
    const [selectedTab, setSelectedTab] = useState('Original Timeseries');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetailViewModal, setShowDetailViewModal] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(false);

    const tabs = [
        { key: 'Original Timeseries', label: 'Original Timeseries' },
        { key: 'Trend', label: 'Trend' },
        { key: 'Seasonality', label: 'Seasonality' },
        { key: 'Residuals / Outliers', label: 'Residuals / Outliers' },
    ];

    const filteredColumns = datasetDetails?._source?.structuredDatasets?.[0]?.numericColumns?.filter(column =>
        column.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];


    const handleOpenSeasonalityDetailView = (attribute) => {
        setSelectedAttribute(attribute);
        setShowDetailViewModal(true);
    }

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between pb-3 pt-3'>
                <div className='d-flex align-items-center'>
                    <div className='pe-1'>
                        <span className='small text-muted'>Select chart view</span>
                    </div>
                    {tabs.map((tab) => (
                        <div className='px-1' key={tab.key}>
                            <button
                                className={`btn btn-outline-primary rounded-lg small ${selectedTab === tab.key ? 'active' : ''}`}
                                onClick={() => setSelectedTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        </div>
                    ))}
                </div>
                <div className='d-flex align-items-center'>
                    <div className='pe-1'>
                        <span className='small text-muted'>Search attribute</span>
                    </div>
                    <div>
                        <input
                            type="text"
                            className='form-control rounded-lg small'
                            placeholder='Search attribute name'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div>
                {selectedTab === 'Original Timeseries' && (
                    <div className='attribute-item-wrapper'>
                        {filteredColumns.some(column => column?.original_series?.length > 0) ? (
                            filteredColumns.map((column) => (
                                column?.original_series?.length > 0 && (
                                    <div key={column.name}>
                                        <span className='text-muted small'>{column.name} Original Timeseries</span>
                                        <div className="row mb-3">
                                            <div className='col-md-12'>
                                                <img src={column?.original_series?.[0]?.file} className='w-100 pointer' onClick={() => handleOpenSeasonalityDetailView(column)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className='d-flex justify-content-center align-items-center attribute-item-wrapper'>
                                <span className='text-muted text-center medium m-auto d-block'>No graphs included</span>
                            </div>
                        )}
                    </div>
                )}

                {selectedTab === 'Trend' && (
                    <div className='attribute-item-wrapper'>
                        {filteredColumns.some(column => column?.trends?.length > 0) ? (
                            filteredColumns.map((column) => (
                                column?.trends?.length > 0 && (
                                    <div key={column.name}>
                                        <span className='text-muted small'>{column.name} Trend</span>
                                        <div className="row mb-3">
                                            <div className='col-md-12'>
                                                <img src={column?.trends?.[0]?.file} className='w-100 pointer' onClick={() => handleOpenSeasonalityDetailView(column)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className='d-flex justify-content-center align-items-center attribute-item-wrapper'>
                                <span className='text-muted text-center medium m-auto d-block'>No graphs included</span>
                            </div>
                        )}
                    </div>
                )}

                {selectedTab === 'Seasonality' && (
                    <div className='attribute-item-wrapper'>
                        {filteredColumns.some(column => column?.seasonalities?.length > 0) ? (
                            filteredColumns.map((column) => (
                                column?.seasonalities?.length > 0 && (
                                    <div key={column.name}>
                                        <span className='text-muted small'>{column.name} Seasonality</span>
                                        <div className="row mb-3">
                                            <div className='col-md-12'>
                                                <img src={column?.seasonalities?.[0]?.file} className='w-100 pointer' onClick={() => handleOpenSeasonalityDetailView(column)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className='d-flex justify-content-center align-items-center attribute-item-wrapper'>
                                <span className='text-muted text-center medium m-auto d-block'>No graphs included</span>
                            </div>
                        )}
                    </div>
                )}

                {selectedTab === 'Residuals / Outliers' && (
                    <div className='attribute-item-wrapper'>
                        {filteredColumns.some(column => column?.residuals?.length > 0) ? (
                            filteredColumns.map((column) => (
                                column?.residuals?.length > 0 && (
                                    <div key={column.name}>
                                        <span className='text-muted small'>{column.name} Residuals / Outliers</span>
                                        <div className="row mb-3">
                                            <div className='col-md-12'>
                                                <img src={column?.residuals?.[0]?.file} className='w-100 pointer' onClick={() => handleOpenSeasonalityDetailView(column)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className='d-flex justify-content-center align-items-center attribute-item-wrapper'>
                                <span className='text-muted text-center medium m-auto d-block'>No graphs included</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <SeasonalityDetailView
                showDetailViewModal={showDetailViewModal}
                setShowDetailViewModal={setShowDetailViewModal}
                selectedAttribute={selectedAttribute}
            />

        </div>
    );
}

export default DataSeasonality;
