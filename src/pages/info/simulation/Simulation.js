import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnvironmentData } from '../../../store/bestfarm/bestfarmSlice';
import styles from './Simulation.module.scss';

function Simulation() {
  const [farmCode, setFarmCode] = useState('S23');

  const { environmentData } = useSelector((state) => state.bestfarmSlice);
  const dispatch = useDispatch();

  console.log(environmentData);

  useEffect(() => {
    dispatch(fetchEnvironmentData(`pageSize=1&searchFrmhsCode=${farmCode}`));
    console.log(farmCode);
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
          <input
            type="radio"
            id="strbr"
            name="crops"
            value="S23"
            defaultChecked
            onChange={(e) => setFarmCode(e.target.value)}
          />
          딸기
        </label>
        <label htmlFor="tmt">
          <input
            type="radio"
            id="tmt"
            name="crops"
            value="349"
            onChange={(e) => setFarmCode(e.target.value)}
          />
          토마토
        </label>
        <label htmlFor="pprk">
          <input
            type="radio"
            id="pprk"
            name="crops"
            value="SP205"
            onChange={(e) => setFarmCode(e.target.value)}
          />
          파프리카
        </label>
      </div>
      <div>면적, 생산량, 주차 선택</div>
      <div>온실 환경 선택</div>
      <div>
        <h3>result</h3>
        농가 코드 : {environmentData[0]?.frmhsId}
        내부온도 : {environmentData[0]?.inTp}
        내부습도 : {environmentData[0]?.inHd}
      </div>
    </div>
  );
}

export default Simulation;
