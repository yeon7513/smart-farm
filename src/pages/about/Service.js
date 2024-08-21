import React, { useEffect, useRef, useState } from "react";
import styles from "./Service.module.scss";
import smtImg from "../../assets/abou/스마트팜.png";
import technology from "../../assets/abou/식4.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import agriculture from "../../assets/abou/농업관리.png";
import date from "../../assets/abou/데이터2.jpeg";

gsap.registerPlugin(ScrollTrigger);

function Service(props) {
  const imgRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scroll > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollTotop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    imgRef.current.forEach((technology_img, index) => {
      gsap.from(technology_img, {
        opacity: 0,
        y: -50,
        duration: 1,
        scrollTrigger: {
          trigger: technology_img,
          start: "top 100%", // 스크롤 위치 설정
          end: "top 100%",
          markers: true,
          toggleActions: "restart none none none",
        },
      });
    });
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className={styles.farm} ref={(el) => (imgRef.current[0] = el)}>
        <div className={styles.farm_img}>
          <img src={smtImg} />
        </div>
        <div className={styles.farm_title}>
          <h2>
            <span>스마트팜</span>
            이란?
          </h2>
          <p>
            농업기술에 정보통신기술 (ICT)을 접목해 과수원, 비닐하우스 등에서
            스마트폰, PC등 IT기기를 통해 작물의 생육 환경을 적정하게
            원격제어하고 빅데이터를 기반으로 최적의 환경을 유지하는 농장이다.
          </p>
        </div>
      </div>
      <div className={styles.core} ref={(el) => (imgRef.current[1] = el)}>
        <div className={styles.technology_img}>{<img src={technology} />}</div>
        <div>
          <h1>아이팜의 핵심가치</h1>
        </div>
      </div>
      {/* 핵심내용 */}
      <div className={styles.core_item} ref={(el) => (imgRef.current[2] = el)}>
        <img src={agriculture} />
        <div>
          <h2>효율적인 농업관리</h2>
          <p>AI 와 IOT로 최적의 재배 환경을 자동으로 유지한다.</p>
          <p>시간과 비용을 절약하며, 농업생산성을 극대화 시킨다.</p>
        </div>
      </div>
      <div className={styles.core_item1} ref={(el) => (imgRef.current[3] = el)}>
        <img src={date} />
        <div>
          <h2>데이터 기반 의사결정</h2>
          <p>수집된 데이터를 분석해 생산성을 극대화</p>
        </div>
      </div>
      <div className={styles.core_item} ref={(el) => (imgRef.current[4] = el)}>
        <img src={agriculture} />
        <div>
          <h2>친환경 및 지속가능성</h2>
          <p>자원을 절약하며 환경에 미치는 영향 최소화.</p>
        </div>
      </div>
      <div className={styles.core_item} ref={(el) => (imgRef.current[5] = el)}>
        <img src={agriculture} />
        <div>
          <h2>사용자 친화적인 플랫폼</h2>
          <p>누구나 간편하게 스마트 농업 도입 가능.</p>
        </div>
      </div>
      <div className={styles.core_item} ref={(el) => (imgRef.current[6] = el)}>
        <img src={agriculture} />
        <div>
          <h2>맞춤형 솔루션 제공</h2>
          <p>농장 특성에 맞춘 최적의 재배 전략 제공.</p>
        </div>
      </div>
      <button onClick={scrollTotop} className={styles.btn}>
        up
      </button>
    </div>
  );
}

export default Service;
