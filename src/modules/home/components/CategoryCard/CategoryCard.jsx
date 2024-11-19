import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import styles from './CategoryCard.module.css'
import { useTranslation } from 'react-i18next';

const CategoryCard = ({ category, isDragging }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="mb-4 w-100 px-2">
            <Card className={`pointer tile w-100 h-100 ${isDragging ? "dragging" : ''} ${styles.card} `} onClick={() => { navigate('/categories/mobility-and-transport') }}>
                <Card.Img
                    variant="top"
                    src={category.image}
                    style={{ height: 86 }}
                    draggable={false}
                />
                <Card.Body className='pb-2 w-100'>
                    <Card.Title draggable={false} style={{ height: 45 }}>{category.name}</Card.Title>
                    <Card.Text>
                        <div className="row mt-3">
                            <div className="col-6">
                                <span className='small d-flex align-items-center'>
                                    <Database className='me-1' /> {category.noOfDataSources} {t('home.dataSources')}
                                </span>
                            </div>
                            <div className="col-6">
                                <span className='small d-flex align-items-center'>
                                    <Files className='me-1' /> 5.275.180 {t('home.dataAssets')}
                                </span>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CategoryCard;
