import React from "react";
import styles from "./DisasterItem.module.scss";

const buttonItem = [
  {
    id: 1,
    name: "호우",
  },
  {
    id: 2,
    name: "폭염",
  },
  {
    id: 3,
    name: "가뭄",
  },
  {
    id: 4,
    name: "태풍",
  },
  {
    id: 5,
    name: "대설",
  },
  {
    id: 6,
    name: "한파",
  },
  {
    id: 7,
    name: "지진",
  },
  {
    id: 8,
    name: "야생동물",
  },
];

function DisasterItem(props) {
  return (
    <div className={styles.main}>
      <div className={styles.button_items}>
        {buttonItem.map((item, idx) => (
          <button item={item} key={idx} className={styles.button_item}>
            {item.name}
          </button>
        ))}
      </div>

      <div className={styles.measures}>
        <div></div>
      </div>
    </div>
  );
}

export default DisasterItem;
