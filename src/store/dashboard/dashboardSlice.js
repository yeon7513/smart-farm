import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deactivationData } from '../../api/dashboard';
import { getDatas, updateDatas } from '../../api/firebase';

const initialState = {
  commonInfo: [],
  sectorInfo: [],
  resetSector: [],
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
      })

      // 대시보드 섹터 초기화
      .addCase(resetSectorData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetSectorData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetSector = action.payload.find((item) => item.id === 1);
        state.error = null;
      })
      .addCase(resetSectorData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 대시보드 이름, 작물 수정
      .addCase(updateCommonInfo.fulfilled, (state, action) => {
        state.commonInfo = state.commonInfo.map((info) => {
          return info.docId === action.payload.docId ? action.payload : info;
        });
        state.isLoading = false;
        state.error = null;
      })

      // 대시보드 삭제 (비활성화)
      .addCase(deactivationDashboard.fulfilled, (state, action) => {
        state.commonInfo = state.commonInfo.map((info) => {
          return info.docId === action.payload.docId ? action.payload : info;
        });
        state.isLoading = false;
        state.error = null;
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
      const data = await getDatas(collectionName);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const resetSectorData = createAsyncThunk(
  'dashboard/resetSectorData',
  async (collectionName) => {
    try {
      const data = await getDatas(collectionName);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updateCommonInfo = createAsyncThunk(
  'dashboard/updateCommonInfo',
  async ({ collectionName, docId, updateObj }) => {
    try {
      const result = await updateDatas(collectionName, docId, updateObj);
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const deactivationDashboard = createAsyncThunk(
  'dashboard/deactivationDashboard',
  async ({ collectionName, docId, fieldName }) => {
    try {
      const result = await deactivationData(collectionName, docId, fieldName);
      return result;
    } catch (error) {
      return error;
    }
  }
);

export default dashboardSlice.reducer;
