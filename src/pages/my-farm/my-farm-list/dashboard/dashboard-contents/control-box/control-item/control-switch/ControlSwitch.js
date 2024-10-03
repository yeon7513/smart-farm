import React from 'react';
import styles from './ControlSwitch.module.scss';

function ControlSwitch({
  id,
  isChecked,
  setIsChecked,
  onUpdate,
  label,
  isAdd,
  settingValue,
}) {
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onUpdate({
      label: label,
      on: e.target.checked,
      isAdd: isAdd,
      set: settingValue,
    });
  };

  return (
    <div className={styles.switch}>
      <label htmlFor={`switch_${id}`}>
        <input
          name={`switch_${id}`}
          id={`switch_${id}`}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}

export default ControlSwitch;
