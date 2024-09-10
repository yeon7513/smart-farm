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
      // 대시보드 공통 데이터
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
      })
      // 대시보드 섹터 데이터
      .addCase(fetchSectorInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSectorInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sectorInfo = action.payload;
        state.error = null;
      })
      .addCase(fetchSectorInfo.rejected, (state, action) => {
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
  async (docId) => {
    try {
      const data = await getDatas(`dashboard/${docId}/sector`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export default dashboardSlice.reducer;
