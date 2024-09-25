import React, { useEffect, useState } from "react";
import styles from "./DisasterListItem.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementViewCount } from "../../../../../api/disaster";
import { deleteDisasterDatas } from "../../../../../store/disaster/disasterSlice";
import { CgDetailsMore } from "react-icons/cg";

function DisasterListItem() {
  const location = useLocation();
  const docId = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);
  const [post, setPost] = useState(() => {
    const savedPost = sessionStorage.getItem("post");
    return savedPost ? JSON.parse(savedPost) : null; // 세션 스토리지에서 데이터 로드
  });
  const [isEditing, setIsEditing] = useState(false); //수정 모드 상태 추가
  const loginUser = JSON.parse(localStorage.getItem("user"));

  // 게시글 삭제 처리
  const handleDelete = () => {
    if (post) {
      dispatch(deleteDisasterDatas(post.docId))
        .unwrap()
        .then(() => {
          sessionStorage.removeItem("post"); // 삭제 후 세션 스토리지에서 데이터 제거
          navigate("/info/");
        })
        .catch((error) => {
          console.error("게시글 삭제 오류:", error);
        });
    }
  };

  // 수정 버튼
  const handleEdit = () => {
    if (post) {
      setIsEditing(true);
      navigate(`/info/disaster/edit/${post.docId}`, { state: { post } });
    } else {
      console.error("Post data is not available.");
    }
  };

  // 조회수 증가
  const handlePostClick = async () => {
    if (post && !isEditing) {
      try {
        await incrementViewCount("disasters", post.docId);
      } catch (error) {
        console.error("조회수 증가 오류: ", error);
      }
    }
  };

  // 목록
  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const selected = posts.find((item) => item.docId === docId);
    if (selected) {
      setPost(selected);
      sessionStorage.setItem("post", JSON.stringify(selected)); // 데이터 저장
      if (!isEditing) {
        handlePostClick();
      } else {
        setIsEditing(false);
      }
    }
  }, [posts, docId, isEditing]);

  useEffect(() => {
    const updatedPost = location.state?.post;
    if (updatedPost) {
      setPost(updatedPost);
      sessionStorage.setItem("post", JSON.stringify(updatedPost)); // 업데이트된 데이터 저장
      handlePostClick();
    }
  }, [location.state]);

  if (!post) {
    return <p>게시글 데이터가 없습니다.</p>; // 데이터가 없을 때 표시
  }

  return (
    <div className={styles.main}>
      <div className={styles.written}>
        <div className={styles.written_name}>
          <p>작성자: 관리자</p>
        </div>
        <div className={styles.written_data}>
          <p>작성일: {post.createdAt}</p>
        </div>
        <div>
          <p>조회수: {post.view || 0}</p>
        </div>
        <div className={styles.btn}>
          {loginUser?.nickname === "관리자" && (
            <>
              <div className={styles.written_btn}>
                <button onClick={handleEdit}>수정</button>
              </div>
              <div className={styles.written_btn}>
                <button onClick={handleDelete}>삭제</button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.main_text}>
        <div className={styles.main_title}>
          <h2>{post.title}</h2>
        </div>
        <div className={styles.bottom}>
          <div
            className={styles.bottom_title}
            dangerouslySetInnerHTML={{
              __html: post.summary.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </div>
      <div className={styles.inventory}>
        <button onClick={handleBackClick}>
          <CgDetailsMore />
          목록으로
        </button>
      </div>
    </div>
  );
}

export default DisasterListItem;
