import React from "react";
import styles from "./Weather.module.scss";

function Weather(props) {
  return (
    // 날씨 API 불러와서 반복문 사용
    <div className={styles.weather}>
      <div className={styles.weather_menu}>
        <h3>일자</h3>
        <h4>날씨</h4>
        <h4>강수확률</h4>
        <h4>기온</h4>
      </div>
      <div className={styles.weather_menu}>
        <h3>15일</h3>
        <p>날씨</p>
        <p>00%</p>
        <p>
          <span>15°C</span>
          <span>/</span>
          <span>15°C</span>
        </p>
      </div>
      <div className={styles.weather_menu}>
        <h3>15일</h3>
        <p>날씨</p>
        <p>00%</p>
        <p>15°C/15°C</p>
      </div>
      <div className={styles.weather_menu}>
        <h3>15일</h3>
        <p>날씨</p>
        <p>00%</p>
        <p>15°C/15°C</p>
      </div>
      <div className={styles.weather_menu}>
        <h3>15일</h3>
        <p>날씨</p>
        <p>00%</p>
        <p>15°C/15°C</p>
      </div>
      <div className={styles.weather_menu}>
        <h3>15일</h3>
        <p>날씨</p>
        <p>00%</p>
        <p>15°C/15°C</p>
      </div>
      <div className={styles.weather_menu}>
        <h3>15일</h3>
        <p>날씨</p>
        <p>00%</p>
        <p>15°C/15°C</p>
      </div>
      <div className={styles.weather_menu}>
        <h3>15일</h3>
        <p>날씨</p>
        <p>00%</p>
        <p>15°C/15°C</p>
      </div>
    </div>
  );
}

export default Weather;
