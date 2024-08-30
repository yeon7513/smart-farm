import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "counter",
  initialState: { plus: 0, minus: 0 },
  reducers: {
    up: (state, action) => {
      state.plus = state.plus + action.payload;
    },
    down: (state, action) => {
      state.minus = state.minus - action.payload;
    },
  },
});

export default countSlice;
export const { up, down } = countSlice.actions;
