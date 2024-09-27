import React, { useState } from "react";
import styles from "./FaqAdd.module.scss";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../api/firebase";

function FaqAdd({ setIsWriting, onFaqAdd }) {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // 작성한 FAQ를 저장하는 함수입니다.
  const handleAdd = async () => {
    if (question.trim() === "" || answer.trim() === "") {
      console.log("질문과 답변은 빈 칸으로 두실 수 없습니다.");
      return;
    }
    console.log(question, answer);

    const newFaq = {
      question,
      answer,
      likes: 0,
      views: 0,
      liked: false,
    };

    // Firebase에 새로운 FAQ를 추가합니다.
    try {
      const docRef = await addDoc(collection(db, "faq"), newFaq);
      console.log(docRef, newFaq);

      // 추가된 FAQ를 포함하여 전체 FAQ를 업데이트 합니다.
      onFaqAdd({ id: docRef.id, ...newFaq });

      // 입력 필드 초기화
      setQuestion("");
      setAnswer("");
      setIsWriting(false);
    } catch (error) {
      console.error("FAQ 추가 중 오류가 발생했습니다. ", error);
    }
  };

  // FAQ 작성을 취소하는 함수입니다.
  const handleCancel = async () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>FAQ 작성하기</h3>
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
        <button onClick={handleAdd}>작성하기</button>
        <button onClick={handleCancel}>취소하기</button>
      </div>
    </div>
  );
}

export default FaqAdd;
