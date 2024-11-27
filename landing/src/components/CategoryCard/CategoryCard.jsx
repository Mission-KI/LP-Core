import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import styles from './CategoryCard.module.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={`${styles.cardWrapper} mb-5 px-2`}>
            <Card className={`h-100 rounded ${styles.card} `}>
                <Card.Img
                    variant="top"
                    src={category.image}
                    className='rounded'
                    style={{ height: 155 }}
                />
                <Card.Body className='pb-2 w-100 p-0 pt-3'>
                    <Link to={`/categories/${category.slug}`} style={{ height: 27 }} className={`${styles.title} h5`}>{category.name}</Link>
                    <Card.Text>
                        <div className="d-flex flex-wrap mt-2">
                            <span className='small fw-500 d-flex align-items-center pe-3'>
                                <Database className='me-1' /> {category.noOfDataSources} {t('home.dataSources')}
                            </span>
                            <span className='small fw-500 d-flex align-items-center'>
                                <Files className='me-1' /> 5.275.180 {t('home.dataAssets')}
                            </span>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CategoryCard;
