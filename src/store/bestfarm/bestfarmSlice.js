import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bestFarmInfo } from '../../api/simulationData';

const initialState = {
  environmentData: [], // 환경 정보
  growthData: [], // 생육 정보
  productionData: [], // 생산 정보
  isLoading: false,
  error: null,
};

const bestfarmSlice = createSlice({
  name: 'bestFarmData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnvironmentData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnvironmentData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.environmentData = action.payload;
        state.error = null;
      })
      .addCase(fetchEnvironmentData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchEnvironmentData = createAsyncThunk(
  'bestFarmData/fetchEnvironmentData',
  async (query) => {
    try {
      const data = await bestFarmInfo('envdatarqst', query);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export default bestfarmSlice.reducer;
