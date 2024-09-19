import React from "react";
import styles from "./ControlItem.module.scss";
import { useComponentContext } from "../../../../../../../context/ComponentContext";
import { useNavigate } from "react-router-dom";

function ControlItem({ option, idx, onMoveComponent }) {
  const { currComp, setCurrComp } = useComponentContext();

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
