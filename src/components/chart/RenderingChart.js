import React from 'react';
import SimpleBarChart from './SimpleBarChart';
import SimpleDonutChart from './SimpleDonutChart';
import SimpleLineChart from './SimpleLineChart';
import SimplePieChart from './SimplePieChart';

function RenderingChart({ chartType }) {
  switch (chartType) {
    case 'line':
      return <SimpleLineChart />;
    case 'bar':
      return <SimpleBarChart />;
    case 'pie':
      return <SimplePieChart />;
    case 'donut':
      return <SimpleDonutChart />;

    default:
      return <SimpleLineChart />;
  }
}

export default RenderingChart;
