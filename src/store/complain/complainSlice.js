import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../api/firebase";

const initialState = {
  complain: [],
  isLoading: false,
  error: null,
};

const complainSlice = createSlice({
  name: "complain",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComplain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complain = action.payload;
        state.error = null;
      })
      .addCase(fetchComplain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 컴플레인 가져오기
export const fetchComplain = createAsyncThunk(
  "complain/fetchComplain",
  async (collectionName) => {
    try {
      const data = await getDatas(collectionName);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export default complainSlice.reducer;
