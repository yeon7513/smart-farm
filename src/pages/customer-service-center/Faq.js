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
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>스마트농업 기술을 도입했을 시 어떤 효과가 있었나요??</h3>
          {openId === 3 ? (
            <button onClick={() => toggleVisibility(2)}>
              <img src={down} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(2)}>
              <img src={up} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openId === 3 && (
          <div className={styles.description}>
            <h4>
              스마트팜을 설치하여 온실 환경, 생육, 생산량 데이터를 수집한 결과,
              생산성이 토마토 농장은 13.7%, 딸기 농장은 30% 높아졌습니다. 또한
              자율주행 벼 이앙기를 사용하면 노동력을 50% 가량 줄일 수 있습니다.
              드론으로 방제할 경우 노동력은 87%, 농약이 날아서 흩어지는 양은 30%
              가량 줄어든 것으로 나타났습니다. 그동안 해외에서 수입해 온 로봇
              착유기는 국산화에 성공함으로써 외국산 대비 설치비를 60% 줄이는
              효과를 냈습니다.
            </h4>
          </div>
        )}
      </div>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>앞으로 어떤 스마트농업 기술을 만나볼 수 있을까요?</h3>
          {openId === 4 ? (
            <button onClick={() => toggleVisibility(2)}>
              <img src={down} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(2)}>
              <img src={up} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openId === 4 && (
          <div className={styles.description}>
            <h4>
              현재 수확·운반 로봇, 과수원 농약방제 로봇, 제초 로봇, 가축분뇨
              청소 로봇 등을 개발하고 있습니다. 무인자율작업인 레벨4 수준으로
              발전하기 위해 자율주행 기술 고도화, 노지 데이터 수집, 지능형
              농작업기계 개발 등 스마트농업 기술 실현에 최선을 다할 계획입니다.
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Faq;
