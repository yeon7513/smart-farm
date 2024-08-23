import React from "react";
import styles from "./DashBoard.module.scss";
import Img from "../../assets/abou/드론.jpeg";
import Weather from "./weather/Weather";
import WeatherElements from "./weather_elements/WeatherElements";

function DashBoard(props) {
  return (
    // 전체
    <div className={styles.entire}>
      {/* 첫번째라인 */}
      <div className={styles.first_line}>
        {/* 밀양-온습도 강수량 등등 */}
        <WeatherElements />

        {/* <div className={styles.first_one}>
          <div className={styles.first_one_title}>
            <h1>밀양</h1>
            <button>refresh</button>
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
        </div> */}

        {/* 날씨 */}
        <Weather />
        {/* <div className={styles.first_two}> */}
        {/* <div className={styles.first_two_menu}>
            <p>일자</p>
            <p>날씨</p>
            <p>강수확률</p>
            <p>기온</p>
          </div>
          <div className={styles.first_two_menu}>
            <p>15일</p>
            <p>날씨</p>
            <p>00%</p>
            <p>15°C/15°C</p>
          </div>
          <div className={styles.first_two_menu}>
            <p>15일</p>
            <p>날씨</p>
            <p>00%</p>
            <p>15°C/15°C</p>
          </div>
          <div className={styles.first_two_menu}>
            <p>15일</p>
            <p>날씨</p>
            <p>00%</p>
            <p>15°C/15°C</p>
          </div>
          <div className={styles.first_two_menu}>
            <p>15일</p>
            <p>날씨</p>
            <p>00%</p>
            <p>15°C/15°C</p>
          </div>
          <div className={styles.first_two_menu}>
            <p>15일</p>
            <p>날씨</p>
            <p>00%</p>
            <p>15°C/15°C</p>
          </div>
          <div className={styles.first_two_menu}>
            <p>15일</p>
            <p>날씨</p>
            <p>00%</p>
            <p>15°C/15°C</p>
          </div>
          <div className={styles.first_two_menu}>
            <p>15일</p>
            <p>날씨</p>
            <p>00%</p>
            <p>15°C/15°C</p>
          </div>
        </div> */}
      </div>

      {/* 2,3라인 */}

      <div className={styles.second_line}>
        <div className={styles.second_one}>
          {/* 측정 */}
          <div className={styles.measurement}>
            <div className={styles.measurement_main}>
              <div>
                <p>측정</p>
              </div>
              <p>+</p>
              <p>
                <button>◀</button>
                <button>▶</button>
              </p>
            </div>
            <div className={styles.measurement_menu}>
              <div>
                <h2>토양수분1-1</h2>
                <p>이미지</p>
                <button>o</button>
              </div>
              <div>
                <h2>토양수분1-1</h2>
                <p>이미지</p>
                <button>o</button>
              </div>
              <div>
                <h2>토양수분1-1</h2>
                <p>이미지</p>
                <button>o</button>
              </div>
              <div>
                <h2>토양수분1-1</h2>
                <p>이미지</p>
                <button>o</button>
              </div>
            </div>
          </div>
          {/* 관수제어 등 */}
          <div className={styles.control}>
            <div className={styles.control_main}>
              <div>
                <p>제어</p>
              </div>
              <p>+</p>
              <p>
                <button>◀</button>
                <button>▶</button>
              </p>
            </div>
            {/* 관수제어 등 내용들 */}
            <div className={styles.control_menus}>
              <div className={styles.control_menu}>
                <h2>토양수분1-1</h2>
                <div>
                  <p>수분 0.0 ~</p>
                </div>
                <p>off</p>
                <div>
                  <button>on</button>
                  <button>off</button>
                </div>
              </div>
              <div className={styles.control_menu}>
                <h2>토양수분1-1</h2>
                <div>
                  <p>수분 0.0 ~</p>
                </div>
                <p>off</p>
                <div>
                  <button>on</button>
                  <button>off</button>
                </div>
              </div>
              <div className={styles.control_menu}>
                <h2>토양수분1-1</h2>
                <div>
                  <p>수분 0.0 ~</p>
                </div>
                <p>off</p>
                <div>
                  <button>on</button>
                  <button>off</button>
                </div>
              </div>
              <div className={styles.control_menu}>
                <h2>토양수분1-1</h2>
                <div>
                  <p>수분 0.0 ~</p>
                </div>
                <p>off</p>
                <div>
                  <button>on</button>
                  <button>off</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.img}>
          <div>
            <p>통합관제실</p>
          </div>
          <img src={Img} />
        </div>
      </div>
      {/* 4라인 */}
      <div className={styles.four_line}>
        <div className={styles.four_one}>제어</div>
        <div className={styles.four_two}>생육정보</div>
      </div>
    </div>
  );
}

export default DashBoard;
