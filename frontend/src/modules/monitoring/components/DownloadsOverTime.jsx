import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DownloadsOverTime = ({ analytics }) => {
    if (!analytics || !analytics.edp_event_counts.downloads_per_month) return <p>Loading...</p>;

    const downloadsData = analytics.edp_event_counts.downloads_per_month;

    const labels = Object.keys(downloadsData);
    const dataValues = Object.values(downloadsData);

    const data = {
        labels,
        datasets: [
            {
                label: "Downloads Per Month",
                data: dataValues,
                fill: true,
                backgroundColor: 'rgba(0,158,253, 0.2)',
                borderColor: 'rgb(0,158,253)',
                tension: 0.4,
            },
        ],
    };



    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                title: { display: true },
                grid: {
                    display: false,
                },
            },
            y: { title: { display: true }, beginAtZero: true },
        },
    };

    return (
        <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
            <h4 className='bold mt-4 mb-4'>EDP Downloads</h4>
            <Line data={data} options={options} />
        </div>
    );
};

export default DownloadsOverTime;
