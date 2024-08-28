import React from "react";
import Board from "../../../components/board/Board";
import { sharing } from "../../../lib/post";
import PostView from "../../../components/board/post-view/PostView";
import { useComponentContext } from "../../../context/ComponentContext";

function SharingInformation(props) {
  const { currComp } = useComponentContext();

  return (
    <div>
      <h1>정보 공유 게시판</h1>
      <p> - 아이팜 회원님들의 정보 공유 게시판입니다.</p>
      <div>{currComp ? <PostView /> : <Board items={sharing} />}</div>
    </div>
  );
}

export default SharingInformation;
