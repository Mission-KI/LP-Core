import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Spinner } from "react-bootstrap";
import { useAuth } from "../../common/contexts/AuthContext";
import { getAnalytics } from "../../monitoring/api/analytics";
import DownloadsOverTime from "../../monitoring/components/DownloadsOverTime";
import UploadsOverTime from "../../monitoring/components/UploadsOverTime";
import PublisherSelectorDropdown from "../../monitoring/components/PublisherSelectorDropdown";
import { useSearchParams } from "react-router-dom";
import PublishersList from "../../monitoring/components/PublishersList";
import AssetProcessingStateStats from "../../monitoring/components/AssetProcessingStateStats";
import EDPActions from "../../monitoring/components/EDPActions";
import { PageFilters } from "../components/PageFilters";

function Dashboard() {
  const { username } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const dataspace = searchParams.get("dataspace");
        const publisher = searchParams.get("publisher");
        const fetchedAnalytics = await getAnalytics(dataspace, publisher);
        setAnalytics(fetchedAnalytics);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    fetchAnalytics();
  }, [searchParams]);

  if (!analytics) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }
  const publisherSelected = !!searchParams.get("publisher");

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap align-items-center mt-4 mb-3 ps-1">
        <h2 className="bold">Welcome, {username}</h2>
        <PageFilters
          dataspaces={analytics?.dataspaces}
          publishers={analytics?.publishers}
        />
      </div>

      <div className="row">
        {!publisherSelected && (
          <div className="col-md-4 p-3">
            <div className="card d-flex justify-content-center flex-column w-100 h-100">
              <div className="card-body">
                <h6 className="mb-2 txt-regular">Publishers</h6>
                <h3 className="bold txt-primary-lighter">
                  {analytics.publishers_count}
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="col-md-4 p-3">
          <div className="card d-flex justify-content-center flex-column w-100 h-100">
            <div className="card-body">
              <h6 className="mb-2 txt-regular">EDP's</h6>
              <h3 className="bold txt-primary-lighter">
                {analytics.edp_count.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="card d-flex justify-content-center flex-column w-100 h-100">
            <div className="card-body">
              <h6 className="mb-2 txt-regular">Asset downloads</h6>
              <h3 className="bold txt-primary-lighter">
                {analytics?.edp_event_counts?.downloads?.toLocaleString()}
              </h3>
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
          <EDPActions analytics={analytics} />
          <AssetProcessingStateStats analytics={analytics} />
        </div>
        {!publisherSelected && (
          <div className="col-md-6">
            <PublishersList publishers={analytics?.publishers} />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
