import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const UploadsOverTime = ({ analytics }) => {
  if (!analytics || !analytics.edp_event_counts.uploads_per_month)
    return <p>Loading...</p>;

  const uploadsData = analytics.edp_event_counts.uploads_per_month;

  const labels = Object.keys(uploadsData);
  const dataValues = Object.values(uploadsData);

  const data = {
    labels,
    datasets: [
      {
        label: "Uploads Per Month",
        data: dataValues,
        fill: true,
        backgroundColor: "rgba(0,158,253, 0.2)",
        borderColor: "rgb(0,158,253)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
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
    layout: {
      padding: {
        left: -24,
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
      <h5 className="bold mt-4 mb-4">EDP Uploads Over Time</h5>
      <Line data={data} options={options} />
    </div>
  );
};

export default UploadsOverTime;
