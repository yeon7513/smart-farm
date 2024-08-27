import React from "react";
import style from "./Payment.module.scss";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
function Payment(props) {
  return (
    <Container className={styles.container}>
      <div>
        <div>결제 날짜</div>
        <input value="2024-08-27" disabled />
        <div>결제 내역</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
}

export default Payment;
