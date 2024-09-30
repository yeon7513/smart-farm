import React, { useState } from 'react';
import { calcResult } from '../../../../api/simulationData';
import styles from './SimulationResult.module.scss';

function SimulationResult({ bestProd, data, handleReset }) {
  const [result, setResult] = useState(null);

  const handleResultClick = () => {
    const calculatedResult = calcResult(bestProd, data);
    if (
      calculatedResult &&
      calculatedResult.bestProduction !== undefined &&
      calculatedResult.weeklyAverageBestProduction !== undefined &&
      calculatedResult.usersProduction !== undefined &&
      calculatedResult.weeklyAverageUsersProduction !== undefined
    ) {
      setResult(calculatedResult);
    }
  };

  const handleResetData = () => {
    handleReset();
    setResult(null);
  };

  return (
    <div className={styles.result}>
      <div>
        <button onClick={handleResultClick}>결과보기</button>
      </div>
      {result && (
        <div className={styles.resultContent}>
          <h3>시뮬레이션 결과</h3>
          <p>
            우수농가와 비교한 생산량의 차이는{' '}
            {result.bestProduction - result.usersProduction} kg 입니다.
          </p>
          <p>
            우수농가 기본 생산량: {result.bestProduction.toLocaleString()} kg
          </p>
          <p>주간 평균 생산량: {result.weeklyAverageBestProduction} kg</p>
          <p>사용자의 생산량: {result.usersProduction.toLocaleString()} kg</p>
          <p>
            사용자의 주간 평균 생산량: {result.weeklyAverageUsersProduction} kg
          </p>
        </div>
      )}
      <div>
        <button className={styles.reset} onClick={handleResetData}>
          초기화
        </button>
      </div>
    </div>
  );
}

export default SimulationResult;
