import React from "react";

function BoardItem({ id, title, user, date, comment }) {
  return (
    <>
      <div>{id}</div>
      <div>{title}</div>
      <div>{user}</div>
      <div>{date}</div>
      <div>{comment}</div>
    </>
  );
}

export default BoardItem;
