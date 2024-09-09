import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function SimpleDonutChart({ data }) {
  return (
    <ResponsiveContainer
      width="100%"
      height={450}
      maxWidth={500}
      maxHeight={600}
    >
      <PieChart>
        <Legend
          layout="vertical"
          align="right"
          payload={data.map((local, idx) => ({
            value: local.name,
            type: 'square',
            color: COLORS[idx % COLORS.length],
          }))}
        />
        <Pie
          data={data}
          cx={230}
          cy={230}
          innerRadius={100}
          outerRadius={200}
          fill="#8884d8"
          nameKey="name"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Pie
        data={data}
        cx={420}
        cy={200}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie> */}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SimpleDonutChart;
