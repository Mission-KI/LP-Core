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
                <h5 className='bold mt-5'>Logistik Trandportaufträge Details</h5>

                <div className='d-flex justify-content-between mt-4' style={{ maxWidth: 630 }}>
                    <span className='small text-decoration-underline'>Dataroom MDS</span>
                    <span className='small text-decoration-underline'>serie-a-logistic solutions</span>
                    <span className='small'>License other-commercial</span>
                    <span className='small'>Version 1.0</span>
                    <span className='small'>two years ago</span>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="rounded-lg border p-3">
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
                                    <tr className='hover py-1'>
                                        <th className='bg-primary text-white small'>type</th>
                                        <th className='bg-primary text-white small'>specification</th>
                                        <th className='bg-primary text-white small'>attribute</th>
                                        <th className='bg-primary text-white small'>type</th>
                                        <th className='bg-primary text-white small'>specification</th>
                                        <th className='bg-primary text-white small'>attribute</th>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>key</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>cost_toll</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>external_reference</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>unit_revenue</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>datetime</td>
                                        <td className='small'>date/time</td>
                                        <td className='small'>orderDate</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>total_cost</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>loading_meters</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>get_unit_cost</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>weightKg</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>ankunt</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>price</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Pickup_Cluster-Lat</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>pickupCountry</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Pickup_Cluster-Lon</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>datetime</td>
                                        <td className='small'>date/time</td>
                                        <td className='small'>pickupDateTime</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>Delivery_Cluster-Lat</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>pickupStreet</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>Delivery_Cluster-Lon</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>pickupZipCode</td>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>Delivery_Cluster-Name</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>pickupZip</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Pickup_NUTS-1-ID</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>pickupLat</td>
                                        <td className='small'>datetime</td>
                                        <td className='small'>date/time</td>
                                        <td className='small'>Pickup_NUTS-1-1D</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>pickupLon</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Pickup_NUTS-1-Lat</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>key_1</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Pickup_NUTS-1-Lon</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>deliveryCountry</td>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>Delivery_NUTS-1-ID</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>datetime</td>
                                        <td className='small'>date/time</td>
                                        <td className='small'>deliveryDateTime</td>
                                        <td className='small'>datetime</td>
                                        <td className='small'>date/time</td>
                                        <td className='small'>Delivery_NUTS-1-1D</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>deliveryStreet</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Delivery_NUTS-1-Lat</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>deliveryZipCode</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Delivery_NUTS-1-Lon</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>int64</td>
                                        <td className='small'>deliveryZip</td>
                                        <td className='small'>string</td>
                                        <td className='small'>string</td>
                                        <td className='small'>Pickup_NUTS-2-ID</td>
                                    </tr>
                                    <tr className='hover py-1'>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>deliveryLat</td>
                                        <td className='small'>numeric</td>
                                        <td className='small'>float64</td>
                                        <td className='small'>Pickup_NUTS-2-Lat</td>
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
