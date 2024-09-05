import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./order/orderSlice";
import paymentSlice from "./payment/paymentSlice";
import paymentsSlice from "./payment/paymentsSlice";
import usageStatusSlice from "./usage-status/usageStatusSlice";
import userSlice from "./user/UserSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    paymentSlice,
    paymentsSlice,
    orderSlice,
    usageStatusSlice,
  },
});
