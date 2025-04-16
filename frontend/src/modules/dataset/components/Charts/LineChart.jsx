import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const generateRandomData = () =>
  labels.map(() => Math.floor(Math.random() * 2001 - 1000));

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: generateRandomData(),
      backgroundColor: "#cf004c55",
      borderColor: "#cf004c",
      tension: 0.4,
      fill: true, // This fills the area below the line with the background color
    },
    {
      label: "Dataset 2",
      data: generateRandomData(),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: true, // Fill below the line
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} height={400} />;
}
