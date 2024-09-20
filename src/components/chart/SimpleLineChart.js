import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function SimpleLineChart({ data }) {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#4b9f9e"
        activeDot={{ r: 8 }}
      />
      {/* 여러 개의 선이 필요할 경우 Line 컴포넌트 추가 */}
      <Line type="monotone" dataKey="uv" stroke="#8adab2" />
    </LineChart>
  );
}

export default SimpleLineChart;
