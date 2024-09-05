import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faqData: [],
};

const faqDataSlice = createSlice({
  name: "faqData",
  initialState,
  reducers: {
    setFaqData: (action) => {
      return action.payload;
    },
    updateFaq: (state, action) => {
      return state.map((faq) =>
        faq.id === action.payload.id ? action.payload : faq
      );
    },
    setLike: (state, action) => {
      return state.map((faq) =>
        faq.id === action.payload.id
          ? { ...faq, liked: action.payload.liked, likes: action.payload.likes }
          : faq
      );
    },
    removeLike: (state, action) => {
      return state.map((faq) =>
        faq.id === action.payload.id
          ? { ...faq, liked: action.payload.liked, likes: action.payload.likes }
          : faq
      );
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
export const { setLike, removeLike, setFaqData, updateFaq } =
  faqDataSlice.actions;
