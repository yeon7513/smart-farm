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

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// 작물별 상세 조회용 데이터 변환
export const transformData = (data) => {
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
