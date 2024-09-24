import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../api/firebase';

// 메시지 전송 Thunk 함수 (비동기 처리)
export const sendMessage = createAsyncThunk(
  'chatRoom/sendMessage',
  async ({ chatroomId, message }, { rejectWithValue }) => {
    const newMessage = {
      content: message,
      createdAt: new Date(),
      uid: 'localUser', // 실제 사용자 ID로 교체
    };
    try {
      await addDoc(collection(db, 'chatroom', chatroomId, 'message'), newMessage);
      return newMessage; // 성공 시 메시지 반환
    } catch (error) {
      return rejectWithValue(error.message); // 실패 시 에러 반환
    }
  }
);

// 실시간 메시지 구독 Thunk 함수 (비동기 처리)
export const subscribeToMessages = createAsyncThunk(
  'chatRoom/subscribeToMessages',
  async (chatroomId, { dispatch }) => {
    const q = query(
      collection(db, 'chatroom', chatroomId, 'message'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setMessages(fetchedMessages)); // 가져온 메시지 상태 업데이트
    });

    return unsubscribe; // 구독 해제할 수 있도록 반환
  }
);

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 메시지 전송 상태 처리
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload); // 성공 시 메시지 추가
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 실시간 메시지 구독 상태 처리
      .addCase(subscribeToMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeToMessages.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(subscribeToMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMessages } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
