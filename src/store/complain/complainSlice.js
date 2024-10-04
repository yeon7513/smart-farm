import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatas } from "../../api/firebase";
import {
  addSetDocDatas,
  duplicateComplaint,
  incrementComplainCount,
  suspendBoard,
  updateComplaintNotProcess,
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
        if (action.payload.success === true) {
          state.processing.push(action.payload.data); // 성공 시 데이터 추가
        } else {
          state.error = action.payload.message; // 중복으로 실패 시 메세지
        }
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
        const { complaintId } = action.payload;
        // 처리 중인 신고 목록에서 해당 신고를 '처리 완료'로 변경
        state.processing = state.processing.filter(
          (complain) => complain.id !== complaintId
        );
        state.processed.push({
          ...state.processing.find((complain) => complain.id === complaintId),
          processYn: "Y" || "y",
        });
      })
      .addCase(approveComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

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
      const resultData = data.filter(
        (item) => item.processYn === "Y" || item.processYn === "y"
      ); // processYn 필드로 필터링
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
      const isDuplicate = await duplicateComplaint(
        complainData.complainantDocId,
        complainData.postDocId,
        complainData.type,
        complainData.commentId
      );

      if (isDuplicate) {
        alert("이미 신고되어 처리 중입니다.");
        console.log(complainData.commentId);
        return { success: false, message: "이미 신고되어 처리 중입니다." };
      }

      await addSetDocDatas(collectionName, complainData);

      return { success: true, data: complainData };
    } catch (error) {
      console.log(`신고하기 에러 발생: ${error.message}`);
      return { success: false, message: error.message };
    }
  }
);

// 신고 누적횟수 증가 및 승인
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
// 활동 정지
export const approveSuspend = createAsyncThunk(
  "complain/approveSuspend",
  async ({ userId }) => {
    try {
      // 신고당한 사용자의 신고 누적 횟수 증가
      await suspendBoard(userId);

      return { userId };
    } catch (error) {
      console.log(`승인 중 오류:`, error);
    }
  }
);

// 신고자 제재
export const approveComplainant = createAsyncThunk(
  "complain/approveComplainant",
  async ({ userId }) => {
    try {
      // 신고당한 사용자의 신고 누적 횟수 증가
      await incrementComplainCount(userId);

      return { userId };
    } catch (error) {
      console.log(`거부 승인 중 오류:`, error);
    }
  }
);

// 신고 거부
export const notApproveComplaint = createAsyncThunk(
  "complain/notApproveComplaint",
  async ({ complainId }) => {
    try {
      // processYn을 'y'로 업데이트
      await updateComplaintNotProcess(complainId);

      return { complainId };
    } catch (error) {
      console.log(`승인 중 오류:`, error);
    }
  }
);

export default complainSlice.reducer;
