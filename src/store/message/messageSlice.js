import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // 메시지를 추가하는 리듀서
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // 모든 메시지를 초기화하는 리듀서 (필요할 경우)
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
