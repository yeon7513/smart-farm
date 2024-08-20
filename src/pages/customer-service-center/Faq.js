import React, { useState } from "react";
import styles from "./Faq.module.scss";
import up from "../../../src/assets/arrow/up.png";
import down from "../../../src/assets/arrow/down.png";

function Faq() {
  // down 버튼을 누르면 description(내용)이 보이고
  // up 버튼을 누르면 description(내용)이 보이지 않게 됩니다.
  //   const [isVisible, setIsVisible] = useState(false);
  const [openId, setOpenId] = useState(null);

  // up, down버튼 클릭에 따라 description(내용)표시 여부를 변경합니다.
  const toggleVisibility = (id) => {
    // setIsVisible((prevState) => !prevState);
    setOpenId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div className={styles.page}>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>요새 농산물 값이 왜이리 비싼가요?</h3>
          {openId === 1 ? (
            <button onClick={() => toggleVisibility(1)}>
              <img src={down} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(1)}>
              <img src={up} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openId === 1 && (
          <div className={styles.description}>
            <h4>
              농산물 값이 비싸다고 생각되신다면 너가 직접 농사 지어서 수확해서
              드시면 됩니다.
            </h4>
          </div>
        )}
      </div>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>딸기가 먹고 싶어요.</h3>
          {openId === 2 ? (
            <button onClick={() => toggleVisibility(2)}>
              <img src={down} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(2)}>
              <img src={up} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openId === 2 && (
          <div className={styles.description}>
            <h4>
              너 돈으로 직접 사서 드시면 됩니다. 그리고 너가 딸기 먹고 싶은 거
              알빠노?
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Faq;
