import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../api/firebase";

const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async ({ collectionName, queryOptions }, { rejectWithValue }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const initialState = {
  order: "views",
  isLoading: false,
  error: "",
  items: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
export { fetchOrder };
export const { setOrder } = orderSlice.actions;
