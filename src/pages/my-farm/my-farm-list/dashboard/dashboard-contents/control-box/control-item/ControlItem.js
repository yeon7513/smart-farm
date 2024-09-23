import React, { useState } from "react";
import styles from "./ControlItem.module.scss";
import { useSectorContext } from "../../../../../../../context/SectorContext";

function ControlItem({
  option,
  idx,
  onMoveComponent,
  state,
  handleDeleteItem,
}) {
  const { sector } = useSectorContext();
  console.log(sector);
  const handleControlContent = () => {
    onMoveComponent({
      option,
      idx,
      //  id: sector.id, docId: sector.docId
    });
  };
  return (
    <div className={styles.control}>
      <div className={styles.name}>
        <div>{option}</div>
      </div>
      <div>
        <div>제어 버튼들....</div>
      </div>
      <div className={styles.buttons}>
        {!state == true ? (
          <button onClick={handleControlContent}>
            <span>+</span>
          </button>
        ) : null}

        <button onClick={() => handleDeleteItem(option)}>
          <span>-</span>
        </button>
      </div>
    </div>
  );
}

export default ControlItem;
