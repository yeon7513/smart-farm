import React from 'react';
import styles from './ChangeDataBtn.module.scss';

function ChangeDataBtn({ id, changeData, setChangeData, name, value, label }) {
  return (
    <>
      <label htmlFor={id} className={styles.tab}>
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={changeData === value}
          onChange={(e) => setChangeData(e.target.value)}
        />
        <span className={styles.name}>{label}</span>
      </label>
    </>
  );
}

export default ChangeDataBtn;
