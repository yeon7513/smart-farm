import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import RenderingChart from '../../../../components/chart/RenderingChart';
import { changeDataOptions } from '../../../../lib/managerDatas';
import ChangeDataBtn from '../change-data-btn/ChangeDataBtn';
import styles from './statusChart.module.scss';

function AccumulatedStatus({ data }) {
  const [chartType, setChartType] = useState('area');
  const [changeData, setChangeData] = useState('all');

  const [accumulatedData, setAccumulatedData] = useState([]);

  useEffect(() => {
    setAccumulatedData(data(changeData));
  }, [changeData, data]);

  return (
    <div className={styles.statusChart}>
      <div className={styles.title}>
        <h2>누적 현황</h2>
        <div className={styles.change}>
          <button
            onClick={
              chartType === 'area'
                ? () => setChartType('line')
                : () => setChartType('area')
            }
          >
            <FaExchangeAlt />
          </button>
          <div className={styles.tabs}>
            {changeDataOptions.acc.map((option) => (
              <ChangeDataBtn
                id={option.id}
                key={option.value}
                changeData={changeData}
                setChangeData={setChangeData}
                name={'acc'}
                value={option.value}
                label={option.label}
              />
            ))}
          </div>
        </div>
      </div>
      <RenderingChart
        chartType={chartType}
        data={accumulatedData}
        checkKey={'user'}
      />
    </div>
  );
}

export default AccumulatedStatus;
