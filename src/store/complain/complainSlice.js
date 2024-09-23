import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSetDocDatas, getDatas } from "../../api/firebase";

const initialState = {
  processing: [], // 처리 중
  processed: [], // 처리 완료
  isLoading: false,
  error: null,
};

const complainSlice = createSlice({
  name: "complain",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      // 처리 중
      .addCase(fetchProcessing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProcessing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processing = action.payload;
      })
      .addCase(fetchProcessing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 처리 완료
      .addCase(fetchProcessed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProcessed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processed = action.payload;
      })
      .addCase(fetchProcessed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 신고 데이터 추가
      .addCase(addComplain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addComplain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processing.push(action.payload); // 성공 시 데이터 추가
      })
      .addCase(addComplain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// // 컴플레인 가져오기
// export const fetchComplain = createAsyncThunk(
//   "complain/fetchComplain",
//   async (collectionName) => {
//     try {
//       const data = await getDatas(collectionName);
//       return data;
//     } catch (error) {
//       return error;
//     }
//   }
// );

// 처리 중 신고 불러오기
export const fetchProcessing = createAsyncThunk(
  "complain/fetchProcessing",
  async () => {
    try {
      const data = await getDatas("complain"); // Firestore에서 모든 데이터를 불러옴
      const resultData = data.filter((item) => item.processYn === "n"); // processYn 필드로 필터링
      return resultData;
    } catch (error) {
      console.log("처리 중 데이터 불러오기 중 에러: ", error);
    }
  }
);

// 처리 완료 신고 불러오기
export const fetchProcessed = createAsyncThunk(
  "complain/fetchProcessed",
  async () => {
    try {
      const data = await getDatas("complain");
      const resultData = data.filter((item) => item.processYn === "Y"); // processYn 필드로 필터링
      return resultData;
    } catch (error) {
      console.log("처리 완료 데이터 불러오기 중 에러: ", error);
    }
  }
);

export const addComplain = createAsyncThunk(
  "complain/addComplain",
  async ({ collectionName, complainData }) => {
    try {
      // Firestore에 수동으로 문서 ID 설정
      await addSetDocDatas(collectionName, complainData);

      return complainData; // 추가한 데이터를 리턴
    } catch (error) {
      console.log(`신고하기 에러 발생`);
      return false;
    }
  }
);

export default complainSlice.reducer;
