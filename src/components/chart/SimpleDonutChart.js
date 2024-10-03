import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
  COLORS,
  customTooltip,
  renderCustomizedLabel,
  transformDataForCircularGraphs,
} from './Charts';

function SimpleDonutChart({ data }) {
  const [cropData, setCropData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  const calculateTotalValue = (data) => {
    return data.reduce((acc, cur) => acc + cur.value, 0);
  };

  const totalValue = calculateTotalValue(data);
  const cropTotalValue = calculateTotalValue(cropData);

  const hasCrops = data.length > 0 && data[0].crops && data[0].crops.length > 0;

  useEffect(() => {
    if (hasCrops) {
      const { cropData, regionData } = transformDataForCircularGraphs(data);
      setCropData(cropData);
      setRegionData(regionData);
    } else {
      setCropData([]);
      setRegionData([]);
    }
  }, [hasCrops, data]);

  const renderPies = () => {
    if (hasCrops) {
      return (
        <>
          <Pie
            data={regionData}
            cx={250}
            cy={230}
            outerRadius={90}
            fill="#8adab2"
            dataKey="value"
          />
          <Pie
            data={cropData}
            cx={250}
            cy={230}
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={120}
            outerRadius={200}
            fill="#4b9f9e"
            dataKey="value"
          />
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
          innerRadius={80}
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

export default SimpleDonutChart;
