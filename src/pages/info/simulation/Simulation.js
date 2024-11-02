import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRange, formatData } from "../../../api/simulationData";
import { evnironmentFields, selectCrop } from "../../../lib/simulationLib";
import { fetchEnvironmentData } from "../../../store/bestfarm/bestfarmSlice";
import TextInput from "./../../../components/form/text-input/TextInput";
import styles from "./Simulation.module.scss";
import SelectCrops from "./select-crops/SelectCrops";
import SimulationResult from "./simulation-result/SimulationResult";
import SimulationSelectData from "./simulation-select-data/SimulationSelectData";

function Simulation() {
  const initialState = {
    area: null,
    week: null,
    "누적 일사량": null,
    "주간 평균 내부 습도": null,
    "주간 평균 내부 온도": null,
    "주간 평균 잔존 CO2": null,
  };
  const [farmCode, setFarmCode] = useState("S47");
  const [bestProdValue, setBestProdValue] = useState(23);
  const [resultData, setResultData] = useState(initialState);

  const { environmentData } = useSelector((state) => state.bestfarmSlice);
  const dispatch = useDispatch();

  const bestEnvData = formatData(environmentData, evnironmentFields);

  const handleSaveResult = (name, value) => {
    setResultData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    handleSaveResult(name, Number(value));
  };

  const handleClickData = (week) => {
    handleSaveResult("week", week);
  };

  const handleResetData = () => {
    setResultData(initialState);
  };

  useEffect(() => {
    dispatch(fetchEnvironmentData(`pageSize=5&searchFrmhsCode=${farmCode}`));
  }, [dispatch, farmCode]);

  return (
    <div className={styles.simulation}>
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
        <div className={styles.selectCrop}>
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
      </div>
      <div>
        <h3>
          2. 생산정보를 입력하세요. <span>* 필수입력</span>
        </h3>
        <ul>
          <li className={styles.weekBtn}>
            <h4>주차</h4>
            <button
              className={resultData.week === 51 ? styles.selected : ""}
              onClick={() => handleClickData(51)}
            >
              51주차
            </button>
            <button
              className={resultData.week === 52 ? styles.selected : ""}
              onClick={() => handleClickData(52)}
            >
              52주차
            </button>
          </li>
          <li className={styles.input}>
            <h4>면적 (평)</h4>
            <TextInput
              name="area"
              onChange={handleChangeData}
              placeholder="면적을 입력하세요."
            />
          </li>
        </ul>
      </div>
      <div>
        <h3>3. 환경을 선택해주세요.</h3>
        <div>
          <SimulationSelectData
            selectDatas={createRange(bestEnvData.averages)}
            onClick={handleSaveResult}
          />
        </div>
      </div>
      <SimulationResult
        data={resultData}
        bestProd={bestProdValue}
        handleReset={handleResetData}
      />
    </div>
  );
}

export default Simulation;
