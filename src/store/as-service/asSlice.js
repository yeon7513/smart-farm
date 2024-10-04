import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBoardDatas, getBoardDatas } from "../../api/board";
import { updateCompleteProcess } from "../../api/complaint";

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
      })

      // a/s 데이터 추가
      .addCase(addComplete.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addComplete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.completing.push(action.payload); // 성공 시 데이터 추가
      })
      .addCase(addComplete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchCompleting = createAsyncThunk(
  "as/fetchCompleting",
  async () => {
    try {
      const data = await getBoardDatas("as");
      const resultData = data.filter((item) => item.completeYn === "N");
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
      const data = await getBoardDatas("as");
      const resultData = data.filter((item) => item.completeYn === "Y");
      return resultData;
    } catch (error) {
      console.log("답변 완료 데이터 불러오기 중 에러: ", error);
    }
  }
);

// a/s 문의 추가
export const addComplete = createAsyncThunk(
  "complain/addComplete",
  async ({ collectionName, addObj }) => {
    try {
      // Firestore에 수동으로 문서 ID 설정
      await addBoardDatas(collectionName, addObj);

      return addObj; // 추가한 데이터를 리턴
    } catch (error) {
      console.log(`신고하기 에러 발생`);
      return false;
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
