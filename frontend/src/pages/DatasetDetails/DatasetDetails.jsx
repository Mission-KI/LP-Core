import React from 'react'
import Header from '../../components/Header/Header'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './DatasetDetails.module.css'

function DatasetDetails() {
    return (
        <>
            <Header />
            <div className="container px-5">
                <h4 className='bold mt-5'>Logistik Trandportaufträge Details</h4>

                <div className='d-flex justify-content-between mt-4' style={{ maxWidth: 630 }}>
                    <span className='small text-decoration-underline'>Dataroom MDS</span>
                    <span className='small text-decoration-underline'>serie-a-logistic solutions</span>
                    <span className='small'>License other-commercial</span>
                    <span className='small'>Version 1.0</span>
                    <span className='small'>two years ago</span>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="rounded-lg border bg-white p-3">
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
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>key</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>cost_toll</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>external_reference</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>unit_revenue</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>datetime</td>
                                        <td className='small py-2'>date/time</td>
                                        <td className='small py-2'>orderDate</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>total_cost</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>loading_meters</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>get_unit_cost</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>weightKg</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>ankunt</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>price</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Pickup_Cluster-Lat</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>pickupCountry</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Pickup_Cluster-Lon</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>datetime</td>
                                        <td className='small py-2'>date/time</td>
                                        <td className='small py-2'>pickupDateTime</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>Delivery_Cluster-Lat</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>pickupStreet</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>Delivery_Cluster-Lon</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>pickupZipCode</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>Delivery_Cluster-Name</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>pickupZip</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Pickup_NUTS-1-ID</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>pickupLat</td>
                                        <td className='small py-2'>datetime</td>
                                        <td className='small py-2'>date/time</td>
                                        <td className='small py-2'>Pickup_NUTS-1-1D</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>pickupLon</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Pickup_NUTS-1-Lat</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>key_1</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Pickup_NUTS-1-Lon</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>deliveryCountry</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>Delivery_NUTS-1-ID</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>datetime</td>
                                        <td className='small py-2'>date/time</td>
                                        <td className='small py-2'>deliveryDateTime</td>
                                        <td className='small py-2'>datetime</td>
                                        <td className='small py-2'>date/time</td>
                                        <td className='small py-2'>Delivery_NUTS-1-1D</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>deliveryStreet</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Delivery_NUTS-1-Lat</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>deliveryZipCode</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Delivery_NUTS-1-Lon</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>int64</td>
                                        <td className='small py-2'>deliveryZip</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>string</td>
                                        <td className='small py-2'>Pickup_NUTS-2-ID</td>
                                    </tr>
                                    <tr className='hover'>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>deliveryLat</td>
                                        <td className='small py-2'>numeric</td>
                                        <td className='small py-2'>float64</td>
                                        <td className='small py-2'>Pickup_NUTS-2-Lat</td>
                                    </tr>
                                </table>
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
