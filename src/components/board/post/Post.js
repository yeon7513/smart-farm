import React, { useState } from "react";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";
import { useComponentContext } from "../../../context/ComponentContext";

function Post({ onSubmit, onClick }) {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const date = new Date().toISOString();

  const postDate = {
    title,
    user,
    content,
    date,
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>게시글 작성하기</h3>
      </div>
      <form>
        <div className={styles.title}>
          <p>제목:</p>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.content}>
          <p>내용:</p>{" "}
          <textarea
            type="text"
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <b>
          ※ 부적절한 콘텐츠가 포함될 경우 관리자에 의해 게시글이 삭제될 수
          있으며, 해당 아이디가 정지 처리될 수 있습니다.
        </b>
        <div className={styles.file}>
          <p>첨부:</p> <input type="file" />
        </div>

        <div className={styles.btn}>
          <div>
            <button type="submit" className={styles.sub}>
              작성완료
            </button>
            <button className={styles.delete} onClick={onClick}>
              취소하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Post;
