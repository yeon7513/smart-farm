import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usageStatusData } from '../../api/usageStatusData';

const initialState = {
  entireRegionFarm: [],
  localRegionFarm: [],
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
      });
  },
});

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

export default usageStatusSlice.reducer;
