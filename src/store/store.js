import { configureStore } from "@reduxjs/toolkit";
import bestfarmSlice from "./bestfarm/bestfarmSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import faqDataSlice from "./faq-data/faqDataSlice";
import orderSlice from "./order/orderSlice";
import paymentSlice from "./payment/paymentSlice";
import paymentsSlice from "./payment/paymentsSlice";
import usageStatusSlice from "./usage-status/usageStatusSlice";
import userSlice from "./user/UserSlice";
import controlSlice from "./controlData/controlSlice";
import boardSlice from "./board/boardSlice";
import complainSlice from "./complain/complainSlice";
import disasterSlice from "./disaster/disasterSlice";
import asSlice from "./as-service/asSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    paymentSlice,
    paymentsSlice,
    orderSlice,
    usageStatusSlice,
    faqDataSlice,
    dashboardSlice,
    bestfarmSlice,
    controlSlice,
    boardSlice,
    complainSlice,
    disasterSlice,
    asSlice,
  },
});
