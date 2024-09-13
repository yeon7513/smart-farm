import React from "react";
import styles from "./DisasterItem.module.scss";

const buttonItem = [
  {
    id: 1,
    name: "호우",
    // title:
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
    title1: "한파 예방법",
    title2: "한파 사후조치",
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
        <div>
          <h2>호우</h2>
        </div>
        <div>
          {/* 예방법&조치 */}
          <div>
            <div className={styles.measures_item}>
              <ul>
                <h2>예방법</h2>
                <li>
                  <span>작물피복</span> :fffff
                </li>
                <li>관리</li>
                <li>영양</li>
              </ul>
            </div>
          </div>
          <div className={styles.measures_item}>
            <ul>
              <h2>예방법</h2>
              <li>작물피복 :fffff</li>
              <li>관리</li>
              <li>영양</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisasterItem;
