import { createSlice } from "@reduxjs/toolkit";

const chatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState: {
      chatroomId: null, // 기본값 설정
      messages: [],
    },
    reducers: {
      setChatroomId: (state, action) => {
        state.chatroomId = action.payload;
      },
      setMessages: (state, action) => {
        state.messages = action.payload;
      },
      addMessage: (state, action) => {
        state.messages.push(action.payload);
      },
    },
  });
  
  export const { setChatroomId, setMessages, addMessage } = chatRoomSlice.actions;
  export default chatRoomSlice.reducer;
  