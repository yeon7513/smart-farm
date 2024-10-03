import cn from 'classnames';
import React from 'react';
import styles from './AutomaticControl.module.scss';

function AutomaticControl({ isChecked }) {
  return (
    <div className={styles.automaticControl}>
      <div className={cn(styles.auto, isChecked ? '' : styles.stop)}></div>
    </div>
  );
}

export default AutomaticControl;
