import React, { useEffect, useState } from "react";
import Board from "../../../components/board/Board"; // 게시판 리스트 컴포넌트
import { getBoardDatas } from "../../../api/firebase/board"; // Firebase에서 데이터 가져오는 함수

function BoardPage({ collectionName }) {
  const [posts, setPosts] = useState([]);
  const [noPost, setNoPost] = useState(false);

  // 데이터 로딩 함수
  const handleLoad = async () => {
    try {
      const data = await getBoardDatas(collectionName);
      setPosts(data);
      setNoPost(data.length === 0); // 게시글이 없는지 체크
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다:", error);
      setNoPost(true);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [collectionName]);

  return (
    <div>
      <h2>{collectionName} 게시판</h2>
      <Board items={posts} nopost={noPost} />
    </div>
  );
}

export default BoardPage;
