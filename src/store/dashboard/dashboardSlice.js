import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatas } from '../../api/firebase';

const initialState = {
  commonInfo: [],
  sectorInfo: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommonInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommonInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commonInfo = action.payload;
        state.error = null;
      })
      .addCase(fetchCommonInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchCommonInfo = createAsyncThunk(
  'dashboard/fetchCommonInfo',
  async (collectionName) => {
    try {
      const data = await getDatas(collectionName);
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchSectorInfo = createAsyncThunk(
  'dashboard/fetchSectorInfo',
  async (collectionName) => {
    try {
    } catch (error) {}
  }
);

export default dashboardSlice.reducer;
