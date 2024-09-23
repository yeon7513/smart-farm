import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSetDocDatas, getDatas } from "../../api/firebase";

const initialState = {
  processing: [],
  processed: [],
  isLoading: false,
  error: null,
};

const complainSlice = createSlice({
  name: "complain",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComplain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complain = action.payload;
        state.error = null;
      })
      .addCase(fetchComplain.rejected, (state, action) => {
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
        state.complain.push(action.payload); // 성공 시 데이터 추가
      })
      .addCase(addComplain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 컴플레인 가져오기
export const fetchComplain = createAsyncThunk(
  "complain/fetchComplain",
  async (collectionName) => {
    try {
      const data = await getDatas("complain");
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const addComplain = createAsyncThunk(
  "complain/addComplain",
  async ({ collectionName, complainData }, { rejectWithValue }) => {
    try {
      // Firestore에 수동으로 문서 ID 설정
      await addSetDocDatas(collectionName, complainData);

      return complainData; // 추가한 데이터를 리턴
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default complainSlice.reducer;
