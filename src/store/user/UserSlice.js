import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginGetDatas, updateDatasWithImage } from '../../api/userPage';
JSON.parse(localStorage.getItem('user'));

const initialState = localStorage.getItem('user')
  ? { ...JSON.parse(localStorage.getItem('user')), items: [] }
  : {
      email: '',
      token: '',
      uid: '',
      nick: '',
      name: '',
      number: '',
      address: '',
      farmAddress: '',
      photoUrl: '',
      complaneNum: 0,
      isAuthenticated: false,
      items: [],
      isLoading: false,
    };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload, { isAuthenticated: true });

      const { items, ...userWithoutItems } = state;
      localStorage.setItem('user', JSON.stringify(userWithoutItems));
    },
    removeUser: (state) => {
      state.email = '';
      state.token = '';
      state.uid = '';
      state.name = '';
      state.nick = '';
      state.number = '';
      state.address = '';
      state.farmAddress = '';
      state.photoUrl = '';
      state.complaneNum = 0;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
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
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (user) => user.docId === action.payload.docId
        );
        state.items[idx] = action.payload;
        state.isLoading = false;
      });
  },
});

const fetchItems = createAsyncThunk(
  'items/fetchAllItems',
  async ({ collectionName }) => {
    try {
      const resultData = await LoginGetDatas(collectionName);
      return resultData;
    } catch (error) {
      return 'Error' + error;
    }
  }
);

const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
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
