import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data, onSliceClick }) => {

  // console.log("piechart info", data);
  // series nends to be from the array
  // colors as well?
  // labels needs to be from the array as well

  const series = data?.length ? data.map(item => parseFloat(item.value)) : [52, 26, 20, 2];
  const labels = data?.length ? data.map(item => item.label) : ["Direct", "Organic search", "Referrals", "Other"];

  const HEX_COLOR_POOL = [
    "#1C64F2", "#16BDCA", "#9061F9", "#FACC15", "#EF4444",
    "#10B981", "#F472B6", "#8B5CF6", "#FB923C", "#22D3EE",
    "#6366F1", "#14B8A6", "#F59E0B", "#DC2626", "#A855F7",
    "#3B82F6", "#059669", "#EC4899", "#7C3AED", "#E879F9"
  ];

const HEX_COLOR_PALETTE = [
  "#403f39", // base charcoal
  "#b46357", // base terracotta
  "#5a534d", // dark taupe
  "#d6a18b", // light terra peach
  "#6c5b52", // cool brown
  "#a25447", // deeper terracotta
  "#7a6a61", // warm slate
  "#c97b6a", // soft clay
  "#91857e", // dusty gray beige
  "#8e4e3c", // rust brown
  "#bfaea3", // pale ash
  "#473f3a", // charcoal variation
  "#a9685b", // weathered red
  "#685e58", // smoky taupe
  "#ce9b88", // desaturated coral
  "#574d47", // dark stone
  "#ac786d", // warm dusty rose
  "#382f2a", // deep coffee
  "#9f5748", // baked red clay
  "#84776e"  // muted greige
];


  const colors = HEX_COLOR_PALETTE.slice(0, labels.length);

  // console.log("series:", series);
  // console.log("labels:", labels);

  const chartOptions = {
    series,
    options: {
      chart: {
        type: "pie",
        height: 420,
        width: "100%",
        events: {
          dataPointSelection: (event, chartContext, config) => {
          const clickedIndex = config.dataPointIndex;
          const label = labels[clickedIndex];
          const value = series[clickedIndex];
          
          //  Replace this with your custom logic
          onSliceClick?.(label);
          // console.log(`You clicked on: ${label} (${value}%)`);

          // Example: setSelectedCategory(label);
        }
        }
      },
      colors,
      stroke: {
        colors: ["#403f39"],
      },
      plotOptions: {
        pie: {
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      labels,
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
        labels: {
          colors: "#403f39",
        }
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
    <div className="max-w-5xl w-full rounded-lg p-4 md:p-6">
      <div className="flex justify-between items-start w-full mb-4">
        <h5 className="text-xl text-background font-bold leading-none">
          Percents of Types of Goals
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
    </div>
  );
};

export default PieChart;
