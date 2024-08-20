import React, { useState } from "react";
import styles from "./CustomerServiceCenter.module.scss";

function CustomerServiceCenter() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>제?목</h3>
          {!isVisible ? (
            <button onClick={toggleVisibility}>화살표 아래 버튼</button>
          ) : (
            <button onClick={toggleVisibility}>화살표 위 버튼</button>
          )}
        </div>
        {isVisible && (
          <div className={styles.description}>
            <h4>내?용</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerServiceCenter;
