import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import $ from 'jquery';
import ImageView from '../../common/components/Header/ImageView/ImageView';
import { useTranslation } from 'react-i18next';

function NumericValueDistribution({ datasetDetails }) {
    useEffect(() => {
        const table = $('#distributionTable').DataTable({
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
                            column.distributionGraph && (
                                <div className='col-md-3' key={column.name}>
                                    <ImageView url={column.distributionGraph} />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </Tab>
            <Tab eventKey="table" title="Table">
                <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                    <div className="table-responsive">
                        <table id="distributionTable" className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th className='small py-2 bgc-primary text-white'>column</th>
                                    <th className='small py-2 bgc-primary text-white'>distribution</th>
                                    <th className='small py-2 bgc-primary text-white' style={{ textAlign: 'left' }}>n_unique</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map((column, index) => (
                                    <tr key={index} className='hover'>
                                        <td>{column.name}</td>
                                        <td>{column.distribution}</td>
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

export default NumericValueDistribution;
