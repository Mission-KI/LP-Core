import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import styles from './CategoryCard.module.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClick = (e) => {
        if (category.tiles.length === 0) {
            e.preventDefault();
            alert(t('categories.noItems'));
        } else {
            navigate(`/categories/${category.slug}`);
        }
    };

    return (
        <div className={`mb-5 px-2`}>
            <Card className={`h-100 rounded`}>
                <Card.Img
                    variant='top'
                    src={category.image}
                    className='rounded pointer'
                    style={{ minHeight: 115 }}
                    draggable={false}
                />
                <Card.Body className='pb-2 w-100 p-0 pt-3'>
                    <a
                        href="#"
                        onClick={handleClick}
                        className={`${styles.title} h5`}
                    >
                        {category.name}
                    </a>
                    <Card.Text>
                        <div className="d-flex flex-wrap mt-2">
                            <span className='small d-flex align-items-center pe-3'>
                                <span className='bold pe-1'>{category.amount_of_publishers}</span>
                                {category.amount_of_publishers === 1 ? t('home.dataProvider') : t('home.dataProviders')}
                            </span>
                            <span className='small d-flex align-items-center'>
                                <span className="bold pe-1">{category.amount_of_assets}</span>
                                {category.amount_of_assets === 1 ? t('home.dataAsset') : t('home.dataAssets')}
                            </span>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CategoryCard;