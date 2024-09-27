import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRange, formatData } from '../../../api/simulationData';
import { evnironmentFields, selectCrop } from '../../../lib/simulationLib';
import { fetchEnvironmentData } from '../../../store/bestfarm/bestfarmSlice';
import styles from './Simulation.module.scss';
import SelectCrops from './select-crops/SelectCrops';
import SimulationResult from './simulation-result/SimulationResult';

function Simulation() {
  const [farmCode, setFarmCode] = useState('S47');
  const [bestProdValue, setBestProdValue] = useState(23);

  const { environmentData } = useSelector((state) => state.bestfarmSlice);
  const dispatch = useDispatch();

  const bestEnvData = formatData(environmentData, evnironmentFields);

  console.log(bestEnvData);
  console.log('bestProdValue: ', bestProdValue);

  const test = createRange(bestEnvData.averages);

  console.log('test: ', test);

  useEffect(() => {
    dispatch(fetchEnvironmentData(`pageSize=5&searchFrmhsCode=${farmCode}`));
  }, [dispatch, farmCode]);

  // useEffect(() => {
  //   dispatch(fetchGrowthData(`pageSize=5&searchFrmhsCode=${farmCode}`));
  // }, [dispatch, farmCode]);

  // useEffect(() => {
  //   dispatch(fetchProductionData(`pageSize=5&searchFrmhsCode=${farmCode}`));
  // }, [dispatch, farmCode]);

  return (
    <div className={styles.simulation}>
      {}
      <div className={styles.notice}>
        <span>* 온실 환경의 경우입니다.</span>
        <span>
          * 본 시뮬레이션의 결과와 실제 결과는 차이가 있을 수 있습니다.
        </span>
      </div>
      <div>
        <h3>
          1. 작물을 선택하세요. <span>* 필수입력</span>
        </h3>
        {selectCrop.map((crop) => (
          <SelectCrops
            key={crop.id}
            selectCrop={crop}
            farmCode={farmCode}
            setFarmCode={setFarmCode}
            setBestProdValue={setBestProdValue}
          />
        ))}
      </div>
      <div>
        <h3>
          2. 생산정보를 입력하세요. <span>* 필수입력</span>
        </h3>
        <ul>
          <li>
            <h4>주차</h4>
            <button>51주차</button>
            <button>52주차</button>
          </li>
          <li>
            <h4>면적 (평)</h4>
            <input type="text" placeholder="면적을 입력하세요." />
          </li>
          <li>
            <h4>생산량 (kg)</h4>
            <input type="text" placeholder="생산량을 입력하세요." />
          </li>
        </ul>
      </div>
      <div>
        <h3>3. 환경을 선택해주세요.</h3>
        <div>
          {/* <SimulationSelectData
            selectDatas={createRange(bestEnvData.averages)}
          /> */}
        </div>
      </div>
      <SimulationResult />
    </div>
  );
}

export default Simulation;
