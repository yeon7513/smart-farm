import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/UserSlice";
import paymentSlice from "./payment/paymentSlice";
import paymentsSlice from "./payment/paymentsSlice";
import orderSlice from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    paymentSlice,
    paymentsSlice,
    orderSlice,
  },
});
