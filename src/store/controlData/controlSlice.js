import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, getOrder } from "../../api/firebase";
import { LoginGetDatas } from "../../api/userPage";

const initialState = {
  item: [],
  dashboardAlertContent: [],
};

const controlSlice = createSlice({
  name: "controlStatus",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.item = [...state.item, ...action.payload.Data];
    },
    alertData: (state, action) => {
      state.item.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getdashboardAlertContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getdashboardAlertContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardAlertContent = action.payload;
      })
      .addCase(getdashboardAlertContent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const getdashboardAlertContent = createAsyncThunk(
  "dashboardAlertContent/fetchAlldashboardAlertContent",
  async ({ collectionName, orderByField }) => {
    try {
      const resultData = await getOrder(collectionName, orderByField);
      return resultData;
    } catch (error) {
      return "Error" + error;
    }
  }
);

const adddashboardAlertContent = createAsyncThunk(
  "dashboardAlertContent/fetchAlldashboardAlertContent",
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      return "Error" + error;
    }
  }
);
export default controlSlice.reducer;
export { getdashboardAlertContent };
export const { setData, alertData } = controlSlice.actions;
