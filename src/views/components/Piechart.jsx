import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data }) => {

  console.log(data);
  // series nends to be from the array
  // colors as well?
  // labels needs to be from the array as well

  const series = data?.length ? data.map(item => item.value) : [52, 26, 20, 2];
  const labels = data?.length ? data.map(item => item.label) : ["Direct", "Organic search", "Referrals", "Other"];

  const chartOptions = {
    series: [52.8, 26.8, 20.4],
    options: {
      chart: {
        type: "pie",
        height: 420,
        width: "100%",
      },
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      stroke: {
        colors: ["#ffffff"],
      },
      plotOptions: {
        pie: {
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      labels: ["Direct", "Organic search", "Referrals"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value}%`,
        },
      },
      xaxis: {
        labels: {
          formatter: (value) => `${value}%`,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    },
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-start w-full mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Website traffic
        </h5>
      </div>

      <div id="pie-chart" className="py-6">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="pie"
          height={420}
        />
      </div>

      <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Last 7 days
            <svg
              className="w-2.5 h-2.5 ms-1.5 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <a
            href="#"
            className="uppercase text-sm font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-500"
          >
            Traffic analysis
            <svg
              className="w-2.5 h-2.5 ms-1.5 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
