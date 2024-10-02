import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { checkDataKeyExists } from './Charts';

function SimpleAreaChart({ data, checkKey }) {
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
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, data.length * 2]} />
        <Tooltip />
        {hasAllData ? (
          <>
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={index % 2 === 0 ? '#8adab2' : '#4b9f9e'} // 색상 변경
                fill={index % 2 === 0 ? '#8adab2' : '#4b9f9e'} // 색상 변경
              />
            ))}
          </>
        ) : (
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4b9f9e"
            fill="#8adab2"
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default SimpleAreaChart;
