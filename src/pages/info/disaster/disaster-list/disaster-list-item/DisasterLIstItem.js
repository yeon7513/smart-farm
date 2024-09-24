import React, { useEffect, useState } from "react";
import styles from "./DisasterListItem.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementViewCount } from "../../../../../api/disaster";
import { deleteDisasterDatas } from "../../../../../store/disaster/disasterSlice";

function DisasterLIstItem() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post: locationPost } = location.state || {}; // onDelete를 props로 받음
  // const post = locationPost;
  const [post, setPost] = useState(locationPost); // 초기 게시글 데이터 설정
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  console.log(post);
  //  게시글 삭제처리
  const handleDelete = () => {
    dispatch(deleteDisasterDatas(post.docId))
      .unwrap()
      .then(() => {
        navigate("/info/");
      })
      .catch((error) => {
        console.error("게시글 삭제 오류:", error);
      });
  };
  // 수정버튼
  const handleEdit = () => {
    console.log("Edit button clicked");
    if (post) {
      navigate(`/info/disaster/edit/${post.docId}`, { state: { post } });
    } else {
      console.error("Post data is not available.");
    }
  };
  //조회수
  const handlePostClick = async () => {
    try {
      await incrementViewCount("disasters", post.docId);
      // 추가 로직 (예: 라우팅 등)
    } catch (error) {
      console.error("조회수 증가 오류: ", error);
    }
  };
  useEffect(() => {
    handlePostClick();
  }, []);
  useEffect(() => {
    const updatedPost = location.state?.post;
    if (updatedPost) {
      setPost(updatedPost);
    }
  }, [location.state]);

  if (!post) {
    return <p>Post data not available</p>;
  }
  return (
    <div className={styles.main}>
      <div>
        <h2>{post.title}</h2>
      </div>
      <div className={styles.written}>
        <div className={styles.written_name}>
          <p>작성자:관리자</p>
        </div>
        <div className={styles.written_data}>
          <p>작성일:{post.createdAt}</p>
        </div>
        <div>
          <p>조회수: {post.view}</p>
        </div>
        <div className={styles.btn}>
          <div className={styles.written_btn}>
            <button onClick={handleEdit}>수정</button>
          </div>
          <div className={styles.written_btn}>
            <button onClick={handleDelete}>삭제</button>
          </div>
        </div>
      </div>
      <div>{post.summary}</div>
    </div>
  );
}

export default DisasterLIstItem;
