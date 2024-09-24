import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoardDatas } from "../../api/board";
import { getDatas } from "../../api/firebase";

const initialState = {
  completing: [],
  completed: [],
  isLoading: false,
  error: null,
};

const asSlice = createSlice({
  name: "as",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(fetchAsDatas.pending, (state) => {
      //     state.isLoading = true;
      //     state.error = null;
      //   })
      //   .addCase(fetchAsDatas.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.posts = action.payload;
      //     state.error = null;
      //   })
      //   .addCase(fetchAsDatas.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.error = action.payload;
      //   })

      // 답변 중
      .addCase(fetchCompleting.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompleting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.completing = action.payload;
      })
      .addCase(fetchCompleting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 답변 완료
      .addCase(fetchCompleted.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.completed = action.payload;
      })
      .addCase(fetchCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const fetchAsDatas = createAsyncThunk(
//   "as/fetchAsDatas",
//   async (category) => {
//     try {
//       const data = await getBoardDatas(category);
//       return data;
//     } catch (error) {
//       console.log("as 데이터 불러오기 중 에러: ", error);
//     }
//   }
// );

// 답변 중 불러오기
export const fetchCompleting = createAsyncThunk(
  "as/fetchCompleting",
  async () => {
    try {
      const data = await getDatas("as"); // Firestore에서 모든 데이터를 불러옴
      const resultData = data.filter((item) => item.completedYn === "N"); // processYn 필드로 필터링
      return resultData;
    } catch (error) {
      console.log("답변 중 데이터 불러오기 중 에러: ", error);
    }
  }
);

// 답변 완료 불러오기
export const fetchCompleted = createAsyncThunk(
  "as/fetchCompleted",
  async () => {
    try {
      const data = await getDatas("as");
      const resultData = data.filter((item) => item.completedYn === "Y"); // processYn 필드로 필터링
      return resultData;
    } catch (error) {
      console.log("답변 완료 데이터 불러오기 중 에러: ", error);
    }
  }
);

export default asSlice.reducer;
