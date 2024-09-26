import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocDatas } from "../../api/firebase";
import { LoginGetDatas, updateDatasWithImage } from "../../api/userPage";

const initialState = localStorage.getItem("user")
  ? { ...JSON.parse(localStorage.getItem("user")), items: [] }
  : {
      email: "",
      token: "",
      uid: "",
      docId: "",
      nickname: "",
      name: "",
      number: "",
      address: "",
      farmAddress: "",
      photoUrl: "",
      complaneNum: 0,
      isAuthenticated: false,
      items: [],
      isLoading: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload, { isAuthenticated: true });

      const { items, isLoading, nick, ...restState } = state;

      localStorage.setItem("user", JSON.stringify(restState));
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.uid = "";
      state.docId = "";
      state.name = "";
      state.nickname = "";
      state.number = "";
      state.address = "";
      state.farmAddress = "";
      state.photoUrl = "";
      state.complaneNum = 0;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (user) => user.docId === action.payload.docId
        );
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }

        state.isLoading = false;
      })

      // docId 로 불러오기
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload; // 성공적으로 불러온 사용자 데이터 저장
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName }) => {
    try {
      const resultData = await LoginGetDatas(collectionName);
      return resultData;
    } catch (error) {
      return "Error" + error;
    }
  }
);

// 신고자 불러오기
// export const getUserById = createAsyncThunk(
//   "items/getUserById",
//   async ({ complainant }) => {
//     try {
//       const resultData = await getDocDatas("users", complainant);
//       return resultData;
//     } catch (error) {
//       console.log(`docId 로 데이터 불러오기 오류:`, error);
//     }
//   }
// );
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async ({ collectionName, docId }) => {
    try {
      const resultData = await getDocDatas(collectionName, docId);
      return resultData;
    } catch (error) {
      throw new Error(
        `신고자 데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`
      );
    }
  }
);

const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ collectionName, docId, updateObj, photoUrl }) => {
    try {
      const result = await updateDatasWithImage(
        collectionName,
        docId,
        updateObj,
        photoUrl
      );

      return result;
    } catch (error) {
      return error;
    }
  }
);

export default userSlice.reducer;
export { fetchItems, updateUserInfo };
export const { setUser, removeUser } = userSlice.actions;
