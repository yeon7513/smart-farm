import React from "react";
import Board from "../Board";
import { sharing } from "../../../lib/post";
import { Link } from "react-router-dom";

function BoardItem({ id, title, user, date, comment }) {
  return (
    <div>
      <Link>
        <li>
          <div>{id}</div>
          <div>{title}</div>
          <div>{user}</div>
          <div>{date}</div>
          <div>{comment}</div>
        </li>
      </Link>
    </div>
  );
}

export default BoardItem;
