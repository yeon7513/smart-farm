import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deletePost, getBoardDatas, updatePost } from "../../api/board";

const initialState = {
  posts: [], // 전체 게시글
  myPosts: [], // 로그인한 사용자의 게시글
  isLoading: false,
  error: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    filterMyPosts: (state, action) => {
      const loginUser = action.payload;
      state.myPosts = state.posts.filter(
        (post) => post.nick === loginUser.nickname
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardDatas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBoardDatas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchBoardDatas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 글 수정
      .addCase(updateBoardDatas.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          return post.docId === action.payload.docId ? action.payload : post;
        });
        state.isLoading = false;
        state.error = null;
      })

      // 글 삭제
      .addCase(deleteBoardDatas.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.docId !== action.payload.docId
        );
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const fetchBoardDatas = createAsyncThunk(
  "board/fetchBoardDatas",
  async (category) => {
    try {
      const data = await getBoardDatas(category);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updateBoardDatas = createAsyncThunk(
  "board/updateBoardDatas",
  async ({ category, docId, updateObj }) => {
    try {
      const result = await updatePost(category, docId, updateObj);
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const deleteBoardDatas = createAsyncThunk(
  "board/deleteBoardDatas",
  async ({ category, docId }) => {
    try {
      const result = await deletePost(category, docId);
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const { filterMyPosts } = boardSlice.actions;
export default boardSlice.reducer;
