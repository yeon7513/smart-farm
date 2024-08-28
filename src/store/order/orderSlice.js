import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: JSON.parse(localStorage.getItem("user")),
  order: [],
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      state.payments.push({
        ...action.payload,
        total: action.payload.price,
      });
      localStorage.setItem("user", JSON.stringify(state.payments));
    },
    deleteFromOrder: (state, action) => {
      state.payments = state.payments.filter(
        (payment) => payment.id !== action.payload
      );
      localStorage.setItem("user", JSON.stringify(state.payments));
    },
    syncOrderAndSlice: (state, action) => {
      state.payments = action.payload;
      localStorage.setItem("user", JSON.stringify(state.payments));
    },
    getTotalPrice: (state) => {
      state.totallPrice = state.payments.reduce(
        (acc, payment) => (acc += payment.total),
        0
      );
    },
    sendOrder: (state) => {
      state.payments = [];
      localStorage.setItem("user", JSON.stringify(state.payments));
    },
  },
});

export const syncOrderAndStorage = createAsyncThunk(
  "ordder/asyncOrderItem",
  async ({ uid }, thunkAPI) => {
    try {
    } catch (error) {
      console.error(error);
    }
  }
);
