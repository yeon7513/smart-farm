import React from 'react'

function ChattingMessage({ messages }) {
  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
          <p>{msg.content}</p>  // 각 메시지를 렌더링
          <small>{new Date(msg.createdAt.seconds * 1000).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChattingMessage
