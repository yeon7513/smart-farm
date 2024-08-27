import React, { useEffect } from "react";
import styles from "./PaymentsList.module.scss";
import { getISODate } from "../../utils/getFormattedDate";
import { useDispatch, useSelector } from "react-redux";
import PaymentEmpty from "./PaymentEmpty";
import { fetchPayment } from "../../store/payment/paymentSlice";

function PaymentsList() {
  const { payment } = useSelector((state) => state.paymentSlice);
  const { uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPayment({
        collectionName: ["users", uid, "payments"],
      })
    );
  }, []);

  if (payment.length === 0) {
    return <PaymentEmpty title="주문 내역" />;
  }

  return (
    <div className={styles.myPayments}>
      나의 결제내역
      {payment.map((payment, idx) => (
        <div key={idx}>
          <div className={styles.myPayment}>
            <h3>결제 번호_{payment.createdAt}</h3>
            <h3>
              결제 날짜_{getISODate(payment.createdAt).yyyyMMdd}{" "}
              {getISODate(payment.createdAt).hhmmss}
            </h3>
            <p>합계: {payment.totalPrice.toFixed(0)} 원</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentsList;
