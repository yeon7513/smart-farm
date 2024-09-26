import React from 'react';
import styles from './ChatRequestList.module.scss';
import ChatRequestItem from './chat-request-item/ChatRequestItem';

function ChatRequestList({ chatRequests, onApproveChat }) {
  return (
    <ul className={styles.list}>
      {chatRequests.map((chat) => (
        <ChatRequestItem
          key={chat.id}
          chat={chat}
          onApprove={() => onApproveChat(chat.id)} // 채팅 승인 함수 호출
        />
      ))}
    </ul>
  );
}

export default ChatRequestList;
