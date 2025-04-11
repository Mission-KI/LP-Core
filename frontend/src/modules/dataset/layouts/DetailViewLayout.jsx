import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router";
import { getEdp } from "../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import PageNotFound from "../../common/pages/PageNotFound";
import Breadcrumbs from "../../common/components/Breadcrumbs";

function DetailViewLayout() {
  const { id } = useParams();
  const [edp, setEdp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdp = async () => {
      try {
        const fetchedEdp = await getEdp(id);
        setEdp(fetchedEdp);
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdp();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <Spinner variant="dark" />
      </div>
    );
  }

  if (!edp) {
    return <PageNotFound />;
  }

  return (
    <>
      <div className="container-fluid px-5 pb-5">
        <Breadcrumbs />
        <Outlet />
      </div>
    </>
  );
}

export default DetailViewLayout;
