import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageView from '../../common/components/ImageView/ImageView';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';

function StringValueDistribution({ datasetDetails }) {
    const [defaultTab, setDefaultTab] = useState('graphics');

    useEffect(() => {
        const hasDistributionGraph = datasetDetails?._source?.structuredDatasets[0]?.stringColumns.some(
            (column) => column.distributionGraph
        );

        if (!hasDistributionGraph) {
            setDefaultTab('table');
        }
    }, [datasetDetails]);

    useEffect(() => {
        const table = $('#stringValueDistributionTable').DataTable({
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
    }, [datasetDetails]);

    const { t } = useTranslation();

    return (
        <Tabs
            activeKey={defaultTab}
            onSelect={(key) => setDefaultTab(key)}
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="graphics" title="Graphics">
                <div className='container'>
                    <div className="row">
                        {datasetDetails?._source?.structuredDatasets[0]?.stringColumns.map((column, index) => (
                            column.distributionGraph && (
                                <div className='col-md-3' key={index}>
                                    <ImageView url={column.distributionGraph} />
                                </div>
                            )))}
                    </div>
                </div>
            </Tab>
            <Tab eventKey="table" title="Table">
                <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                    <div className="table-responsive">
                        <table id="stringValueDistributionTable" className='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th className='py-2 w-33'>column</th>
                                    <th className='py-2 w-33'>distribution</th>
                                    <th className='py-2 w-33' style={{ textAlign: 'left' }}>n_unique</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datasetDetails?._source?.structuredDatasets[0]?.stringColumns.map((column, index) => (
                                    <tr key={index} className='hover'>
                                        <td className='w-33'>{column.name}</td>
                                        <td className='w-33'>NA</td>
                                        <td className='w-33'>{column.numberUnique}</td>
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

export default StringValueDistribution;
