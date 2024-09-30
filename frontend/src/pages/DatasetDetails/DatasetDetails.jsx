import React from 'react'
import Header from '../../components/Header/Header'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './DatasetDetails.module.css'
import { useParams } from 'react-router';

function DatasetDetails() {

    const { id } = useParams();

    return (
        <>
            <Header />
            <div className="container px-5">
                <h4 className='bold mt-5'>Logistik Trandportaufträge Details</h4>

                <div className='d-flex justify-content-between mt-4 flex-wrap' style={{ maxWidth: 630 }}>
                    <span className='small text-decoration-underline me-2'>Dataroom MDS</span>
                    <span className='small text-decoration-underline me-2'>serie-a-logistic solutions</span>
                    <span className='small me-2'>License other-commercial</span>
                    <span className='small me-2'>Version 1.0</span>
                    <span className='small me-2'>two years ago</span>
                </div>

                <div className='d-flex align-items-center mt-4'>
                    <span className='text-muted small me-3'>Tags</span>
                    <button className='btn btn-basic small rounded-lg me-3'>Logistic</button>
                    <button className='btn btn-basic small rounded-lg me-3'>Transport</button>
                    <button className='btn btn-basic small rounded-lg me-3'>Price</button>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="rounded-lg border bg-white p-3 mt-2">
                            <p className='small bold'>
                                DATA SCIENCE INFO
                            </p>
                            <hr />
                            <div className='d-flex w-100 justify-content-between'>
                                <div>
                                    <p className='small mb-1'>STRUCTURE</p>
                                    <p className='small mb-1'>VOLUME</p>
                                    <p className='small mb-1'>COMPRESSION</p>
                                    <p className='small mb-1'>TRANSFER TYPE</p>
                                    <p className='small mb-1'>IMMUTABILITY</p>
                                    <p className='small mb-1'>GROWTH</p>
                                    <p className='small mb-1'>GROWTH RATE</p>
                                    <p className='small mb-1'>TEMPORAL COVER</p>
                                    <p className='small mb-1'>TEMPORAL CONSISTENCY</p>
                                    <br />
                                    <p className='small mb-1'>NUMBER OF COLUMNS</p>
                                    <p className='small mb-1'>NUMBER OF LINES</p>
                                    <p className='small mb-1'>DATA TYPES</p>
                                    <p className='small mb-1'>ATTRIBUTE CONSISTENCY</p>
                                    <p className='small mb-1'>LANGUAGES</p>
                                    <p className='small mb-1'>NUMERIC VALUE DISTRIBUTION</p>
                                    <p className='small mb-1'>STRING VALUE DISTRIBUTION</p>
                                    <p className='small mb-1'>NUMERIC CORRELATION ANALYSIS</p>
                                    <p className='small mb-1'>NUMERIC ANOMALY ANALYSIS</p>
                                    <p className='small mb-1'>DATA SEASONALITY</p>
                                </div>
                                <div>
                                    <p className='small mb-1'>Text (CSV)</p>
                                    <p className='small mb-1'>78,2 MB</p>
                                    <p className='small mb-1'>non-compressed</p>
                                    <p className='small mb-1'>singular</p>
                                    <p className='small mb-1'>frequent</p>
                                    <p className='small mb-1'>inflated</p>
                                    <p className='small mb-1'>unkown</p>
                                    <p className='small mb-1'>4 months</p>
                                    <p className='small mb-1'>inconsistant</p>
                                    <br />
                                    <p className='small mb-1'>86</p>
                                    <p className='small mb-1'>8429</p>
                                    <p className='small mb-1'>time, string, numeric</p>
                                    <p className='small mb-1'>partially inconsistant</p>
                                    <p className='small mb-1'>german, english</p>
                                    <p className='small mb-1'>heterogen</p>
                                    <p className='small mb-1'>heterogen</p>
                                    <p className='small mb-1'>partial correlation</p>
                                    <p className='small mb-1'>anomaly exists</p>
                                    <p className='small mb-1'>seasonal, no trend</p>
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
                            <Tab eventKey="list" title="ATTRIBUTE LIST" className={styles.tab}>
                                <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                                    <div className="table-responsive">
                                        <table className='table table-bordered'>
                                            <tr className='hover'>
                                                <th className='bg-primary-darker text-white small py-2'>type</th>
                                                <th className='bg-primary-darker text-white small py-2'>specification</th>
                                                <th className='bg-primary-darker text-white small py-2'>attribute</th>
                                                <th className='bg-primary-darker text-white small py-2'>type</th>
                                                <th className='bg-primary-darker text-white small py-2'>specification</th>
                                                <th className='bg-primary-darker text-white small py-2'>attribute</th>
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
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="ATTRIBUTE CONSISTENCY" className={styles.tab}>
                                ATTRIBUTE CONSISTENCY
                            </Tab>
                            <Tab eventKey="contact" title="TEMPORAL CONSISTENCY" className={styles.tab}>
                                TEMPORAL CONSISTENCY
                            </Tab>
                            <Tab eventKey="home" title="NUMERIC VALUE DISTRIBUTION" className={styles.tab}>
                                NUMERIC VALUE DISTRIBUTION
                            </Tab>
                            <Tab eventKey="home" title="STRING VALUE DISTRIBUTION" className={styles.tab}>
                                STRING VALUE DISTRIBUTION
                            </Tab>
                            <Tab eventKey="home" title="NUMERIC CORRELATION ANALYSIS" className={styles.tab}>
                                NUMERIC CORRELATION ANALYSIS
                            </Tab>
                            <Tab eventKey="home" title="NUMERIC ANOMALY ANALYSIS" className={styles.tab}>
                                NUMERIC ANOMALY ANALYSIS
                            </Tab>
                            <Tab eventKey="home" title="DATA SEASONALITY" className={styles.tab}>
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
