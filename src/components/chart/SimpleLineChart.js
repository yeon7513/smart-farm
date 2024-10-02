import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { checkDataKeyExists } from './Charts';

function SimpleLineChart({ data, checkKey }) {
  const hasAllData = checkKey ? checkDataKeyExists(data, checkKey) : null;

  const dataKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'name') : [];

  return (
    <ResponsiveContainer
      width="100%"
      height={450}
      maxWidth={500}
      maxHeight={600}
    >
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis domain={[0, data.length * 2]} />
        <Tooltip />
        <Legend />
        {hasAllData ? (
          <>
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={index % 2 === 0 ? '#8adab2' : '#4b9f9e'} // 색상 변경
              />
            ))}
          </>
        ) : (
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8adab2"
            activeDot={{ r: 8 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
