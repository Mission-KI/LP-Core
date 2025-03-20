import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Spinner } from 'react-bootstrap';
import { useAuth } from "../../common/contexts/AuthContext";
import Header from "../components/Header";
import { getAnalytics } from '../monitoring';
import { CloudArrowUp, Download, Pencil, PencilFill, Trash3 } from 'react-bootstrap-icons';
import DownloadsOverTime from '../components/DownloadsOverTime';
import UploadsOverTime from '../components/UploadsOverTime';

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
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <div className="container px-5 pb-5 mb-4">

            <Header />

            <div className="d-flex justify-content-between align-items-center mt-4 mb-3 ps-1">
                <h2 className="bold">{username} - Monitoring Dashboard</h2>
            </div>

            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2 txt-regular">Publishers</h6>
                            <h3 className="bold txt-primary-lighter">{analytics.publishers_count}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2 txt-regular">EDP's</h6>
                            <h3 className="bold txt-primary-lighter">{(analytics.edp_count).toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2 txt-regular">Asset downloads</h6>
                            <h3 className="bold txt-primary-lighter">{analytics?.edp_event_counts?.downloads?.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <DownloadsOverTime analytics={analytics} />
                </div>
                <div className="col-md-6">
                    <UploadsOverTime analytics={analytics} />
                </div>
            </div>


            <div className="row">
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>EDP actions</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th><CloudArrowUp className='me-2 text-success' /> Successful EDP uploads</th>
                                <td className='text-end'>{analytics.edp_event_counts.uploads.successfull?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><CloudArrowUp className='me-2 txt-danger' /> Failed EDP uploads</th>
                                <td className='text-end'>{analytics.edp_event_counts.uploads.failed?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Pencil className='me-2 text-success' /> Successful EDP updates</th>
                                <td className='text-end'>{analytics.edp_event_counts.edits.successfull?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Pencil className='me-2 txt-danger' /> Failed EDP updates</th>
                                <td className='text-end'>{analytics.edp_event_counts.edits.failed?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Trash3 className='me-2 text-success' /> Successful EDP deletions</th>
                                <td className='text-end'>{analytics.edp_event_counts.deletions.successfull?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Trash3 className='me-2 txt-danger' /> Failed EDP deletions</th>
                                <td className='text-end'>{analytics.edp_event_counts.deletions.failed?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Download className='me-2' /> Asset downloads</th>
                                <td className='text-end'>{analytics?.edp_event_counts?.downloads?.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 className='bold mt-5 mb-4'>Assets Per Processing State</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Assets With Original Data</th>
                                <td className='text-end'>{analytics?.original_data_count?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Assets With Processed Data</th>
                                <td className='text-end'>{analytics?.processed_data_count?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Assets With Refined Data</th>
                                <td className='text-end'>{analytics?.refined_data_count?.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Assets With AI/ML result Data</th>
                                <td className='text-end'>{analytics?.aiml_result_data_count?.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>Publishers</h4>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Publisher</th>
                                <th className='text-end'>Number of EDP's</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics?.publishers?.map(publisher => (
                                <tr key={publisher.key}>
                                    <td>{publisher.key}</td>
                                    <td className='text-end'>{publisher?.doc_count?.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
