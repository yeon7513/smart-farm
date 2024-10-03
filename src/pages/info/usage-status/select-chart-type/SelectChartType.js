import cn from 'classnames';
import React from 'react';
import styles from './SelectChartType.module.scss';

function SelectChartType({ value, label, type, handleChange }) {
  return (
    <button
      className={cn(styles.selectBtn, type === value ? styles.active : '')}
      onClick={() => handleChange(value)}
    >
      {label}
    </button>
  );
}

export default SelectChartType;
