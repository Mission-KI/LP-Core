import React from 'react';
import { Database, Files } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import styles from './DataspaceCard.module.css'
import { useTranslation } from 'react-i18next';

const DataspaceCard = ({ dataSpace }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={`${styles.cardWrapper} mb-5 px-2`}>
            <Card className={`h-100 rounded shadow-sm py-3 ${styles.card} `} onClick={() => navigate('/?q=' + dataSpace.shortName)}>
                <img
                    src={dataSpace.image}
                    className='rounded m-auto p-2'
                    style={{ height: 80, width: 'auto', objectFit: 'cover' }}
                />
                <Card.Body className='pb-2 w-100 pt-3'>
                    <a href={`https://app-daseen-redesign.netlify.app/?q=${dataSpace.name}`} className={`${styles.title} h5 mb-0`}>{dataSpace.name}</a>
                    <Card.Text>
                        <div className="d-flex justify-content-center mt-2">
                            <span className='small d-flex align-items-center'>
                                <Database className='me-1' /> {dataSpace.noOfDataSources} {t('home.dataSources')}
                            </span>
                            <span className='small d-flex align-items-center ps-3'>
                                <Files className='me-1' /> 5.275.180 {t('home.dataAssets')}
                            </span>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DataspaceCard;
