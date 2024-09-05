import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("faqData")
  ? JSON.parse(localStorage.getItem("faqData"))
  : [];

const faqDataSlice = createSlice({
  name: "faqData",
  initialState,
  reducers: {
    setLike: (state, action) => {
      // action.payload는 객체여야 한다고 가정합니다.
      const { id, question, answer, likes, views } = action.payload;
      state.id = id;
      state.question = question;
      state.answer = answer;
      state.likes = likes;
      state.views = views;

      localStorage.setItem("faqData", JSON.stringify(state));
    },
    removeLike: (state, action) => {
      // action.payload는 객체여야 한다고 가정합니다.
      const { id, question, answer, likes, views } = action.payload;
      state.id = id;
      state.question = question;
      state.answer = answer;
      state.likes = likes;
      state.views = views;

      localStorage.setItem("faqData", JSON.stringify(state));
    },
  },
});

// export const fetchfaqData = createAsyncThunk(
//   "faqData/fetchfaqData",
//   async ({ collectionName }, thunkAPI) => {
//     try {
//       const resultData = await getDatas(collectionName);
//       return resultData;
//     } catch (error) {
//       console.error(error);
//       return thunkAPI.rejectWithValue("Error fetch Order");
//     }
//   }
// );

export default faqDataSlice.reducer;
export const { setLike, removeLike } = faqDataSlice.actions;
