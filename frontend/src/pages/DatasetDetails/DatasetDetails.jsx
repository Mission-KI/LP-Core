import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './DatasetDetails.module.css'
import { useParams } from 'react-router';
import { getDataset } from '../../api/elastic';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';

function DatasetDetails() {

    const { id } = useParams();
    const [datasetDetails, setDatasetDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDatasets = async () => {
            try {
                const fetchedDataset = await getDataset(id);
                setDatasetDetails(fetchedDataset);
            } catch (error) {
                console.error('Error fetching :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDatasets();
    }, [id]);

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
                <Spinner variant='primary' />
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="container px-5">
                <h4 className='bold mt-5'>{datasetDetails?._source?.body?.name}</h4>

                <div className='d-flex justify-content-between mt-4 flex-wrap' style={{ maxWidth: 630 }}>
                    <span className='small text-decoration-underline me-2'>{datasetDetails?._source?.body?.dataSpace?.name}</span>
                    <span className='small text-decoration-underline me-2'>serie-a-logistic solutions</span>
                    <span className='small me-2'>License other-commercial</span>
                    <span className='small me-2'>Version {(datasetDetails._version).toFixed(1)}</span>
                    <span className='small me-2'>
                        {moment(datasetDetails._source._timestamp).fromNow()}
                    </span>
                </div>

                <div className='d-flex align-items-center mt-4'>
                    {datasetDetails?._source?.body?.tags?.map((tag) =>
                        <button className='btn bg-teal small rounded-lg me-3' key={tag}>{tag}</button>
                    )}
                    <button className='btn bg-teal small rounded-lg me-3'>Transport</button>
                    <button className='btn bg-teal small rounded-lg me-3'>Price</button>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="rounded-lg border bg-white p-3 mt-2">
                            <p className='medium bold'>
                                DATA SCIENCE INFO
                            </p>
                            <hr />
                            <div className='d-flex w-100 justify-content-between'>
                                <div>
                                    <p className='medium mb-1'>Structure</p>
                                    <p className='medium mb-1'>Volume</p>
                                    <p className='medium mb-1'>Compression</p>
                                    <p className='medium mb-1'>Transfer type</p>
                                    <p className='medium mb-1'>Immutability</p>
                                    <p className='medium mb-1'>Growth</p>
                                    <p className='medium mb-1'>Growth rate</p>
                                    <p className='medium mb-1'>Temporal cover</p>
                                    <p className='medium mb-1'>Temporal consistency</p>
                                    <br />
                                    <p className='medium mb-1'>Number of columns</p>
                                    <p className='medium mb-1'>Number of lines</p>
                                    <p className='medium mb-1'>Data types</p>
                                    <p className='medium mb-1'>Attribute consistency</p>
                                    <p className='medium mb-1'>Languages</p>
                                    <p className='medium mb-1'>Numeric value distribution</p>
                                    <p className='medium mb-1'>String value distribution</p>
                                    <p className='medium mb-1'>Numeric correlation analysis</p>
                                    <p className='medium mb-1'>Numeric anomaly analysis</p>
                                    <p className='medium mb-1'>Data seasonality</p>
                                </div>
                                <div>
                                    <p className='medium mb-1'>Text (CSV)</p>
                                    <p className='medium mb-1'>{(datasetDetails?._source?.body?.volume / 1024 / 1024).toFixed(2)} MB</p>
                                    <p className='medium mb-1'>{datasetDetails?._source?.body?.compression ?? 'None'}</p>
                                    <p className='medium mb-1'>{datasetDetails?._source?.body?.transferTypeFlag ?? 'None'}</p>
                                    <p className='medium mb-1'>{datasetDetails?._source?.body?.immutabilityFlag ?? 'None'}</p>
                                    <p className='medium mb-1'>{datasetDetails?._source?.body?.growthFlag ?? 'None'}</p>
                                    <p className='medium mb-1'>Unknown</p>
                                    <p className='medium mb-1'>4 months</p>
                                    <p className='medium mb-1'>Inconsistent</p>
                                    <br />
                                    <p className='medium mb-1'>
                                        {datasetDetails?._source?.body?.datasets && datasetDetails?._source?.body.datasets.length > 0 ? datasetDetails?._source?.body.datasets[0].columns.length : 'No row count available'}
                                    </p>
                                    <p className='medium mb-1'>
                                        {datasetDetails?._source?.body?.datasets && datasetDetails?._source?.body.datasets.length > 0 ? datasetDetails?._source?.body.datasets[0].rowCount : 'No row count available'}
                                    </p>
                                    <p className='medium mb-1'>Time, string, numeric</p>
                                    <p className='medium mb-1'>Partially inconsistent</p>
                                    <p className='medium mb-1'>German, English</p>
                                    <p className='medium mb-1'>Heterogen</p>
                                    <p className='medium mb-1'>Heterogen</p>
                                    <p className='medium mb-1'>Partial correlation</p>
                                    <p className='medium mb-1'>Anomaly exists</p>
                                    <p className='medium mb-1'>Seasonal, no trend</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <Tabs
                            defaultActiveKey="list"
                            id={styles.datasetAttributeTabs}
                            className="mb-3"
                        >
                            <Tab eventKey="list" title={<span>ATTRIBUTE<br />LIST</span>} className={styles.tab}>
                                <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                                    <div className="table-responsive">
                                        <table className='table table-bordered'>
                                            <tr className='hover'>
                                                <th className='small py-2'>type</th>
                                                <th className='small py-2'>specification</th>
                                                <th className='small py-2'>attribute</th>
                                                <th className='small py-2'>type</th>
                                                <th className='small py-2'>specification</th>
                                                <th className='small py-2'>attribute</th>
                                            </tr>
                                            <tr className='hover'>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>key</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>cost_toll</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>external_reference</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>unit_revenue</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>datetime</td>
                                                <td>date/time</td>
                                                <td>orderDate</td>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>total_cost</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>loading_meters</td>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>get_unit_cost</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>weightKg</td>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>ankunt</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>price</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>Pickup_Cluster-Lat</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>pickupCountry</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>Pickup_Cluster-Lon</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>datetime</td>
                                                <td>date/time</td>
                                                <td>pickupDateTime</td>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>Delivery_Cluster-Lat</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>pickupStreet</td>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>Delivery_Cluster-Lon</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>pickupZipCode</td>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>Delivery_Cluster-Name</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>numeric</td>
                                                <td>int64</td>
                                                <td>pickupZip</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>Pickup_NUTS-1-ID</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>pickupLat</td>
                                                <td>datetime</td>
                                                <td>date/time</td>
                                                <td>Pickup_NUTS-1-1D</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>pickupLon</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>Pickup_NUTS-1-Lat</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>key_1</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>Pickup_NUTS-1-Lon</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>key_1</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>Pickup_NUTS-1-Lon</td>
                                            </tr>
                                            <tr className='hover'>
                                                <td>string</td>
                                                <td>string</td>
                                                <td>key_1</td>
                                                <td>numeric</td>
                                                <td>float64</td>
                                                <td>Pickup_NUTS-1-Lon</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title={<span>ATTRIBUTE<br />CONSISTENCY</span>} className={styles.tab}>
                                ATTRIBUTE CONSISTENCY
                            </Tab>
                            <Tab eventKey="contact" title={<span>TEMPORAL<br />CONSISTENCY</span>} className={styles.tab}>
                                TEMPORAL CONSISTENCY
                            </Tab>
                            <Tab eventKey="home1" title={<span>NUMERIC VALUE<br />DISTRIBUTION</span>} className={styles.tab}>
                                NUMERIC VALUE DISTRIBUTION
                            </Tab>
                            <Tab eventKey="home2" title={<span>STRING VALUE<br />DISTRIBUTION</span>} className={styles.tab}>
                                STRING VALUE DISTRIBUTION
                            </Tab>
                            <Tab eventKey="home3" title={<span>NUMERIC CORRELATION<br />ANALYSIS</span>} className={styles.tab}>
                                NUMERIC CORRELATION ANALYSIS
                            </Tab>
                            <Tab eventKey="home4" title={<span>NUMERIC ANOMALY<br />ANALYSIS</span>} className={styles.tab}>
                                NUMERIC ANOMALY ANALYSIS
                            </Tab>
                            <Tab eventKey="home5" title={<span>DATA<br />SEASONALITY</span>} className={styles.tab}>
                                DATA SEASONALITY
                            </Tab>

                        </Tabs>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DatasetDetails
