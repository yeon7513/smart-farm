import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSetDocDatas, getDatas } from "../../api/firebase";
import {
  incrementComplainCount,
  updateComplaintProcess,
} from "../../api/complaint";

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
      })

      // 승인
      .addCase(approveComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processing = state.processing.map((complain) =>
          complain.id === action.payload.complainId
            ? { ...complain, processYn: "Y" }
            : complain
        );
        state.error = null;
      })
      .addCase(approveComplaint.rejected, (state, action) => {
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

// 신고 추가
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

// 신고 누적횟수 증가
export const approveComplaint = createAsyncThunk(
  "complain/approveComplaint",
  async ({ userId, complainId }) => {
    try {
      // 신고당한 사용자의 신고 누적 횟수 증가
      await incrementComplainCount(userId);

      // processYn을 'Y'로 업데이트
      await updateComplaintProcess(complainId);

      return { userId, complainId };
    } catch (error) {
      console.log(`승인 중 오류:`, error);
    }
  }
);

export default complainSlice.reducer;
