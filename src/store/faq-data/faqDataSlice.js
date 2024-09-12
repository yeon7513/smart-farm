import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../api/firebase";
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
);

const faqDataSlice = createSlice({
  name: "faqData",
  initialState: [],
  reducers: {
    setFaqData: (state, action) => {
      return action.payload;
    },
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
