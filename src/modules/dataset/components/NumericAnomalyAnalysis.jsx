import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageView from '../../common/components/Header/ImageView/ImageView';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';

function NumericAnomalyAnalysis({ datasetDetails }) {
    useEffect(() => {
        const table = $('#anomalyTable').DataTable({
            paging: false,
            searching: true,
            info: true,
            lengthChange: false,
            pageLength: 20,
            order: [],
            responsive: true,
        });

        return () => {
            table.destroy();
        };
    }, []);

    const { t } = useTranslation();

    return (
        <Tabs
            defaultActiveKey="graphics"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="graphics" title="Graphics">
                <div className='container'>
                    <div className="row">
                        {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map((column) => (
                            column.boxPlot && (
                                <div className='col-md-3' key={column.name}>
                                    <ImageView url={column.boxPlot} />
                                </div>
                            )))}
                    </div>
                </div>
            </Tab>
            <Tab eventKey="table" title="Table">
                <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                    <div className="table-responsive">
                        <table id="anomalyTable" className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.attribute')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.upperQuantile')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.lowerQuantile')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.outlierCountQuantile')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.upperZscore')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.lowerZscore')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.outlierCountZscore')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.upperIqr')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.lowerIqr')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.iqr')}</th>
                                    <th className='small py-2 bgc-primary text-white'>{t('table.attributes.outlierCountIqr')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map((column, index) => (
                                    <tr key={index} className='hover'>
                                        <td>{column.name}</td>
                                        <td>{column.upperQuantile}</td>
                                        <td>{column.lowerQuantile}</td>
                                        <td>{column.percentileOutlierCount}</td>
                                        <td>{column.upperZScore}</td>
                                        <td>{column.lowerZScore}</td>
                                        <td>{column.zScoreOutlierCount}</td>
                                        <td>{column.upperIQR}</td>
                                        <td>{column.lowerIQR}</td>
                                        <td>{column.iqr}</td>
                                        <td>{column.iqrOutlierCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Tab>
        </Tabs>
    );
}

export default NumericAnomalyAnalysis;