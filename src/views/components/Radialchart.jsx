import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart = ({data, selectedCategory}) => {
// console.log("in radial chart", data);
const [series, setSeries] = useState([0, 0, 0]);
useEffect(() => {
  if (Array.isArray(data) && data.length === 3) {
    setSeries(data);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50); // Give time for DOM to update
  } else {
    setSeries([0, 0, 0]);
  }
}, [data]);
// const series = Array.isArray(data) && data.length === 3 ? data : [0, 0, 0];

  const chartOptions = {
    series,
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
    chart: {
      type: "radialBar",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        track: {
          background: "#E5E7EB",
        },
        dataLabels: {
          show: false,
        },
        hollow: {
          size: "32%",
        },
      },
    },
    labels: ["Done", "In progress", "To do"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <div className="max-w-5xl w-full rounded-lg p-4 md:p-6">
      <div className="flex justify-between items-start w-full mb-4">
        <h5 className="text-xl text-background font-bold leading-none capitalize">
           {selectedCategory ? `Goals in ${selectedCategory}` : "Select a Category"}
        </h5>
     </div>
    <div id="radial-chart">
      <ReactApexChart
        key={selectedCategory || series.join("-")}
        options={chartOptions}
        series={chartOptions.series}
        type="radialBar"
        height={350}
      />
    </div>
    </div>
   
  );
};

export default RadialChart;
