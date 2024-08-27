import React from "react";
import style from "./Payment.module.scss";
import Container from "../../layout/container/Container";
import styles from "../MypageGrobal.module.scss";

function Payment(props) {
  return (
    <Container className={style.container}>
      <div className={styles.headers}>
        <div className={style.headers}>
          <div>
            <div>결제 날짜</div>
            <input value="2024-08-27" disabled />
          </div>
          <div>결제 내역</div>
          <ul className={style.paylists}>
            <li className={style.paylist}>온도조절기</li>
            <li className={style.paylist}>환기 장치</li>
            <li className={style.paylist}>차광막</li>
            <li className={style.paylist}>조명 시스템</li>
            <li className={style.paylist}>인공 조명</li>
            <li className={style.paylist}>자동 조명 조절기</li>
            <li className={style.paylist}>자동 관수 시스템</li>
            <li className={style.paylist}>양액기</li>
            <li className={style.paylist}>센서 및 모니터링</li>
            <li className={style.paylist}>온도 및 습도 센서</li>
            <li className={style.paylist}>Co2 센서</li>
            <li className={style.paylist}>양액 측정 센서</li>
            <li className={style.paylist}>CCTV</li>
          </ul>
          <div className={style.payment}>결제 대금 : 35000</div>
        </div>
      </div>
    </Container>
  );
}

export default Payment;
