import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user/UserSlice";

export const store = configureStore({
  reducer: {
    UserSlice,
  },
});
