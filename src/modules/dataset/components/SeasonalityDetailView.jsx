import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SeasonalityDetailView = ({ showDetailViewModal, setShowDetailViewModal, selectedAttribute }) => {

    const handleOpen = () => setShowDetailViewModal(true);
    const handleClose = () => setShowDetailViewModal(false);

    return (
        <div>
            <Modal show={showDetailViewModal} onHide={handleClose} centered size='lg'>
                <Modal.Header className='border-0' closeButton>
                    <Modal.Title>Attribute {selectedAttribute.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className='text-muted small bold'>{selectedAttribute.name} Original time series</span>
                    {selectedAttribute?.original_series?.map((graph) => (
                        <div>
                            <div className="row mb-3">
                                <div className='col-md-12'>
                                    <img src={graph.file} className='w-100 pointer' />
                                </div>
                            </div>
                        </div>
                    ))}
                    <span className='text-muted small bold'>{selectedAttribute.name} Trend</span>
                    {selectedAttribute?.trends?.map((graph) => (
                        <div>
                            <div className="row mb-3">
                                <div className='col-md-12'>
                                    <img src={graph.file} className='w-100 pointer' />
                                </div>
                            </div>
                        </div>
                    ))}
                    <span className='text-muted small bold'>{selectedAttribute.name} Seasonality</span>
                    {selectedAttribute?.seasonalities?.map((graph) => (
                        <div>
                            <div className="row mb-3">
                                <div className='col-md-12'>
                                    <img src={graph.file} className='w-100 pointer' />
                                </div>
                            </div>
                        </div>
                    ))}
                    <span className='text-muted small bold'>{selectedAttribute.name} Residuals/Outlier</span>
                    {selectedAttribute?.residuals?.map((graph) => (
                        <div>
                            <div className="row mb-3">
                                <div className='col-md-12'>
                                    <img src={graph.file} className='w-100 pointer' />
                                </div>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SeasonalityDetailView;
