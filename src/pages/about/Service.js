import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import hum1 from "../../assets/abou/사람1.png";
import hum2 from "../../assets/abou/사람2.png";
import hum3 from "../../assets/abou/사람3.png";
import hum4 from "../../assets/abou/사람4.png";
import smtImg from "../../assets/abou/스마트팜.png";
import technology from "../../assets/abou/식4.jpg";
import Container from "../../components/layout/container/Container";
import UpButton from "../../components/up-button/UpButton";
import { core } from "../../lib/core";
import styles from "./Service.module.scss";
import { systems } from "./system";
import SystemItem from "./system/SystemItem";
// import DashBoard from "../dashboard/DashBoard";

gsap.registerPlugin(ScrollTrigger);

function Service(props) {
  const imgRef = useRef([]);

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
          // markers: true,
          toggleActions: "restart none none none",
        },
      });
    });
  }, []);

  return (
    <div>
      <div className={styles.farm} ref={(el) => (imgRef.current[0] = el)}>
        <div className={styles.farm_img}>
          <img src={smtImg} alt="" />
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
        <div className={styles.technology_img}>
          {<img src={technology} alt="" />}
        </div>
        <div className={styles.core_title}>
          <h1>아이팜의 핵심가치</h1>
        </div>
      </div>
      {/* 핵심내용 */}
      {core.map((item, idx) => (
        <div
          className={styles.core_items}
          key={item.id}
          ref={(el) => (imgRef.current[idx + 2] = el)}
        >
          <Container className={styles.core_item}>
            <img src={item.image} alt="" />
            <div>
              <h2>{item.name}</h2>
              <p>{item.title}</p>
              <p>{item.detail}</p>
            </div>
          </Container>
        </div>
      ))}
      <UpButton />
      <div className={styles.peoples}>
        <div>
          <p>이런 고객님들께 </p>
          <p>아이팜의 솔루션을 추천드립니다.</p>
          <div className={styles.people_title}>
            <p>즐거운 농업,</p>
            <p>아이팜과 함께해요.</p>
          </div>
        </div>
        <div className={styles.people}>
          <div>
            <span>귀농희망자</span>
            <img src={hum1} alt="" />
          </div>
          <div>
            <span>농업종사자</span>
            <img src={hum2} alt="" />
          </div>
          <div>
            <span>정년은퇴자</span>
            <img src={hum3} alt="" />
          </div>
          <div>
            <span>부수입 희망자</span>
            <img src={hum4} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.system}>
        {/* <div> */}
        {systems.map((item) => (
          <SystemItem items={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Service;
