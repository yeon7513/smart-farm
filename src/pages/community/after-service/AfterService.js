import React from "react";
import Board from "../../../components/board/Board";
import { as } from "../../../lib/post";
import PostView from "../../../components/board/post-view/PostView";

function AfterService(props) {
  return (
    <div>
      <h1>A/S 문의</h1>
      <p> - 이것저것 물어보슈</p>
      <div>
        <Board items={as} />
        <PostView />
      </div>
    </div>
  );
}

export default AfterService;
