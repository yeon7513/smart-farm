import React, { useState } from "react";
import styles from "./DisasterPost.module.scss";
import { useNavigate } from "react-router-dom"; // For navigation after submission
import { addDatas } from "../../../../api/firebase";
import { useDispatch } from "react-redux";
import { fetchDisasterDatas } from "../../../../store/disaster/disasterSlice";

function DisasterPost(props) {
  const [values, setValues] = useState({
    title: "",
    summary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const disPath = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      ...values,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    console.log("Form submitted:", postData);

    try {
      //파이어베이스에 데이터 추가
      await addDatas("disasters", postData);
      disPath(fetchDisasterDatas("disasters")); //카테고리에 맞는게시글 데이터 가져옴.

      navigate("/info");
    } catch (error) {
      console.error("Error saving data: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  //취소버튼
  const handleCancel = () => {
    window.history.back();
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
            required
          />
        </div>
        <div className={styles.content}>
          <p>내용:</p>
          <textarea
            name="summary"
            placeholder="내용을 입력해주세요."
            value={values.summary}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.btn}>
          <div>
            <button
              type="submit"
              className={styles.sub}
              disabled={isSubmitting}
            >
              작성완료
            </button>
            <button
              type="button"
              className={styles.delete}
              onClick={handleCancel}
            >
              취소하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DisasterPost;
