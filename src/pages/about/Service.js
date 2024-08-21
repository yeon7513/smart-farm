import React, { useEffect, useRef, useState } from "react";
import styles from "./Service.module.scss";
import smtImg from "../../assets/abou/스마트팜.png";
import technology from "../../assets/abou/식4.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import UpButton from "../../components/up-button/UpButton";
import { core } from "../../lib/core";
import Container from "../../components/layout/container/Container";

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
          markers: true,
          toggleActions: "restart none none none",
        },
      });
    });
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
      {core.map((item, idx) => (
        <div
          className={styles.core_items}
          key={item.id}
          ref={(el) => (imgRef.current[idx + 2] = el)}
        >
          <Container className={styles.core_item}>
            <img src={item.image} />
            <div>
              <h2>{item.name}</h2>
              <p>{item.title}</p>
              <p>{item.detail}</p>
            </div>
          </Container>
        </div>
      ))}

      <UpButton />
      {/* <button onClick={scrollTotop} className={styles.btn}>
        up
      </button> */}
    </div>
  );
}

export default Service;
