import React, { useState } from "react";
import styles from "./Post.module.scss";
import { addBoardDatas } from "../../../api/firebase/board";
import { getAuth } from "firebase/auth";
import { getUserAuth } from "../../../api/firebase";

const loginUser = JSON.parse(localStorage.getItem("user"));

const INITIAL_VALUE = {
  title: "",
  userId: loginUser.nick,
  count: 0,
  summary: "",
  imgUrl: null,
  createAt: new Date().toISOString(),
};

function Post({ onClick, category, onSubmit, initialValue = INITIAL_VALUE }) {
  const [values, setValues] = useState(initialValue);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addBoardDatas(category, values);
    onSubmit(result);
    setValues(INITIAL_VALUE);
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>게시글 작성하기</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <p>제목:</p>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.content}>
          <p>내용:</p>
          <textarea
            name="summary"
            placeholder="내용을 입력해주세요."
            value={values.summary}
            onChange={handleChange}
          />
        </div>
        <b>
          ※ 부적절한 콘텐츠가 포함될 경우 관리자에 의해 게시글이 삭제될 수
          있으며, 해당 아이디가 정지 처리될 수 있습니다.
        </b>
        <div className={styles.file}>
          <p>첨부:</p> <input type="file" onChange={handleFileChange} />
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
