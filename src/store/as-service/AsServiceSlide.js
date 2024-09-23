import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoardDatas } from "../../api/board";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const asSlice = createSlice({
  name: "as",
  initialState,
  reducers: {
    // setPosts: (state, action) => {
    //   state.posts = action.payload;
    // },
    // updatePostStatus: (state, action) => {
    //   const { postId, status } = action.payload;
    //   const post = state.posts.find((post) => post.id === postId);
    //   if (post) {
    //     post.status = status;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsDatas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAsDatas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchAsDatas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchAsDatas = createAsyncThunk(
  "board/fetchBoardDatas",
  async (category) => {
    try {
      const data = await getBoardDatas("as");
      return data;
    } catch (error) {
      return error;
    }
  }
);

export default asSlice.reducer;
