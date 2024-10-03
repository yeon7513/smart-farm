import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS, transformDataForBarGraphs } from './Charts';

function SimpleBarChart({ data }) {
  const hasCrops = data.length > 0 && data[0].crops && data[0].crops.length > 0;

  const renderBars = () => {
    if (data[0]?.crops) {
      const transformedData = transformDataForBarGraphs(data);

      const cropNames = transformedData.reduce((acc, item) => {
        return [...acc, ...Object.keys(item).filter((key) => key !== 'name')];
      }, []);

      const uniqueCropNames = [...new Set(cropNames)];

      return uniqueCropNames.map((cropName, idx) => (
        <Bar
          key={cropName}
          dataKey={cropName}
          stackId="a"
          fill={COLORS[idx % COLORS.length]}
        />
      ));
    } else {
      return <Bar dataKey="value" fill="#4b9f9e" />;
    }
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={450}
      maxWidth={500}
      maxHeight={600}
    >
      <BarChart
        data={hasCrops ? transformDataForBarGraphs(data) : data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fill="#fff" />
        <YAxis domain={[0, data.length * 2]} />
        <Tooltip />
        {renderBars()}
        {hasCrops && <Legend align="center" />}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;
