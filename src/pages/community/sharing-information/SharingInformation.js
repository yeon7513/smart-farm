import React from "react";
import Board from "../../../components/board/Board";
import { sharing } from "../../../lib/post";
import { name } from "./../../../lib/post";

function SharingInformation(props) {
  return (
    <div>
      <h1>정보 공유 게시판</h1>
      <p> - 아이팜 회원님들의 정보 공유 게시판입니다.</p>
      <div>
        <Board items={sharing} />
      </div>
    </div>
  );
}

export default SharingInformation;
