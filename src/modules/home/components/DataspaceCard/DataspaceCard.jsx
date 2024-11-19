import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import styles from './DataspaceCard.module.css'

const DataspaceCard = ({ dataSpace, isDragging }) => {

    const navigate = useNavigate();

    return (
        <div className="mb-4 w-100 px-2">
            <Card className={`pointer tile w-100 h-100 ${isDragging ? "dragging" : ''} ${styles.card} `} onClick={() => navigate('/search?q=' + dataSpace.shortName)}>
                <Card.Body className='pb-2 w-100'>
                    <Card.Img variant="top" style={{ height: 90 }} src={dataSpace.image} draggable={false} />
                    <Card.Title className='mt-3' style={{ height: 45 }}>{dataSpace.name}</Card.Title>
                    <Card.Text>
                        <div className="row mt-3">
                            <div className="col-6">
                                <span className='small d-flex align-items-center'>
                                    <Database className='me-1' /> 25 Data sources
                                </span>
                            </div>
                            <div className="col-6">
                                <span className='small d-flex align-items-center'>
                                    <Files className='me-1' /> 5.275.180 Data Assets
                                </span>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DataspaceCard;
