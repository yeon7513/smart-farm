import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bestFarmInfo } from "../../api/simulationData";

const initialState = {
  environmentData: [], // 환경 정보
  growthData: [], // 생육 정보
  productionData: [], // 생산 정보
  isLoading: false,
  error: null,
};

const bestfarmSlice = createSlice({
  name: "bestFarmData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 환경 정보 조회
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
      })

      // 생육 정보 조회
      .addCase(fetchGrowthData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGrowthData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.growthData = action.payload;
        state.error = null;
      })
      .addCase(fetchGrowthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 생산 정보 조회
      .addCase(fetchProductionData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductionData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productionData = action.payload;
        state.error = null;
      })
      .addCase(fetchProductionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 필수 요청
// searchFrmhsCode : 검색 농가 코드
// 시뮬레이션 페이지에서는
// 딸기 : S47 / 토마토 : 43 / 파프리카 : SP11 사용중입니다.

// 환경
export const fetchEnvironmentData = createAsyncThunk(
  "bestFarmData/fetchEnvironmentData",
  async (query) => {
    try {
      const data = await bestFarmInfo("envdatarqst", query);
      return data;
    } catch (error) {
      return error;
    }
  }
);

// 생육
export const fetchGrowthData = createAsyncThunk(
  "bestFarmData/fetchGrowthData",
  async (query) => {
    try {
      const data = await bestFarmInfo("grwdatarqst", query);
      return data;
    } catch (error) {
      return error;
    }
  }
);

// 수확
export const fetchProductionData = createAsyncThunk(
  "bestFarmData/fetchProductionData",
  async (query) => {
    try {
      const data = await bestFarmInfo("prddatarqst", query);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export default bestfarmSlice.reducer;
