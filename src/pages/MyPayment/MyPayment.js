import React from "react";
import styles from "./MyPayment.module.scss";
import PaymentsList from "./PaymentsList";
import { useSelector } from "react-redux";
import Checkout from "./Checkout";
import PaymentEmpty from "./PaymentEmpty";

function MyPayment() {
  const { payments } = useSelector((state) => state.paymentSlice);
  // const { uid } = useSelector((state) => state.userSlice);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  //   fetchPayment({
  //     collectionName: ["users", uid, "payments"],
  //   });
  // }, []);

  return (
    <div className={styles.myPayments}>
      {payments.length == 0 ? (
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
