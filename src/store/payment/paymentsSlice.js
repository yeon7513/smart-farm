import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatas } from '../../api/firebase';

const initialState = {
  payments: [],
  isLoading: false,
  error: '',
};

const paymentsSlice = createSlice({
  name: 'payments',
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

const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (collectionName) => {
    try {
      const result = await getDatas(collectionName);

      for (const user of result) {
        const userDocId = user.docId;

        const payments = await getDatas(`users/${userDocId}/payments`);

        user.payment = payments;
      }
      return result;
    } catch (error) {
      return null;
    }
  }
);

export default paymentsSlice.reducer;
export { fetchPayments };
