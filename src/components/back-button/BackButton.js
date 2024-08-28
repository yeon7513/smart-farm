import React from "react";
import styles from "./BackButton.module.scss";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function BackButton(props) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    // 뒤로가기 버튼
    <div className={styles.back}>
      <button onClick={goBack}>
        <RiArrowGoBackLine />
      </button>
      <div>
        <p>뒤로가기</p>
      </div>
    </div>
  );
}

export default BackButton;
