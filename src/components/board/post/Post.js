import React, { useState } from "react";
import styles from "./Post.module.scss";
import { addBoardDatas } from "../../../api/firebase/board";

function Post({ onClick, category, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  // const handleSubmit = async () => {
  //   const submit = await addBoardDatas(category);
  //   setPosting(submit)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct data object
    const dataObj = {
      title,
      content,
      imgUrl: file ? file.name : null, // Assign a unique path for the image
      userId: "currentUser", // Replace with actual user ID
      count: 0,
    };

    // Call Firebase function to add data
    const result = await addBoardDatas(category, dataObj);

    if (result) {
      onSubmit(result); // Update parent component with new post
    } else {
      alert("글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>게시글 작성하기</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <p>제목:</p>
          <input type="text" placeholder="제목을 입력해주세요." />
        </div>
        <div className={styles.content}>
          <p>내용:</p>{" "}
          <textarea type="text" placeholder="내용을 입력해주세요." />
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
