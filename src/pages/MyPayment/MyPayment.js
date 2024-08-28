import React, { useEffect } from "react";
import styles from "./MyPayment.module.scss";
import PaymentsList from "./PaymentsList";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../request/Checkout";
import PaymentEmpty from "../../components/payment-empty/PaymentEmpty";
import { fetchPayment } from "../../store/payment/paymentSlice";

function MyPayment() {
  const { payments } = useSelector((state) => state.paymentsSlice);
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
      {payments.length === 0 ? (
        <PaymentEmpty title={"결제내역"} />
      ) : (
        <div className={styles.myPayment}>
          <h1>결제 내역</h1>
          <PaymentsList />
          <Checkout />
        </div>
      )}
    </div>
  );
}

export default MyPayment;
