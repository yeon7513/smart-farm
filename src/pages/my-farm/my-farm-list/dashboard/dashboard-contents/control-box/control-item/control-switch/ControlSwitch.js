import React from 'react';
import styles from './ControlSwitch.module.scss';

function ControlSwitch({ id, isChecked, handleChange }) {
  return (
    <label htmlFor={`switch_${id}`} className={styles.switch}>
      <input
        name={`switch_${id}`}
        id={`switch_${id}`}
        type="checkbox"
        onChange={handleChange}
        checked={isChecked}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default ControlSwitch;
