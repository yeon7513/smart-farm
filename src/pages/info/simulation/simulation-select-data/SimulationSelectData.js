import React from 'react';
import SimulationBtn from './simulation-btns/SimulationBtn';
import styles from './SimulationSelectData.module.scss';

function SimulationSelectData({ selectDatas, onClick }) {
  console.log('selectDatas: ', selectDatas);

  return (
    <div>
      {selectDatas.map((data, idx) => (
        <div key={idx}>
          <h4>{data.name}</h4>
          <div className={styles.btns}>
            {data.values.map((value, idx) => (
              <SimulationBtn
                key={idx}
                name={data.name}
                count={value.count}
                onClick={onClick}
              >
                {value.range}
              </SimulationBtn>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SimulationSelectData;
