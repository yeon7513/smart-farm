import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteComment, getComment } from "../../api/board";

const initialState = {
  comments: [], // 전체 게시글
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
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
  "comment/fetchComments",
  async (collectionName, docId) => {
    try {
      const data = await getComment(collectionName, docId);
      return data;
    } catch (error) {
      return error;
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
