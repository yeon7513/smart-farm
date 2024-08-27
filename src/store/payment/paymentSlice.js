import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    builder.addCase();
  },
});

export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async ({ collectionName, queryOptions }, thunkAPI) => {
    try {
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Error fetch Payment");
    }
  }
);

export default paymentSlice.reducer;
