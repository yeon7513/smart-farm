import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteDisaster,
  getDisasterDatas,
  updateDisaster,
} from "../../api/disaster";

// 초기 상태
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// Redux Slice 생성
const disasterSlice = createSlice({
  name: "disaster",
  initialState,
  reducers: {
    filterMyPosts: (state, action) => {
      const loginUser = action.payload;
      state.myPosts = state.posts.filter(
        (post) => post.nick === loginUser.nickname
      );
    },
    incrementViewCount: (state, action) => {
      const postId = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.views = (post.views || 0) + 1; // 조회수 증가
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisasterDatas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDisasterDatas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload; // 서버에서 가져온 게시글로 업데이트
        state.error = null;
      })
      .addCase(fetchDisasterDatas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // 에러 메시지로 업데이트
      })

      .addCase(updateDisasterDatas.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.docId === action.payload.docId ? action.payload : post
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteDisasterDatas.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.docId !== action.payload.docId
        );
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const fetchDisasterDatas = createAsyncThunk(
  "disaster/fetchDisasterDatas",
  async (category) => {
    const data = await getDisasterDatas(category);
    return data;
  }
);

export const updateDisasterDatas = createAsyncThunk(
  "disaster/updateDisasterDatas",
  async ({ category, docId, updateObj }) => {
    const result = await updateDisaster(category, docId, updateObj);
    return result;
  }
);

export const deleteDisasterDatas = createAsyncThunk(
  "disaster/deleteDisasterDatas",
  async (docId) => {
    await deleteDisaster("disasters", docId);
    return { docId };
  }
);

// 액션 생성자와 리듀서 내보내기
export const { filterMyPosts, incrementViewCount } = disasterSlice.actions;
export default disasterSlice.reducer;
