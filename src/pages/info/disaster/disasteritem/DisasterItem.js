import React, { useState } from "react";
import styles from "./DisasterItem.module.scss";
import disasterText from "./DisasterText";

function DisasterItem(props) {
  const [selectedDisaster, setSelectedDisaster] = useState(disasterText[0]);

  const handleButtonClick = (disaster) => {
    setSelectedDisaster(disaster);
  };
  return (
    <div className={styles.main}>
      <div className={styles.button_items}>
        {disasterText.map((item) => (
          <button
            className={`${styles.button_item} ${
              selectedDisaster.id === item.id ? styles.active : ""
            }`}
            key={item.id}
            onClick={() => handleButtonClick(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.measures}>
        <div className={styles.measures_title}>
          <h1>{selectedDisaster.name}</h1>
          <img src={selectedDisaster.images} alt={selectedDisaster.name} />
        </div>
        <div className={styles.selected}>
          {/* 예방법&조치 */}
          <div className={styles.measures_item}>
            <h2>{selectedDisaster.title1}</h2>
            <ul>
              {selectedDisaster.prevention.map((preventionItem, index) => (
                <li key={index}>{preventionItem.desc}</li>
              ))}
            </ul>
          </div>
          <div className={styles.measures_item}>
            <h2>{selectedDisaster.title2}</h2>
            <ul>
              {selectedDisaster.measures.map((measuresItem, idx) => (
                <li key={idx}>{measuresItem.desc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisasterItem;
