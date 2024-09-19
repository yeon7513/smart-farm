import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCrop } from '../../../lib/simulationFunc';
import {
  fetchEnvironmentData,
  fetchGrowthData,
  fetchProductionData,
} from '../../../store/bestfarm/bestfarmSlice';
import styles from './Simulation.module.scss';
import SelectCrops from './select-crops/SelectCrops';
import SimulationResult from './simulation-result/SimulationResult';

function Simulation() {
  const [farmCode, setFarmCode] = useState('S23');

  const { environmentData, growthData, productionData } = useSelector(
    (state) => state.bestfarmSlice
  );
  const dispatch = useDispatch();

  console.log('environmentData: ', environmentData);
  // console.log('growthData: ', growthData);
  // console.log('productionData: ', productionData);

  useEffect(() => {
    dispatch(fetchEnvironmentData(`pageSize=50&searchFrmhsCode=${farmCode}`));
  }, [dispatch, farmCode]);

  useEffect(() => {
    dispatch(fetchGrowthData(`pageSize=1&searchFrmhsCode=${farmCode}`));
  }, [dispatch, farmCode]);

  useEffect(() => {
    dispatch(fetchProductionData(`pageSize=1&searchFrmhsCode=${farmCode}`));
  }, [dispatch, farmCode]);

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
        <ul>
          <li>
            <h4>누적 일사량</h4>
            <div>
              <button>일사량1</button>
              <button>일사량2</button>
              <button>일사량3</button>
              <button>일사량4</button>
              <button>일사량5</button>
            </div>
          </li>
          <li>
            <h4>주간 평균 습도</h4>
            <div>
              <button>평균습도1</button>
              <button>평균습도2</button>
              <button>평균습도3</button>
              <button>평균습도4</button>
              <button>평균습도5</button>
            </div>
          </li>
          <li>
            <h4>주간평균잔존CO2</h4>
            <div>
              <button>평균잔존CO2 1</button>
              <button>평균잔존CO2 2</button>
              <button>평균잔존CO2 3</button>
              <button>평균잔존CO2 4</button>
              <button>평균잔존CO2 5</button>
            </div>
          </li>
        </ul>
      </div>
      <SimulationResult />
    </div>
  );
}

export default Simulation;
