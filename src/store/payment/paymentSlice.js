import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase";

const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async ({ collectionName }) => {
    try {
      const snapshot = await getDocs(collection(db, ...collectionName));
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching payments: ", error);
      throw error;
    }
  }
);

const initialState = {
  payment: [],
  isLoading: false,
  error: "",
  createdAt: 0,
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
        state.createdAt = action.payload;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
export { fetchPayment };
