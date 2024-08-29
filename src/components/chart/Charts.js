import React from "react";
import ReactApexChart from "react-apexcharts";

function Charts() {
  const series = [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    // plotOptions: {
    //   bar: {
    //     borderRadius: 4,
    //     borderRadiusApplication: "end",
    //     horizontal: true,
    //   },
    // },
    // dataLabels: {
    //   enabled: false,
    // },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
      ],
    },
  };

  return <ReactApexChart options={options} series={series} height={500} />;
}
export default Charts;
