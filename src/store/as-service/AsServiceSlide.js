import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoardDatas } from "../../api/board";
import { getDatas } from "../../api/firebase";
import {
  updateComplaintProcess,
  updateCompleteProcess,
} from "../../api/complaint";

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
      })

      // 완료 처리
      .addCase(approveComplete.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveComplete.fulfilled, (state, action) => {
        state.isLoading = false;
        const { postId } = action.payload;
        // 처리 중인 신고 목록에서 해당 신고를 '처리 완료'로 변경
        state.completing = state.completing.filter(
          (complete) => complete.id !== postId
        );
        state.completed.push({
          ...state.completing.find((complete) => complete.id === postId),
          completedYn: "Y",
        });
      })
      .addCase(approveComplete.rejected, (state, action) => {
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

export const fetchCompleting = createAsyncThunk(
  "as/fetchCompleting",
  async () => {
    try {
      const data = await getDatas("as");
      const resultData = data.filter((item) => item.completedYn === "N");
      console.log("Completing Data:", resultData); // 로그 추가
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
      const resultData = data.filter((item) => item.completedYn === "Y");
      console.log("Completed Data:", resultData); // 로그 추가
      return resultData;
    } catch (error) {
      console.log("답변 완료 데이터 불러오기 중 에러: ", error);
    }
  }
);

export const approveComplete = createAsyncThunk(
  "as/approveComplete",
  async ({ postId }) => {
    try {
      await updateCompleteProcess(postId);
      return { postId };
    } catch (error) {
      console.log(`완료 중 오류:`, error);
    }
  }
);

export default asSlice.reducer;
