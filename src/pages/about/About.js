import React, { useEffect, useRef, useState } from "react";
import prairie from "../../assets/abou/식1.jpg";
import plant1 from "../../assets/abou/식2.png";
import plant2 from "../../assets/abou/식3.jpg";
import styles from "./About.module.scss";
import gsap from "gsap";

function About() {
  const textRef = useRef(null);
  const textRe = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    );
    gsap.fromTo(
      textRe.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    );
  }, []);

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.main_img}>
          <img src={prairie} />
        </div>
        <div className={styles.main_title}>
          <h1 ref={textRe}>아이팜</h1>
          <p ref={textRef}>
            아이팜(iFarm)은 AI와 IoT기반의 첨단 농업 기술을 통해 스마트한 농업
            환경을 제공하고 있으며, 농업자동화 시스템,데이터 분석기술 등
            혁신적인 친환경 솔루션을 결합하여 농부들이 보다 생산적이고 안정적인
            농업을 실현할 수 있도록 돕고있습니다.
          </p>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.vision}>
          <div className={styles.vision_title}>
            <h2>비전</h2>
            <h4>VISION</h4>
            <div>
              아이팜은 혁신적인 기술과 솔루션으로 다양한 시장에서 가장 앞서가
              세계농업을 대표하는
              <span>NO.1</span> 기업으로 성장해나가겠습니다.
            </div>
          </div>
          <div className={styles.img}>
            <img src={plant1} />
          </div>
        </div>
        <div className={styles.mission}>
          <div className={styles.img}>
            <img src={plant2} />
          </div>
          <div className={styles.mission_title}>
            <h2>미션</h2>
            <h4>MISSION</h4>
            <div>
              기후변화가 심해도 어디에서나 신선한 먹거리를 생산 할 수 있도록
              한다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
