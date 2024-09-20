import React from "react";
import styles from "./ControlItem.module.scss";

function ControlItem({ option, idx, onMoveComponent }) {
  const handleControlContent = () => {
    // 현재 ControlItem의 데이터를 부모에게 전달
    onMoveComponent({ option, idx });
  };

  return (
    <div className={styles.control}>
      <div className={styles.name}>{option}</div>
      <button onClick={handleControlContent}>{idx + 1}</button>
      <div>제어 버튼들....</div>
    </div>
  );
}

export default ControlItem;
