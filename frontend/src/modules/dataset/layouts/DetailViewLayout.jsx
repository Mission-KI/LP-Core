import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Outlet } from "react-router";
import { getDataset } from "../../common/api/elastic";
import Spinner from "react-bootstrap/Spinner";
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import { useTranslation } from "react-i18next";
import PageNotFound from "../../common/pages/PageNotFound";
import Breadcrumbs from "../../common/components/Breadcrumbs";

function DetailViewLayout() {
    const { id } = useParams();
    const [datasetDetails, setDatasetDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDatasets = async () => {
            try {
                const fetchedDataset = await getDataset(id);
                setDatasetDetails(fetchedDataset);
            } catch (error) {
                console.error("Error fetching :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDatasets();
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

    if (!datasetDetails) {
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
