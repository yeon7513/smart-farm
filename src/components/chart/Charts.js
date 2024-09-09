import { BiSolidBarChartAlt2 } from 'react-icons/bi';
import { LiaChartLineSolid } from 'react-icons/lia';
import {
  TbChartAreaLineFilled,
  TbChartDonutFilled,
  TbChartPieFilled,
} from 'react-icons/tb';

export const chartTypes = [
  { value: 'bar', label: <BiSolidBarChartAlt2 /> },
  { value: 'donut', label: <TbChartDonutFilled /> },
  { value: 'area', label: <TbChartAreaLineFilled /> },
  { value: 'pie', label: <TbChartPieFilled /> },
  { value: 'line', label: <LiaChartLineSolid /> },
];
