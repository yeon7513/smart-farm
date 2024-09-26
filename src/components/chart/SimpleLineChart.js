import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SimpleLineChart({ data }) {
  const hasAllData = data.some((item) => item.hasOwnProperty("user"));
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
            <Line type="monotone" dataKey="user" stroke="#8adab2" />
            <Line type="monotone" dataKey="dashboard" stroke="#4b9f9e" />
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
