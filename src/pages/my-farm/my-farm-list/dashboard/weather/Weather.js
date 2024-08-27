import React from 'react';
import styles from './Weather.module.scss';

const weatherByDay = [
  {
    days: '오늘',
    weather: '맑음',
    precipitationProbability: '0%',
    LowestTemperature: '15\u2103',
    HighestTemperature: '22\u2103',
  },
  {
    days: '내일',
    weather: '맑음',
    precipitationProbability: '0%',
    LowestTemperature: '15\u2103',
    HighestTemperature: '22\u2103',
  },
  {
    days: '모레',
    weather: '맑음',
    precipitationProbability: '0%',
    LowestTemperature: '15\u2103',
    HighestTemperature: '22\u2103',
  },
];

function Weather() {
  return (
    <div className={styles.weather}>
      <div className={styles.content}>
        <div className={styles.region}>
          <h2>지역</h2>
          <button>새로고침</button>
        </div>
        <ul className={styles.info}>
          <li>
            <h3>온도</h3>
            <p>22.0&#8451;</p>
            <span>17&#8451;/22&#8451;</span>
          </li>
          <li>
            <h3>습도</h3>
            <p>80.5%</p>
          </li>
          <li>
            <h3>강수량</h3>
            <p>0.0</p>
          </li>
          <li>
            <h3>일사량</h3>
            <p>655.0</p>
          </li>
          <li>
            <h3>바람</h3>
            <p>1.4</p>
            <span>북서풍</span>
          </li>
        </ul>
        <div className={styles.weatherByDay}>
          {weatherByDay.map((weather, idx) => (
            <div key={idx} className={styles.days}>
              <h3>{weather.days}</h3>
              <p>{weather.weather}</p>
              <p>{weather.precipitationProbability}</p>
              <p>
                <span className={styles.low}>{weather.LowestTemperature}</span>/
                <span className={styles.high}>
                  {weather.HighestTemperature}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
