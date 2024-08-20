import { Container } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { RiScrollToBottomLine } from "react-icons/ri";
import contentImg from "./content.jpg";

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
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className="mainText">
          <h1>아이팜</h1>
          <p>ICT와 접목한 농장을 만듭니다.</p>
        </div>
        <RiScrollToBottomLine className={styles.scroll} />
      </div>
      <div className={styles.content_one}>
        <div>
          <h1>스마트팜이란</h1>
          <p>
            비닐하우스·유리온실·축사 등에 ICT를 접목하여
            <br />
            원격·자동으로 작물과 가축의 생육환경을
            <br />
            적정하게 유지·관리할 수 있는 농장
          </p>
        </div>
        <img src={contentImg} />
      </div>
      <div className={styles.content_two}>
        <h1>아이팜은 000을 만듭니다.</h1>
        {/* 배경이미지 삽입 (슬라이드 사용 고려) */}
      </div>
      <div className={styles.content_three}>
        <h1>아이팜만의 차별화된 시스템을 만나보세요.</h1>
        {/* 휴대폰에 서비스화면 구축된 이미지 삽입 */}
      </div>
      <div className={styles.case}>
        <p>구축사례 만나보기</p>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.estimate}>
        <p>견적 요청하기</p>
        <button>견적요청</button>
        <button>견적문의</button>
        {/* 배경이미지 삽입 */}
      </div>
    </div>
  );
}

export default Home;
