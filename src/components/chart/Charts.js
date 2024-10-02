import { BiSolidBarChartAlt2 } from 'react-icons/bi';
// import { LiaChartLineSolid } from 'react-icons/lia';
import {
  // TbChartAreaLineFilled,
  TbChartDonutFilled,
  TbChartPieFilled,
} from 'react-icons/tb';

export const chartTypes = [
  { value: 'bar', label: <BiSolidBarChartAlt2 /> },
  { value: 'donut', label: <TbChartDonutFilled /> },
  // { value: 'area', label: <TbChartAreaLineFilled /> },
  { value: 'pie', label: <TbChartPieFilled /> },
  // { value: 'line', label: <LiaChartLineSolid /> },
];

export const COLORS = [
  '#8adab2',
  '#51c6af',
  '#00b0af',
  '#009ab0',
  '#0083af',
  '#006baa',
];

// [막대그래프]작물별 상세 조회용 데이터 변환
export const transformDataForBarGraphs = (data) => {
  const transformedData = [];

  data.forEach((cityData) => {
    cityData.crops.forEach((crop) => {
      const existingData = transformedData.find(
        (d) => d.name === cityData.name
      );
      if (existingData) {
        existingData[crop.item] = (existingData[crop.item] || 0) + crop.value;
      } else {
        const newData = { name: cityData.name, [crop.item]: crop.value };
        transformedData.push(newData);
      }
    });
  });

  return transformedData;
};

// [원형그래프] 작물별 상세 조회용 데이터 변환
export const transformDataForCircularGraphs = (data) => {
  if (!data || !Array.isArray(data)) return { cropData: [], regionData: [] };

  const regionData = [];
  const cropData = [];

  data.forEach((region) => {
    regionData.push({
      name: region.name,
      value: region.crops.reduce((sum, crop) => sum + crop.value, 0),
    });

    region.crops.forEach((crop) => {
      cropData.push({
        name: `${region.name}-${crop.item}`,
        value: crop.value,
      });
    });
  });

  return { regionData, cropData };
};

// 라벨 변환 (퍼센트)
const RADIAN = Math.PI / 180;
export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percentage = percent * 100;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {percentage > 5 ? `${percentage.toFixed(1)}%` : null}
    </text>
  );
};

// 라벨 변환 (이름)
export const renderCustomizedLabelToStr = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name}
    </text>
  );
};

// 툴팁 커스텀
export const customTooltip =
  (totalValue) =>
  ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percent = ((value / totalValue) * 100).toFixed(1);
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          <p>{`${name}: ${value} (${percent}%)`}</p>
        </div>
      );
    }
    return null;
  };

export function checkDataKeyExists(data, key) {
  return data.some((item) => item.hasOwnProperty(key));
}
