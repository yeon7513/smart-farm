import { createSlice } from "@reduxjs/toolkit";

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
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
