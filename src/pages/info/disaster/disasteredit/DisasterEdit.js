import React, { useEffect, useState } from "react";
import styles from "./DisasterEdit.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateDisasterDatas } from "../../../../store/disaster/disasterSlice";

function DisasterEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { post } = location.state || {}; // 게시글 데이터 가져오기
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
    } else {
      navigate("/info/");
    }
  }, [post, navigate]);

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  // 내용 변경
  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };
  // 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateObj = {
      title,
      summary,
    };
    try {
      dispatch(
        updateDisasterDatas({
          category: "disasters",
          docId: post.docId,
          updateObj,
        })
      );
      navigate(`/info/disaster/${post.docId}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error("게시글 수정 오류:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>게시글 수정하기</h3>
      </div>
      <div className={styles.title}>
        <p>제목:</p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className={styles.content}>
        <p>내용:</p>
        <textarea
          name="summary"
          value={summary}
          onChange={handleSummaryChange}
        />
      </div>
      <b>
        {/* ※ 부적절한 콘텐츠가 포함될 경우 관리자에 의해 게시글이 삭제될 수 있으며,
          해당 아이디가 정지 처리될 수 있습니다. */}
      </b>

      <div className={styles.btn}>
        <div>
          <button type="submit" className={styles.sub} onClick={handleSubmit}>
            수정 완료
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisasterEdit;
