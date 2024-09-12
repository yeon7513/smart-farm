import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentEmpty from "../../components/payment-empty/PaymentEmpty";
import { fetchPayment } from "../../store/payment/paymentSlice";
import Payment from "../../components/Mypage/payment/Payment";

function PaymentsList() {
  const { payment } = useSelector((state) => state.paymentSlice);
  const { uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      dispatch(
        fetchPayment({
          collectionName: "payments",
        })
      );
    }
  }, [uid, dispatch]);

  if (!payment || payment.length === 0) {
    return <PaymentEmpty title="결제내역" />;
  }

  return <Payment payment={payment} />;
}

export default PaymentsList;
