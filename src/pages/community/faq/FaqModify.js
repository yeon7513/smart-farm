import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../api/firebase";
import styles from "./FaqModify.module.scss";

function FaqModify({ setIsEditing, onFaqUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchFaq = async () => {
      const faqRef = doc(db, "faq", id);
      const faqSnap = await getDoc(faqRef);
      if (faqSnap.exists()) {
        const data = faqSnap.data();
        setQuestion(data.question);
        setAnswer(data.answer);
      } else {
        console.log("No such document!");
      }
    };

    fetchFaq();
  }, [id]);

  // 수정한 내용을 적용하는 함수입니다.
  const handleUpdate = async () => {
    const faqRef = doc(db, "faq", id);
    console.log(faqRef);
    try {
      await updateDoc(faqRef, { question, answer });
      onFaqUpdate(id);
      setIsEditing(false);
      navigate(`/community`);
    } catch (error) {
      console.error("FAQ 수정 중 오류 발생: ", error);
    }
  };

  // FAQ 수정을 취소하는 함수입니다.
  const handleCancel = async () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>FAQ 수정하기</h3>
      </div>
      <div className={styles.question}>
        <p>question: </p>
        <input
          type="text"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className={styles.answer}>
        <p>answer:</p>
        <textarea
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button onClick={handleUpdate}>적용하기</button>
        <button onClick={handleCancel}>취소하기</button>
      </div>
    </div>
  );
}

export default FaqModify;
