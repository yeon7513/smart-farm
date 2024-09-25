import React from "react";
import styles from "./Writing.module.scss";
import { useNavigate } from "react-router-dom";
function Writing(props) {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleWriteClick = () => {
    navigate("/info/disaster/write");
  };
  return (
    <div className={styles.writing}>
      {loginUser?.nickname === "관리자" && (
        <button onClick={handleWriteClick}>글쓰기</button>
      )}
    </div>
  );
}

export default Writing;
