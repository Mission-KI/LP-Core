import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageView from '../../common/components/Header/ImageView/ImageView';
import $ from 'jquery';

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
            order: [[0, 'asc']],
            responsive: true,
        });

        return () => {
            table.destroy();
        };
    }, [datasetDetails]);

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
                        <table id="stringValueDistributionTable" className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th className='small py-2 bgc-primary text-white'>column</th>
                                    <th className='small py-2 bgc-primary text-white'>distribution</th>
                                    <th className='small py-2 bgc-primary text-white'>n_unique</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datasetDetails?._source?.structuredDatasets[0]?.stringColumns.map((column, index) => (
                                    <tr key={index} className='hover'>
                                        <td>{column.name}</td>
                                        <td>NA</td>
                                        <td>{column.numberUnique}</td>
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
