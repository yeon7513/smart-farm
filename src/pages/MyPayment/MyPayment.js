import React from "react";
import styles from "./MyPayment.module.scss";
import PaymentsList from "./PaymentsList";

function MyPayment() {
  return (
    <div className={styles.myPayments}>
      나의 결제내역
      <div className={styles.myPayment}>
        <PaymentsList />
      </div>
    </div>
  );
}

export default MyPayment;
