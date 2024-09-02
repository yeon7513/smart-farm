import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../api/firebase";

const initialState = {
  faqData: [],
  isLoading: false,
  error: "",
};

const faqDataSlice = createSlice({
  name: "faqData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchfaqData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchfaqData.fulfilled, (state, action) => {
        state.faqData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchfaqData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchfaqData = createAsyncThunk(
  "faqData/fetchfaqData",
  async ({ collectionName }, thunkAPI) => {
    try {
      const resultData = await getDatas(collectionName);
      return resultData;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Error fetch Order");
    }
  }
);

export default faqDataSlice.reducer;
