import React, { useState } from "react";
import down from "../../../src/assets/arrow/down.png";
import up from "../../../src/assets/arrow/up.png";
import Title from "../../components/layout/title/Title";
import { faq } from "../../lib/intro";
import styles from "./Faq.module.scss";

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
      <Title {...faq} />
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
          <h3>스마트농업은 왜 필요한가요?</h3>
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
              스마트농업은 지속 가능한 농업을 실현하는 방법 중 하나입니다. 현재
              농업은 기후변화, 고령화, 농촌소멸 등으로 어려움을 겪고 있습니다.
              로봇, 드론, 자율주행 등 자동화 기술을 도입하면 한층 편리하게
              농작업을 할 수 있고, 작물 생산성을 높일 수 있습니다.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Faq;
