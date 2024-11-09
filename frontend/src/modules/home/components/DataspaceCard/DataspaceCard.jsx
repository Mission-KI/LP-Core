import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import styles from './DataspaceCard.module.css'

const DataspaceCard = ({ dataSpace }) => {

    const navigate = useNavigate();

    return (
        <div className="col-md-4 mb-4">
            <Card className={`h-100 pointer ${styles.card} `} onClick={() => navigate('/search?q=' + dataSpace.shortName)}>
                <Card.Body>
                    <Card.Img variant="top" style={{ height: 55 }} src={dataSpace.image} />
                    <Card.Title className='mt-3'>{dataSpace.name}</Card.Title>
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
