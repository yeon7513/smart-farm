import React from "react";
import Board from "../../../components/board/Board";
import { sharing } from "../../../lib/post";

function SharingInformation(props) {
  return (
    <div>
      <h1>정보 공유 게시판</h1>
      <div>
        <Board items={sharing} />
      </div>
    </div>
  );
}

export default SharingInformation;
