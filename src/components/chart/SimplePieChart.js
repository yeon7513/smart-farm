import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
  COLORS,
  customTooltip,
  renderCustomizedLabel,
  transformDataForCircularGraphs,
} from './Charts';

function SimplePieChart({ data }) {
  const [cropData, setCropData] = useState([]);

  const calculateTotalValue = (data) => {
    return data.reduce((acc, cur) => acc + cur.value, 0);
  };

  const totalValue = calculateTotalValue(data);
  const cropTotalValue = calculateTotalValue(cropData);

  const hasCrops = data.length > 0 && data[0].crops && data[0].crops.length > 0;

  useEffect(() => {
    if (hasCrops) {
      const { cropData } = transformDataForCircularGraphs(data);
      setCropData(cropData);
    } else {
      setCropData([]);
    }
  }, [hasCrops, data]);

  const renderPies = () => {
    if (hasCrops) {
      return (
        <>
          <Pie
            data={cropData}
            cx={250}
            cy={230}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8adab2"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={customTooltip(cropTotalValue)} />
        </>
      );
    } else {
      return (
        <Pie
          data={data}
          cx={250}
          cy={230}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8adab2"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <PieChart>
        {renderPies()}
        {hasCrops ? null : <Tooltip content={customTooltip(totalValue)} />}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SimplePieChart;
