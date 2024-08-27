import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/UserSlice";

export const store = configureStore({
  reducer: {
    userSlice,
  },
});
