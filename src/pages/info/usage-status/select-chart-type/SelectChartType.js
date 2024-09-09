import cn from 'classnames';
import React from 'react';
import styles from './SelectChartType.module.scss';

function SelectChartType({ value, label, type, handleChange }) {
  return (
    <button
      className={cn(styles.select, type === value ? styles.on : '')}
      onClick={() => handleChange(value)}
    >
      {label}
    </button>
  );
}

export default SelectChartType;
