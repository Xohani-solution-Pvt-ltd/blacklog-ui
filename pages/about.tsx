// import React from "react";
// import Layout from "@/components/Layout";
// import Image from "next/image";
// import Bannerimg from "../public/banner.jpg";

// const about = () => {
//   return (
//     <>
//       <Layout />
//       <div>
//         <Image className="banner-img" src={Bannerimg} alt="banner" />
//       </div>
//     </>
//   );
// };

// export default about;

import React from "react";
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
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "september",
  "october",
  "november",
  "december",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => [57, 88, 63, 56, 45, 63]),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => [55, 56, 46, 36, 47, 86]),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Dataset 3",
      data: labels.map(() => [45, 68, 63, 86, 45, 63]),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const LineChartPage = () => {
  return <Line options={options} data={data} />;
};

export default LineChartPage;
