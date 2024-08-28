import React, { useEffect } from "react";
import styles from "./PaymentsList.module.scss";
import { getISODate } from "../../utils/getFormattedDate";
import { useDispatch, useSelector } from "react-redux";
import PaymentEmpty from "../../components/payment-empty/PaymentEmpty";
import { fetchPayment } from "../../store/payment/paymentSlice";
import PaymentsItem from "./PaymentsItem";

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
    return <PaymentEmpty title="결제내역" />;
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
          </div>
          <ul>
            {payment.payments.map((payment) => (
              <PaymentsItem key={payment.id} {...payment} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PaymentsList;
