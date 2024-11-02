import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../../api/firebase";

const initialState = {
  item: [],
  postsLength: "",
  count: "",
  randomCount: "",
  dashboardAlertContent: [],
  controlItems: [],
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
    countData: (state, action) => {
      state.count = action.payload;
    },
    randomCountData: (state, action) => {
      state.randomCount = action.payload;
    },
    postsLengthData: (state, action) => {
      state.postsLength = action.payload;
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

export default controlSlice.reducer;
export { getdashboardAlertContent };
export const {
  setData,
  alertData,
  countData,
  randomCountData,
  postsLengthData,
} = controlSlice.actions;
