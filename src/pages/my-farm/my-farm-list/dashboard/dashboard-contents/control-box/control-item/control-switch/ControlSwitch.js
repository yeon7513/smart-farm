import React from 'react';
import styles from './ControlSwitch.module.scss';

function ControlSwitch({ id }) {
  return (
    <div className={styles.switch}>
      <input name={`switch_${id}`} id={`switch_${id}_on`} type="radio" />
      <label htmlFor={`switch_${id}_on`} className={styles.on}>
        ON
      </label>
      <input name={`switch_${id}`} id={`switch_${id}_off`} type="radio" />
      <label htmlFor={`switch_${id}_off`} className={styles.off}>
        OFF
      </label>
      <input
        defaultChecked
        name={`switch_${id}`}
        id={`switch_${id}_auto`}
        type="radio"
      />
      <label htmlFor={`switch_${id}_auto`} className={styles.auto}>
        AUTO
      </label>
    </div>
  );
}

export default ControlSwitch;
