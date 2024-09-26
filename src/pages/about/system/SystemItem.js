import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef } from 'react';
import styles from './SystemItem.module.scss';

gsap.registerPlugin(ScrollTrigger);
function SystemItem({ items }) {
  const imgRef = useRef([]);
  useEffect(() => {
    imgRef.current.forEach((system) => {
      gsap.from(system, {
        opacity: 0,
        x: 100,
        duration: 1,
        scrollTrigger: {
          trigger: system,
          start: 'top 100%', // 스크롤 위치 설정
          end: 'top 100%',
          // markers: true, // 스크롤 위치 화면에서 확인 가능. 사용 후 꼭 주석처리 해주세요.
          toggleActions: 'restart none none none',
        },
      });
    });
  }, []);
  const { name, title, images } = items;
  return (
    <div className={styles.system} ref={(el) => (imgRef.current[0] = el)}>
      <div>
        <img src={images} className={styles.slideIn} alt="" />
      </div>
      <div>
        <h3>{name}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default SystemItem;
