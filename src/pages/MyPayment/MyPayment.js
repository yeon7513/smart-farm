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

  return (
    <>
      <PaymentsList />;
    </>
  );
}

export default MyPayment;
