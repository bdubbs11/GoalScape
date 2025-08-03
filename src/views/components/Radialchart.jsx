import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart = ({data, selectedCategory}) => {
// console.log("in radial chart", data);
const [series, setSeries] = useState([0, 0, 0]); // percentage values
const [rawCounts, setRawCounts] = useState([0,0,0]); // the real values

useEffect(() => {
  if (Array.isArray(data) && data.length === 3) {
    setRawCounts(data);
    const total = data.reduce((sum, val) => sum + val, 0);
      const percentSeries =
        total > 0 ? data.map(val => (val / total) * 100) : [0, 0, 0];

      setSeries(percentSeries);
    // setSeries(data);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 5000); // Give time for DOM to update
  } else {
    setRawCounts([0, 0, 0]);
    setSeries([0, 0, 0]);
  }
}, [data]);
// const series = Array.isArray(data) && data.length === 3 ? data : [0, 0, 0];
const labels = ["Done", "In progress", "To do"];

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
    labels,
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (_val, { seriesIndex }) {
          return `${rawCounts[seriesIndex]} ${labels[seriesIndex]}`;
        },
      },
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
        series={series}
        type="radialBar"
        height={350}
      />
    </div>
    </div>
   
  );
};

export default RadialChart;
