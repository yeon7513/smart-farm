import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas } from "../../api/firebase";
import { LoginGetDatas } from "../../api/userPage";

const initialState = {
  item: [],
  items: [],
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
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const getItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName }) => {
    try {
      const resultData = await LoginGetDatas(collectionName);
      return resultData;
    } catch (error) {
      return "Error" + error;
    }
  }
);

const addItems = createAsyncThunk(
  "items/fetchAllItems",
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
export { getItems };
export const { setData, alertData } = controlSlice.actions;
