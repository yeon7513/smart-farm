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

function SimpleAreaChart({ data }) {
  const hasAllData = data.some((item) => item.hasOwnProperty('user'));

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
            <Area
              type="monotone"
              dataKey="user"
              stroke="#4b9f9e"
              fill="#8adab2"
            />
            <Area
              type="monotone"
              dataKey="dashboard"
              stroke="#4b9f9e"
              fill="#8adab2"
            />
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
