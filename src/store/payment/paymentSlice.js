import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../api/firebase";

const initialState = {
  payment: [],
  isLoading: false,
  error: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayment.pending, (state, action) => {
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

export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async ({ collectionName, queryOptions }, thunkAPI) => {
    try {
      const resultData = await getDatas(collectionName);
      return resultData;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Error fetch Payment");
    }
  }
);

export default paymentSlice.reducer;
