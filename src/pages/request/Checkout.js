import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Checkout() {
  const { payment, totalPrice } = useSelector((state) => state.paymentSlice);
  const { isAuthenticated, uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  return <div>?</div>;
}

export default Checkout;
