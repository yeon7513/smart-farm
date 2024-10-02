import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import RenderingChart from '../../../../components/chart/RenderingChart';
import { changeDataOptions } from '../../../../lib/managerDatas';
import ChangeDataBtn from '../change-data-btn/ChangeDataBtn';
import styles from './statusChart.module.scss';

function NewStatus({ data }) {
  const [chartType, setChartType] = useState('area');
  const [changeData, setChangeData] = useState('all');
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(data(changeData));
  }, [changeData, data]);

  return (
    <div className={styles.statusChart}>
      <div className={styles.title}>
        <h2>신규 현황</h2>
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
            {changeDataOptions.new.map((option) => (
              <ChangeDataBtn
                id={option.id}
                key={option.value}
                changeData={changeData}
                setChangeData={setChangeData}
                name={'new'}
                value={option.value}
                label={option.label}
              />
            ))}
          </div>
        </div>
      </div>
      <RenderingChart chartType={chartType} data={newData} checkKey={'user'} />
    </div>
  );
}

export default NewStatus;
