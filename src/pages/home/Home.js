import { Container } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import gsap from "gsap";

function Home() {
  useEffect(() => {
    gsap.to(".mainText", {
      scrollTrigger: {
        trigger: ".mainText",
        start: "top 80%",
        end: "top 0%",
        scrub: true,
      },
      opacity: 0,
      duration: 3,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className="mainText">
          <h1>아이팜</h1>
          <p>ICT와 접목한 농장을 만듭니다.</p>
          <button>scroll Down</button>
        </div>
      </div>
      <div className={styles.one}>
        <div>
          <h1>스마트팜이란</h1>
          <p>설명</p>
        </div>
      </div>
      <div className={styles.two}>
        <h1>아이팜은 000을 만듭니다.</h1>
      </div>
      <div className={styles.three}>
        <h1>아이팜만의 차별화된 시스템을 만나보세요.</h1>
      </div>
      <div className={styles.content}>
        <p>구축사례 만나보기</p>
      </div>
      <div className={styles.btn}>
        <p>견적 요청하기</p>
        <button>견적요청</button>
        <button>견적문의</button>
      </div>
    </div>
  );
}

export default Home;
