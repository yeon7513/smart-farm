import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatasRest } from "../../api/api";

const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async ({ collectionName }) => {
    try {
      const resultData = await getDatasRest(collectionName);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

const initialState = {
  payments: [],
  isLoading: false,
  error: "",
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default paymentsSlice.reducer;
export { fetchPayments };
