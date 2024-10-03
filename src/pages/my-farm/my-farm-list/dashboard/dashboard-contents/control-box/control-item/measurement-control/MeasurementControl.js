import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import {
  getRandomValue,
  getUnitByLabel,
} from '../../../../../../../../utils/renameOptions';
import styles from './MeasurementControl.module.scss';

function MeasurementControl({ isChecked, label }) {
  const [figure, setFigure] = useState(getRandomValue(label));

  useEffect(() => {
    const interval = setInterval(() => {
      setFigure(getRandomValue(label));
    }, 1500);

    return () => clearInterval(interval);
  }, [label]);

  return (
    <div className={styles.measurementControl}>
      <div className={styles.content}>
        {isChecked ? (
          <p>
            {getUnitByLabel(
              label,
              ...(Array.isArray(figure) ? figure : [figure])
            )}
          </p>
        ) : (
          <p>비활성화</p>
        )}
        <div className={cn(styles.auto, isChecked ? '' : styles.stop)}></div>
      </div>
    </div>
  );
}

export default MeasurementControl;
