import React from 'react';
import Card from 'react-bootstrap/Card';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';
import styles from './DataspaceCard.module.css'
import { useTranslation } from 'react-i18next';
import { appUrl } from '../../api/config';

const DataspaceCard = ({ dataSpace, category }) => {

    const { t } = useTranslation();

    const queryString = new URLSearchParams([
        ...dataSpace.dataspace_filters.map((filter) => [`dataSpace.name`, filter]),
        ...dataSpace.publisher_filters.map((filter) => [`publisher.name`, filter])
    ]).toString();

    const tileHref = `${appUrl}?${queryString}`;

    const renderTooltip = (props) => (
        <Tooltip id="publisher-tooltip" {...props}>
            {dataSpace.publisher_filters.length > 0 ? (
                <>
                    {dataSpace.name} {t('categories.publishersInTheCategory')} {category.title}:
                    <ul className="list-unstyled m-0">
                        {dataSpace.publisher_filters.map((index) => (
                            <li key={index}>{index}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <span>No publishers available</span>
            )}
        </Tooltip>
    );

    return (
        <div className={`mb-5 px-2`}>
            <Card className={`h-100 rounded pointer border-lighter pt-4 px-4 ${styles.card}`}>
                <img
                    src={dataSpace.image}
                    className='rounded pointer'
                    style={{ height: 80, width: 'auto', objectFit: 'contain' }}
                    draggable={false}
                />

                <a href={tileHref} className='h5 text-center mb-0 pt-3 txt-primary bold'>
                    {dataSpace.title}
                </a>
                <p className='pt-3 text-center' style={{ fontSize: '10pt' }}>{dataSpace.description}</p>
                <Card.Body className='d-flex flex-column justify-content-end w-100 px-3'>
                    <Card.Text>
                        <div className="d-flex justify-content-between">
                            <span style={{ fontSize: '10pt' }} className='d-flex align-items-center pe-3'>
                                <span className='bold pe-1'>{dataSpace.amount_of_assets}</span>
                                {dataSpace.amount_of_assets === 1 ? t('home.dataAsset') : t('home.dataAssets')}
                            </span>
                            {!dataSpace.is_publisher && (
                                <span style={{ fontSize: '10pt' }} className='d-flex align-items-center'>

                                    <span className='bold pe-1'>{dataSpace.amount_of_publishers}</span>
                                    {dataSpace.amount_of_publishers === 1 ? t('home.dataProvider') : t('home.dataProviders')}
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <span className="ms-2">
                                            <InfoCircleFill size={14} className="cursor-pointer" />
                                        </span>
                                    </OverlayTrigger>
                                </span>
                            )}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DataspaceCard;
