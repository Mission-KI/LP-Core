import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ImageView from '../../common/components/Header/ImageView/ImageView';

function StringValueDistribution({ datasetDetails }) {
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
                                <div className='col-md-3'>
                                    <ImageView url={column.distributionGraph} />
                                </div>
                            )))}
                    </div>
                </div>

            </Tab>
            <Tab eventKey="table" title="Table">
                <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th className='small py-2 bgc-primary text-white'>attribute</th>
                                    <th className='small py-2 bgc-primary text-white'>upper quantile</th>
                                    <th className='small py-2 bgc-primary text-white'>lower quantile</th>
                                    <th className='small py-2 bgc-primary text-white'>count q</th>
                                    <th className='small py-2 bgc-primary text-white'>upper zscore</th>
                                    <th className='small py-2 bgc-primary text-white'>lower zscore</th>
                                    <th className='small py-2 bgc-primary text-white'>count zscore</th>
                                    <th className='small py-2 bgc-primary text-white'>upper iqr</th>
                                    <th className='small py-2 bgc-primary text-white'>lower iqr</th>
                                    <th className='small py-2 bgc-primary text-white'>iqr</th>
                                    <th className='small py-2 bgc-primary text-white'>count iqr</th>
                                </tr>
                            </thead>
                            <tbody>

                                {datasetDetails?._source?.structuredDatasets[0]?.numericColumns.map((column, index) => (
                                    <tr key={index} className='hover'>
                                        <td>{column.name}</td>
                                        <td>{column.upperQuantile}</td>
                                        <td>{column.lowerQuantile}</td>
                                        <td>??</td>
                                        <td>{column.upperZScore}</td>
                                        <td>{column.lowerZScore}</td>
                                        <td>{column.zScoreOutlierCount}</td>
                                        <td>{column.upperIQR}</td>
                                        <td>{column.lowerIQR}</td>
                                        <td>{column.iqr}</td>
                                        <td>{column.iqrOutlierCount}</td>
                                    </tr>
                                ))
                                }

                            </tbody>

                        </table>
                    </div>
                </div >
            </Tab>
        </Tabs>
    )
}

export default StringValueDistribution
