import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import styles from './DataspaceCard.module.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { appUrl } from '../../api/config';

const DataspaceCard = ({ dataSpace, category }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const queryString = new URLSearchParams([
        ...dataSpace.dataspace_filters.map((filter) => [`dataSpace.name`, filter]),
        ...dataSpace.publisher_filters.map((filter) => [`publisher.name`, filter])
    ]).toString();

    const tileHref = `${appUrl}?${queryString}`;

    return (
        <div className={`mb-5 px-2`}>
            <Card className={`h-100 rounded pointer shadow-sm pt-4 px-2 ${styles.card}`}>
                <Card.Img
                    variant='top'
                    src={dataSpace.image}
                    className='rounded pointer px-3'
                    style={{ width: 75, objectFit: 'contain' }}
                    draggable={false}
                />
                <Card.Body className='d-flex flex-column justify-content-end pb-3 w-100 pt-3 px-4'>
                    <a href={tileHref} className='h5 mb-0 txt-primary text-center m-auto d-block bold'>
                        {dataSpace.name}
                    </a>
                    <Card.Text>
                        <div className="d-flex justify-content-center mt-2">
                            <span className='small d-flex align-items-center'>
                                <span className='bold pe-1'>{dataSpace.amount_of_publishers}</span>
                                {dataSpace.amount_of_publishers === 1 ? t('home.dataProvider') : t('home.dataProviders')}
                            </span>
                            <span className='small d-flex align-items-center ps-3'>
                                <span className='bold pe-1'>{dataSpace.amount_of_assets}</span>
                                {dataSpace.amount_of_assets === 1 ? t('home.dataAsset') : t('home.dataAssets')}
                            </span>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DataspaceCard;
