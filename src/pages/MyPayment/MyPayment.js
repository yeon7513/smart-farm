import React from "react";
import styles from "./MyPayment.module.scss";

function MyPayment() {
  return (
    <div className={styles.myPayments}>
      나의 결제내역
      <div className={styles.myPayment}>
        <p>나의 결제내역</p>
      </div>
    </div>
  );
}

export default MyPayment;
