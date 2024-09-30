import React from 'react';
import styles from './ControlSwitch.module.scss';

function ControlSwitch(name, id) {
  return (
    <div className={styles.switch}>
      <input name={`switch_${name}`} id={`switch_${id}_on`} type="radio" />
      <label htmlFor={`switch_${id}_on`}>ON</label>
      <input name={`switch_${name}`} id={`switch_${id}_off`} type="radio" />
      <label htmlFor={`switch_${id}_off`}>OFF</label>
      <input
        defaultChecked
        name={`switch_${name}`}
        id={`switch_${id}_auto`}
        type="radio"
      />
      <label htmlFor={`switch_${id}_auto`}>AUTO</label>
    </div>
  );
}

export default ControlSwitch;
