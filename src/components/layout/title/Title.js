import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import Container from '../container/Container';
import styles from './Title.module.scss';

function Title({ title, desc, imgUrl }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className={styles.title}>
      <div className={styles.bg}>
        <img src={imgUrl} alt="" />
      </div>
      <Container className={styles.content}>
        <h2 ref={titleRef}>{title}</h2>
        <p ref={descRef}>{desc}</p>
      </Container>
    </div>
  );
}

export default Title;
