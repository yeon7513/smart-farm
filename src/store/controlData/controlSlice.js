import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrder } from '../../api/firebase';
import { openDB } from '../../utils/indexedDB';

const initialState = {
  item: [],
  postsLength: '',
  count: '',
  randomCount: '',
  dashboardAlertContent: [],
  controlItems: [],
};
const controlSlice = createSlice({
  name: 'controlStatus',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.item = [...state.item, ...action.payload.Data];
    },
    alertData: (state, action) => {
      state.item.push(action.payload);
    },
    countData: (state, action) => {
      state.count = action.payload;
    },
    randomCountData: (state, action) => {
      state.randomCount = action.payload;
    },
    postsLengthData: (state, action) => {
      state.postsLength = action.payload;
    },
    setControlItem: (state, action) => {
      state.controlItems = action.payload;
    },
    addControlItem: (state, action) => {
      state.controlItems.push(action.payload);
      saveControlItem(action.payload);
    },
    removeControlItem: (state, action) => {
      state.controlItems = state.controlItems.filter(
        (item) => item.id !== action.payload
      );
      deleteControlItem(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getdashboardAlertContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getdashboardAlertContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardAlertContent = action.payload;
      })
      .addCase(getdashboardAlertContent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// indexedDB에 데이터 저장
const saveControlItem = async (item) => {
  const db = await openDB();

  const transaction = db.transaction(['myStore'], 'readwrite');
  const store = transaction.objectStore('myStore');

  await store.put(item);
};

// indexedDB에 데이터 삭제
const deleteControlItem = async (id) => {
  const db = await openDB();

  const transaction = db.transaction(['myStore'], 'readwrite');
  const store = transaction.objectStore('myStore');

  store.delete(id);
};

const getdashboardAlertContent = createAsyncThunk(
  'dashboardAlertContent/fetchAlldashboardAlertContent',
  async ({ collectionName, orderByField }) => {
    try {
      const resultData = await getOrder(collectionName, orderByField);
      return resultData;
    } catch (error) {
      return 'Error' + error;
    }
  }
);

export default controlSlice.reducer;
export { getdashboardAlertContent };
export const {
  setData,
  alertData,
  countData,
  randomCountData,
  postsLengthData,
  setControlItem,
  addControlItem,
  removeControlItem,
} = controlSlice.actions;
