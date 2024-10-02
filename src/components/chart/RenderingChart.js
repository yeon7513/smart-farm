import React from 'react';
import SimpleAreaChart from './SimpleAreaChart';
import SimpleBarChart from './SimpleBarChart';
import SimpleDonutChart from './SimpleDonutChart';
import SimpleLineChart from './SimpleLineChart';
import SimplePieChart from './SimplePieChart';

// ** 차트 사용법
//  - 데이터 모양
//    -> const data = [ {name: 'string', value: number}, {name: 'string', value: number}, ... ];

function RenderingChart({ chartType, data, checkKey }) {
  switch (chartType) {
    case 'line':
      return <SimpleLineChart data={data} checkKey={checkKey} />;
    case 'bar':
      return <SimpleBarChart data={data} />;
    case 'pie':
      return <SimplePieChart data={data} />;
    case 'donut':
      return <SimpleDonutChart data={data} />;
    case 'area':
      return <SimpleAreaChart data={data} checkKey={checkKey} />;

    default:
      return <SimpleBarChart data={data} />;
  }
}

export default RenderingChart;
