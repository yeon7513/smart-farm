import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, getOrder } from "../../api/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const fetchfaqData = createAsyncThunk(
  "faqData/fetchfaqData",
  async ({ collectionName, orderByField }) => {
    const q = query(
      collection(db, collectionName),
      orderBy(orderByField, "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  // async ({ collectionName, orderByField }) => {
  //   try {
  //     const resultData = await getOrder(collectionName, orderByField);
  //     return resultData;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
);

const faqDataSlice = createSlice({
  name: "faqData",
  initialState: [],
  reducers: {
    setFaqData: (state, action) => {
      return action.payload;
    },
    // updateFaq: (state, action) => {
    //   return state.map((faq) =>
    //     faq.id === action.payload.id ? action.payload : faq
    //   );
    // },
    // setLike: (state, action) => {
    //   return state.map((faq) =>
    //     faq.id === action.payload.id
    //       ? { ...faq, liked: action.payload.liked, likes: action.payload.likes }
    //       : faq
    //   );
    // },
    // removeLike: (state, action) => {
    //   return state.map((faq) =>
    //     faq.id === action.payload.id
    //       ? { ...faq, liked: action.payload.liked, likes: action.payload.likes }
    //       : faq
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchfaqData.fulfilled, (state, action) => action.payload)
      .addCase(fetchfaqData.rejected, (state, action) => {
        console.error("FAQ 데이터 로드 오류: ", action.error.message);
      });
  },
});

export default faqDataSlice.reducer;
export const { setLike, removeLike, setFaqData, updateFaq } =
  faqDataSlice.actions;
