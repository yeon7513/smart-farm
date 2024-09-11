import React, { useEffect, useState } from 'react';
import styles from './Clock.module.scss';

function Clock() {
  const [time, setTime] = useState(new Date());

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekDays[time.getDay()];

  useEffect(() => {
    const realTime = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(realTime);
  }, []);

  return (
    <div className={styles.clock}>
      <div className={styles.date}>
        {year}. {month}. {day}. ({weekDay})
      </div>
      <div className={styles.time}>
        {hours} : {minutes} : {seconds}
      </div>
    </div>
  );
}

export default Clock;
