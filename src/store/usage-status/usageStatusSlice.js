import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usageStatusData } from '../../api/usageStatusData';

const initialState = {
  entireRegionFarm: [],
  localRegionFarm: {},
  entireRegionCrop: [],
  localRegionCrop: [],
  isLoading: false,
  error: null,
};

const usageStatusSlice = createSlice({
  name: 'usageStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 지역별 전체 이용 현황
      .addCase(fetchEntireRegionFarm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEntireRegionFarm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entireRegionFarm = action.payload;
        state.error = null;
      })
      .addCase(fetchEntireRegionFarm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 지역별 상세 이용 현황
      .addCase(fetchLocalRegionFarm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLocalRegionFarm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localRegionFarm = action.payload;
        state.error = null;
      })
      .addCase(fetchLocalRegionFarm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 작물별 전체 이용 현황
      .addCase(fetchEntireRegionCrop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEntireRegionCrop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entireRegionCrop = action.payload;
        state.error = null;
      })
      .addCase(fetchEntireRegionCrop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 작물별 상세 이용 현황
      .addCase(fetchLocalRegionCrop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLocalRegionCrop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localRegionCrop = action.payload;
        state.error = null;
      })
      .addCase(fetchLocalRegionCrop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 지역별 전체 이용 현황
export const fetchEntireRegionFarm = createAsyncThunk(
  'usageStatus/fetchEntireRegionFarm',
  async () => {
    try {
      const data = await usageStatusData();
      const addr = data.map((data) => data.addressName);
      const locals = addr
        .map((addr) => addr.split(' ')[0])
        .reduce((acc, name) => {
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

      const result = Object.entries(locals).map(([name, value]) => ({
        name,
        value,
      }));

      return result;
    } catch (error) {
      return error;
    }
  }
);

// 지역별 상세 이용 현황
export const fetchLocalRegionFarm = createAsyncThunk(
  'usageStatus/localRegionFarm',
  async () => {
    try {
      const data = await usageStatusData();
      const locals = data
        .map((data) => data.addressName)
        .map((addr) => addr.split(' '));

      const result = {};

      locals.forEach(([province, city]) => {
        if (city) {
          if (!result[province]) {
            result[province] = {};
          }
          if (!result[province][city]) {
            result[province][city] = { count: 0 };
          }
          result[province][city].count += 1;
        } else {
          // city가 없는 경우
          if (!result[province]) {
            result[province] = { count: 0 };
          }
          result[province].count += 1;
        }
      });

      return result;
    } catch (error) {
      return error;
    }
  }
);

// 작물별 전체 이용 현황
export const fetchEntireRegionCrop = createAsyncThunk(
  'usageStatus/entireRegionCrop',
  async () => {
    try {
    } catch (error) {}
  }
);

// 작물별 상세 이용 현황
export const fetchLocalRegionCrop = createAsyncThunk(
  'usageStatus/localRegionCrop',
  async () => {
    try {
    } catch (error) {}
  }
);

export default usageStatusSlice.reducer;
