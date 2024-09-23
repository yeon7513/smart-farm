import React from "react";
import styles from "./Writing.module.scss";
import AsPost from "../../../../components/board/asBoard/AsPost";
import { useNavigate } from "react-router-dom";
function Writing(props) {
  const navigate = useNavigate();
  const handleWriteClick = () => {
    navigate("/info/disaster/write");
  };
  return (
    <div className={styles.writing}>
      <button onClick={handleWriteClick}>글쓰기</button>
    </div>
  );
}

export default Writing;
