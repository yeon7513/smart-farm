import React, { useEffect, useState } from "react";
import styles from "./DisasterListItem.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementViewCount } from "../../../../../api/disaster";
import { deleteDisasterDatas } from "../../../../../store/disaster/disasterSlice";

function DisasterLIstItem() {
  const location = useLocation();
  const docId = useParams().id;
  // console.log(docId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { docId } = location.state || {}; // onDelete를 props로 받음
  // const post = locationPost;
  const { posts } = useSelector((state) => state.disasterSlice);
  const [post, setPost] = useState({}); // 초기 게시글 데이터 설정

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
    if (post.length > 0) {
      handlePostClick();
    }
    const selected = posts.find((item) => item.docId === docId);
    setPost(selected);
  }, [posts]);

  useEffect(() => {
    const updatedPost = location.state?.post;
    if (updatedPost) {
      setPost(updatedPost);
    }
  }, [location.state]);

  // 조회수
  useEffect(() => {
    if (post.docId) {
      handlePostClick();
    }
  }, [post]);

  if (!post) {
    return <p>Post data not available</p>;
  }
  return (
    <div className={styles.main}>
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
      <div className={styles.main_title}>
        <h2>{post.title}</h2>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom_title}>{post.summary}</div>
      </div>
    </div>
  );
}

export default DisasterLIstItem;
