import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  isLoading: false,
  error: null,
};

const controlSlice = createSlice({
  name: "controlStatus",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.item = action.payload.Data;
    },
  },
});

export default controlSlice.reducer;
export const { setData } = controlSlice.actions;
