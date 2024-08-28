import React, { useEffect } from "react";
import styles from "./MyPayment.module.scss";
import PaymentsList from "./PaymentsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayment } from "../../store/payment/paymentSlice";

function MyPayment() {
  const { uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch();
    fetchPayment({
      collectionName: ["users", uid, "payments"],
    });
  }, []);

  return (
    <div className={styles.myPayments}>
      <div className={styles.myPayment}>
        <h1>결제 내역</h1>
        <PaymentsList />;
      </div>
    </div>
  );
}

export default MyPayment;
