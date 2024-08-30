import { Container } from "@mui/material";
import React, { useState } from "react";
import down from "../../../../src/assets/arrow/down.png";
import up from "../../../../src/assets/arrow/up.png";
import styles from "./Faq.module.scss";
import { FcLike } from "react-icons/fc";

function Faq() {
  const [openId, setOpenId] = useState(null);
  const [like, setLike] = useState(false);

  const toggleVisibility = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const toggleLike = (id) => {
    setLike((prevLike) => (prevLike === id ? true : false));
  };

  return (
    <div className={styles.page}>
      <h1>FAQ</h1>
      <p>- 자주 묻는 질문을 확인해보세요 !</p>

      <Container className={styles.container}>
        <div className={styles.faq}>
          <div className={styles.title}>
            <h3> Q. 스마트팜이 뭔가요?</h3>
            {openId === 1 ? (
              <button onClick={() => toggleVisibility(1)}>
                <img src={up} alt="자세히 보기" />
              </button>
            ) : (
              <button onClick={() => toggleVisibility(1)}>
                <img src={down} alt="간략히 보기" />
              </button>
            )}
          </div>
          {openId === 1 && (
            <div className={styles.description}>
              <h4>
                A. 스마트팜은 센서, 정보통신기술, 기기제어, 빅데이터 등으로
                복합환경제어를 자동으로 할 수 있는 시설농업기술입니다.
                <br />
                즉, 스마트 농업이 농업 전체를 의미한다면 스마트팜은
                시설농업기술을 뜻합니다.
              </h4>
              {/* 좋아요 수를 누적하는 기능을 추가합니다.
                  이 때, uid가 없는 비로그인 회원은 좋아요를 누를 수 없음. 
                  좋아요는 uid당 한 번만 누를 수 있음.
                  누른 좋아요는 언제든 취소할 수 있고, 다시 누를 수 있음.
                  조회수는 uid 유무에 상관없이 클릭할 때마다 1씩 올라갑니다. */}
              <div className={styles.likes}>
                <button onClick={() => toggleLike()}>
                  {like === true ? (
                    <FcLike color={"purple"} size={"24px"} />
                  ) : (
                    <FcLike color={"white"} size={"24px"} />
                  )}
                  좋아요: 0
                </button>
                <h5>조회수: 0</h5>
              </div>
            </div>
          )}
        </div>

        <div className={styles.faq}>
          <div className={styles.title}>
            <h3>Q. 스마트농업은 왜 필요한가요?</h3>
            {openId === 2 ? (
              <button onClick={() => toggleVisibility(2)}>
                <img src={up} alt="자세히 보기" />
              </button>
            ) : (
              <button onClick={() => toggleVisibility(2)}>
                <img src={down} alt="간략히 보기" />
              </button>
            )}
          </div>
          {openId === 2 && (
            <div className={styles.description}>
              <h4>
                A. 스마트농업은 지속 가능한 농업을 실현하는 방법 중 하나입니다.
                현재 농업은 기후변화, 고령화, 농촌소멸 등으로 어려움을 겪고
                있습니다.
                <br />
                로봇, 드론, 자율주행 등 자동화 기술을 도입하면 한층 편리하게
                농작업을 할 수 있고, 작물 생산성을 높일 수 있습니다.
              </h4>
            </div>
          )}
        </div>

        <div className={styles.faq}>
          <div className={styles.title}>
            <h3>Q. 대표적인 우리나라 스마트농업 기술을 소개해주세요.</h3>
            {openId === 3 ? (
              <button onClick={() => toggleVisibility(3)}>
                <img src={up} alt="자세히 보기" />
              </button>
            ) : (
              <button onClick={() => toggleVisibility(3)}>
                <img src={down} alt="간략히 보기" />
              </button>
            )}
          </div>
          {openId === 3 && (
            <div className={styles.description}>
              <h4>
                A. 3세대 스마트팜 기술을 적용한 스마트 온실 방제 로봇이
                있습니다.
                <br />
                방제로봇은 8시간 이상 연속 운전이 가능하고, 300L 약액통을 장착해
                1회 0.33ha를 방제할 수 있습니다.
                <br />
                또한 마그네틱, 근접 센서, 광학 검출기 등을 사용해 계획된 경로를
                따라 자율주행할 수 있도록 설정했습니다.
                <br />
                이와 함께 작업자가 직접 기계를 다루지 않아도 지형 환경을 인식해
                스스로 주행하며 농작업이 가능한 자율주행 트랙터를 비롯해
                자율주행 벼 이앙기, 로봇 착유기 국산화 등 스마트농업 기술이
                개발되었습니다.
                <br />
                현재 방제 로봇은 토마토농장에서 현장실증 중이며, 자율주행 트랙터
                등은 현장 보급을 위해 노력하고 있습니다.
              </h4>
            </div>
          )}
        </div>

        <div className={styles.faq}>
          <div className={styles.title}>
            <h3>Q. 스마트농업 기술을 도입했을 시 어떤 효과가 있었나요?</h3>
            {openId === 4 ? (
              <button onClick={() => toggleVisibility(4)}>
                <img src={up} alt="자세히 보기" />
              </button>
            ) : (
              <button onClick={() => toggleVisibility(4)}>
                <img src={down} alt="간략히 보기" />
              </button>
            )}
          </div>
          {openId === 4 && (
            <div className={styles.description}>
              <h4>
                A. 스마트팜을 설치하여 온실 환경, 생육, 생산량 데이터를 수집한
                결과,
                <br />
                생산성이 토마토 농장은 13.7%, 딸기 농장은 30% 높아졌습니다.
                <br />
                또한 자율주행 벼 이앙기를 사용하면 노동력을 50% 가량 줄일 수
                있습니다.
                <br />
                드론으로 방제할 경우 노동력은 87%, 농약이 날아서 흩어지는 양은
                30% 가량 줄어든 것으로 나타났습니다.
                <br />
                그동안 해외에서 수입해 온 로봇 착유기는 국산화에 성공함으로써
                외국산 대비 설치비를 60% 줄이는 효과를 냈습니다.
              </h4>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Faq;
