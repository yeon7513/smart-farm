import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, deleteComment, getComment } from "../../api/board";

const initialState = {
  comments: [], // 전체 게시글
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (collectionName, docId) => {
    try {
      const data = await getComment(collectionName, docId);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const addComments = createAsyncThunk(
  "comments/addComments",
  async ({ collectionName, docId, commentObj }) => {
    try {
      const data = await addComment(collectionName, docId, commentObj);
      return data;
    } catch (error) {
      console.log(`댓글 추가 중 에러: `, error);
    }
  }
);

export const deleteCommentDatas = createAsyncThunk(
  "board/deleteCommentDatas",
  async ({ collectionName, docId, commentId }) => {
    try {
      const result = await deleteComment(
        collectionName,
        docId,
        "comment",
        commentId
      );
      return result;
    } catch (error) {
      return error;
    }
  }
);
export default commentSlice.reducer;
