import React, { useState } from "react";
import styles from "./DisasterPost.module.scss";
import { useNavigate } from "react-router-dom"; // For navigation after submission
import { addDatas, getDatas } from "../../../../api/firebase";

function DisasterPost(props) {
  const [values, setValues] = useState({
    title: "",
    summary: "",
  });
  const [file, setFile] = useState(null); //
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form input change
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
    console.log("File attached:", file);

    try {
      await addDatas("disasters", postData);
      const posts = await getDatas("disasters");
      console.log(posts);

      navigate("/info");
    } catch (error) {
      console.error("Error saving data: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
