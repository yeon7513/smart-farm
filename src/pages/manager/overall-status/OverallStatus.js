import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderingChart from '../../../components/chart/RenderingChart';
import { fetchCommonInfo } from '../../../store/dashboard/dashboardSlice';
import { fetchItems } from '../../../store/user/UserSlice';
import styles from './OverallStatus.module.scss';

function OverallStatus() {
  const { items } = useSelector((state) => state.userSlice);
  const { commonInfo } = useSelector((state) => state.dashboardSlice);
  const [chartType, setChartType] = useState('area');
  const [changeData, setChangeData] = useState('all');
  const [chartData, setChartData] = useState([]);

  const dispatch = useDispatch();

  // console.log(items);
  // console.log(commonInfo);

  const filteredData = (data) => {
    if (!data || data.length === 0) return [];
    return data
      .filter((item) => item.deleteYn === 'N')
      .map((item) => ({
        value: item.useYn === 'Y' ? 'dashboard' : 'users',
        name: new Date(item.createdAt).toLocaleDateString(),
      }));
  };

  console.log(changeData);

  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCommonInfo('dashboard'));
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0 && commonInfo.length > 0) {
      setChartData([...filteredData(items), ...filteredData(commonInfo)]);
    }
  }, [items, commonInfo]);

  return (
    <div className={styles.overall}>
      <div>
        <button
          onClick={
            chartType === 'area'
              ? () => setChartType('line')
              : () => setChartType('area')
          }
        >
          {chartType}
        </button>
        <RenderingChart type={chartType} data={chartData} />
      </div>
      <div>
        <label htmlFor="">
          <input
            type="radio"
            name="info"
            value="users"
            onChange={() => setChangeData('all')}
          />
          <span>전체</span>
        </label>
        <label htmlFor="">
          <input
            type="radio"
            name="info"
            value="users"
            onChange={() => setChangeData('users')}
          />
          <span>회원</span>
        </label>
        <label htmlFor="">
          <input
            type="radio"
            name="info"
            value="dashboard"
            onChange={() => setChangeData('dashboard')}
          />
          <span>대시보드</span>
        </label>
      </div>
    </div>
  );
}

export default OverallStatus;
