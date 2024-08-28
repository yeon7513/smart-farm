import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataRest } from "../../api/api";

const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async ({ collectionName }) => {
    try {
      const resultData = await getDataRest(collectionName);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

const initialState = {
  payment: {},
  isLoading: false,
  error: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payment = action.payload;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
export { fetchPayment };
