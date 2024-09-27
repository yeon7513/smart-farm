import React from 'react';
import styles from './SimulationResult.module.scss';

function SimulationResult({ data }) {
  console.log(data);

  return <div className={styles.result}>SimulationResult</div>;
}

export default SimulationResult;
