import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Img from '../../../../assets/abou/드론.jpeg';
import styles from './DashBoard.module.scss';
import Weather from './weather/Weather';

function DashBoard() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      {id} DashBoard <button onClick={() => navigate(-1)}>목록으로</button>
      <div className={styles.entire}>
        {/* 첫번째라인 */}
        <div className={styles.first_line}>
          {/* 날씨 */}
          <Weather />
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
            <img src={Img} alt="" />
          </div>
        </div>
        {/* 4라인 */}
        <div className={styles.four_line}>
          <div className={styles.four_one}>제어</div>
          <div className={styles.four_two}>생육정보</div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
