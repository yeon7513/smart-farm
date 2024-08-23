import React from "react";
import styles from "./WeatherElements.module.scss";
function WeatherElements(props) {
  return (
    // <div>
    <div className={styles.first_one}>
      <div className={styles.first_one_title}>
        <h1>지역</h1>
        <button>새로고침</button>
      </div>
      <div className={styles.one}>
        <div>
          <h2>온도</h2>
          <p>22.0c</p>
          <span>17c/22c</span>
        </div>
        <div>
          <h2>습도</h2>
          <p>80.5%</p>
        </div>
        <div>
          <h2>강수량</h2>
          <p>0.0</p>
        </div>
        <div>
          <h2>일사량</h2>
          <p>655.0</p>
        </div>
        <div>
          <h2>바람</h2>
          <p>1.4</p>
          <span>북서풍</span>
        </div>
      </div>

      <div className={styles.next_title}>
        <h2>월간 강수량</h2>
        <p>132.0</p>
      </div>
    </div>
    // </div>
  );
}

export default WeatherElements;
