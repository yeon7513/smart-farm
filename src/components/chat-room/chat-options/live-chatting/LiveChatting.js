import React from 'react';
import ChattingMessage from './chatting-message/ChattingMessage';

function LiveChatting({ messages, handleSendMessage }) {
  return (
    <div>
      <ChattingMessage messages={messages} onSendMessage={handleSendMessage} />{' '}
      {/* 메시지 목록 전달 */}
    </div>
  );
}

export default LiveChatting;
