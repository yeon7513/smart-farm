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
          <h3>스마트팜이 뭔가요?</h3>
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
              스마트팜은 센서, 정보통신기술, 기기제어, 빅데이터 등으로
              복합환경제어를 자동으로 할 수 있는 시설농업기술입니다. 즉,
              스마트농업이 농업 전체를 의미한다면 스마트팜은 시설농업기술을
              뜻합니다.
            </h4>
          </div>
        )}
      </div>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>비용은 어떻게 되나요?</h3>
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
              스마트팜은 시설을 갖추는 비용이 돈이 많이 들지만 관행농업보다 좋은
              품질의 농산물을 30~50% 정도 더 많이 수확할 수 있고, 7년만 고생하면
              초기 투자에 들어간 빚을 모두 갚을 수 있습니다.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Faq;
