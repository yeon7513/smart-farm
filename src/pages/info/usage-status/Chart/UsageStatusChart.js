import React from 'react';
// import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

function UsageStatusChart({ data = [], chartType, labels = [] }) {
  const chartOptions = {
    chart: {
      type: chartType,
    },
    plotOptions:
      chartType === 'bar'
        ? {
            bar: {
              horizontal: true,
            },
          }
        : undefined,
    labels: chartType === 'pie' || chartType === 'donut' ? labels : undefined,
    xaxis:
      chartType === 'bar' || chartType === 'line'
        ? { categories: labels.length > 0 ? labels : undefined }
        : undefined,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const series =
    chartType === 'line'
      ? { data: data }
      : chartType === 'bar'
      ? [
          {
            data: labels.map((label, idx) => ({
              x: label,
              y: data[idx],
            })),
          },
        ]
      : chartType === 'pie' || chartType === 'donut'
      ? data
      : undefined;

  console.log('Chart Type:', chartType);
  console.log('Series:', series);
  console.log('Options:', chartOptions);

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series.length > 0 ? series : [{ data: [] }]}
        type={chartType}
      />
    </div>
  );
}

export default UsageStatusChart;
