import React from "react";
import style from "./Payment.module.scss";
import Container from "../../layout/container/Container";
import styles from "../MypageGrobal.module.scss";
import { getISODate } from "../../../utils/getFormattedDate";

function Payment({ payments, date }) {
  if (!payments || payments.length === 0) {
    return (
      <Container className={style.container}>
        <div className={style.main}>
          <div className={style.mainBox}>
            <h1>
              결제 내역이 없습니다. 이거 안 떠야됨 로그인 돼 있고 주문내역 있을
              때는
            </h1>
          </div>
        </div>
      </Container>
    );
  }

  const latestPayment = payments[0];

  return (
    <Container className={style.container}>
      <div className={style.main}>
        <div className={style.mainBox}>
          <div>결제 날짜</div>
          {/* <input value="2024-08-27" disabled /> */}
          <input value={date} />
          <div>결제 내역</div>
          <ul className={style.paylists}>
            {/* <li className={style.paylist}>온도조절기</li>
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
            <li className={style.paylist}>CCTV</li> */}
            {latestPayment.payments.map((item) => (
              <li className={style.paylist} key={item.id}>
                {item.description}
              </li>
            ))}
          </ul>
          <div className={style.payment}>결제 대금 : 35000</div>
        </div>
      </div>
    </Container>
  );
}

export default Payment;
