import React, { useEffect } from "react";
import styles from "./MyPayment.module.scss";
import PaymentsList from "./PaymentsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayment } from "../../store/payment/paymentSlice";
import PaymentEmpty from "./PaymentEmpty";
import { getISODate } from "../../utils/getFormattedDate";

function MyPayment() {
  const { payment } = useSelector((state) => state.paymentSlice);
  const { uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch();
    fetchPayment({
      collectionName: ["users", uid, "payments"],
    });
  }, []);

  if (payment.length == 0) {
    return <PaymentEmpty title="주문 내역" />;
  }

  return (
    <div className={styles.myPayments}>
      나의 결제내역
      {payment.map((payment, idx) => {
        <div key={idx}>
          <div className={styles.myPayment}>
            <h3>결제 번호_{payment.createdAt}</h3>
            <h3>
              결제 날짜_{getISODate(payment.createdAt).yyyyMMdd}{" "}
              {getISODate(payment.createdAt).hhmmss}
            </h3>
            <p>합계: {payment.totalPrice.toFixed(0)}</p>
            <PaymentsList />
          </div>
          ;
        </div>;
      })}
    </div>
  );
}

export default MyPayment;
