import React from 'react'

function ChattingMessage({ messages }) {
  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>  // 각 메시지를 렌더링
        ))}
      </div>
    </div>
  )
}

export default ChattingMessage
