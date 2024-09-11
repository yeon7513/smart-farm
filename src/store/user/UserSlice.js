import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginGetDatas } from "../../api/firebase";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      email: "",
      token: "",
      uid: "",
      nick: "",
      name: "",
      number: "",
      address: "",
      isAuthenticated: false,
      items: [],
      isLoading: "false",
    };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.nick = action.payload.nick;
      state.number = action.payload.number;
      state.address = action.payload.address;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(state));
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.uid = "";
      state.name = "";
      state.nick = "";
      state.number = "";
      state.address = "";
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchItems.pending, (state, action) => {
      //   state.isLoading = "Loadgin";
      // })
      // .addCase(fetchItems.rejected, (state, action) => {
      //   state.isLoading = "false";
      //   state.loadingError = action.payload;
      // })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = "true";
        state.items = action.payload;
        console.log(action.payload);
      });
  },
});

const fetchItems = createAsyncThunk(
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

export default userSlice.reducer;
export { fetchItems };
export const { setUser, removeUser } = userSlice.actions;
