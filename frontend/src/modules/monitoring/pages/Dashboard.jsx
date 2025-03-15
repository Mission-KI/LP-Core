import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Spinner } from 'react-bootstrap';
import { useAuth } from "../../common/contexts/AuthContext";
import Header from "../components/Header";
import { getAnalytics } from '../monitoring';

function Dashboard() {

    const { username } = useAuth();
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const fetchedAnalytics = await getAnalytics();
                setAnalytics(fetchedAnalytics);
            } catch (error) {
                toast.error(error.message || "Failed to fetch analytics");
            }
        };

        fetchAnalytics();
    }, []);

    if (!analytics) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <div className="container px-5">

            <Header />

            <div className="d-flex justify-content-between align-items-center mt-4 mb-3 ps-1">
                <h2 className="bold">{username} Monitoring Dashboard</h2>
            </div>

            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2">Publishers</h6>
                            <h3 className="bold txt-primary-lighter">{analytics.publishers_count}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2">EDP's</h6>
                            <h3 className="bold txt-primary-lighter">{analytics.edp_count}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2">Asset downloads</h6>
                            <h3 className="bold txt-primary-lighter">243</h3> {/* Mock value */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>EDP actions</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Successful EDP uploads</th>
                                <td className='text-end'>{analytics.edp_event_counts.uploads.successfull}</td>
                            </tr>
                            <tr>
                                <th>Failed EDP uploads</th>
                                <td className='text-end'>{analytics.edp_event_counts.uploads.failed}</td>
                            </tr>
                            <tr>
                                <th>Successful EDP updates</th>
                                <td className='text-end'>{analytics.edp_event_counts.edits.successfull}</td>
                            </tr>
                            <tr>
                                <th>Failed EDP updates</th>
                                <td className='text-end'>{analytics.edp_event_counts.edits.failed}</td>
                            </tr>
                            <tr>
                                <th>Successful EDP deletions</th>
                                <td className='text-end'>{analytics.edp_event_counts.deletions.successfull}</td>
                            </tr>
                            <tr>
                                <th>Failed EDP deletions</th>
                                <td className='text-end'>{analytics.edp_event_counts.deletions.failed}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>Assets Per Processing State</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Assets With Original Data</th>
                                <td className='text-end'>{analytics.original_data_count}</td>
                            </tr>
                            <tr>
                                <th>Assets With Processed Data</th>
                                <td className='text-end'>{analytics.processed_data_count}</td>
                            </tr>
                            <tr>
                                <th>Assets With Refined Data</th>
                                <td className='text-end'>{analytics.refined_data_count}</td>
                            </tr>
                            <tr>
                                <th>Assets With AI/ML result Data</th>
                                <td className='text-end'>{analytics.aiml_result_data_count}</td>
                            </tr>
                            <tr>
                                <th>Amount per data format</th>
                                <td className='text-end'>567567</td> {/* Mock value */}
                            </tr>
                            <tr>
                                <th>Asset downloads</th>
                                <td className='text-end'>567567</td> {/* Mock value */}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>Other</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Amount per data format</th>
                                <td className='text-end'>567567</td> {/* Mock value */}
                            </tr>
                            <tr>
                                <th>Asset downloads</th>
                                <td className='text-end'>567567</td> {/* Mock value */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
