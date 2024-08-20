import React, { useState } from "react";
import styles from "./CustomerServiceCenter.module.scss";
import up from "../../../src/assets/arrow/up.png";
import down from "../../../src/assets/arrow/down.png";

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
            <button onClick={toggleVisibility}>
              <img src={down} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={toggleVisibility}>
              <img src={up} alt="간략히 보기" />
            </button>
          )}
        </div>
        {isVisible && (
          <div className={styles.description}>
            <h4>됬은 없는 단어입니다. 됀은 없는 단어입니다.</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerServiceCenter;
