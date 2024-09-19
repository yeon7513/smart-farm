import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnvironmentData } from '../../../store/bestfarm/bestfarmSlice';
import styles from './Simulation.module.scss';

function Simulation() {
  const [farmCode, setFarmCode] = useState('S23');

  const { environmentData } = useSelector((state) => state.bestfarmSlice);
  const dispatch = useDispatch();

  console.log(environmentData);

  const handleChangeFarmCode = (e) => {
    setFarmCode(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchEnvironmentData(`searchFrmhsCode=${farmCode}`));
  }, [dispatch, farmCode]);

  return (
    <div className={styles.simulation}>
      <div>
        * 온실 환경의 경우 * 본 시뮬레이션의 결과와 실제 결과는 차이가 있을 수
        있습니다.
      </div>
      <div>
        <h3>작물선택</h3>
        <label htmlFor="strbr">
          <input type="radio" id="strbr" name="crops" value="S23" />
          딸기
        </label>
        <label htmlFor="tmt">
          <input type="radio" id="tmt" name="crops" value="349" />
          토마토
        </label>
        <label htmlFor="pprk">
          <input type="radio" id="pprk" name="crops" value="SP210" />
          파프리카
        </label>
      </div>
      <div>면적, 생산량, 주차 선택</div>
      <div>온실 환경 선택</div>
    </div>
  );
}

export default Simulation;
