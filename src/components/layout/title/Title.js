import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styles from './Title.module.scss';

function Title({ title, desc, imgUrl }) {
  const textRef = useRef(null);
  const textRe = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
    gsap.fromTo(
      textRe.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.main_img}>
        <img src={imgUrl} alt="" />
      </div>
      <div className={styles.main_title}>
        <h1 ref={textRe}>{title}</h1>
        <p ref={textRef}>{desc}</p>
      </div>
    </div>
  );
}

export default Title;
