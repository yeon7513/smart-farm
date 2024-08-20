import { Container } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { RiScrollToBottomLine } from "react-icons/ri";
import contentImg from "../../assets/main/content2.jpg";

gsap.registerPlugin(ScrollTrigger);
function Home() {
  useEffect(() => {
    gsap.to(".mainText", {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".mainText",
        start: "top 100px",
        end: "top 100%",
        scrub: 1,
        // markers: true,
      },
    });
    gsap.to(".scroll", {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".scroll",
        start: "top 90%",
        end: "top 100%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className="mainText">
          <h1>아이팜</h1>
          <p>ICT와 접목한 농장을 만듭니다.</p>
        </div>
        <RiScrollToBottomLine className={`scroll ${styles.scroll}`} />
      </div>

      <div className={styles.content_one}>
        <div>
          <h1>스마트팜이란?</h1>
          <br />
          <p>
            정보통신기술(ICT)을 활용해 원격·자동으로
            <br />
            '시간과 공간의 제약 없이'
            <br />
            농장을 관측하고 최적의 상태로 관리하는 과학 기반의 농업방식
          </p>
        </div>
        {/* <img src={contentImg} /> */}
      </div>

      <div className={styles.content_two}>
        <h1>아이팜은 000을 만듭니다.</h1>
        {/* 배경이미지 삽입 (슬라이드 사용 고려) */}
      </div>

      <div className={styles.content_three}>
        <h1>아이팜만의 차별화된 시스템을 만나보세요.</h1>
        {/* 휴대폰에 서비스화면 구축된 이미지 삽입 */}
      </div>

      <div>
        <p>스마트팜 이용현황</p>
        <div>지역별(지도)</div>
        <p>게시판</p>
        <div>공지사항</div>
        <div>견적 요청</div>
      </div>

      <div className={styles.case}>
        <p>구축사례 만나보기</p>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
