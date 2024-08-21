import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';
import { RiScrollToBottomLine } from 'react-icons/ri';
import threeImg from '../../assets/main/content0.png';
import mapImg from '../../assets/main/map.png';
import styles from './Home.module.scss';
import MainSlide from './slide/MainSlide';

gsap.registerPlugin(ScrollTrigger);
function Home() {
  useEffect(() => {
    gsap.to('.mainText', {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.mainText',
        start: 'top 100px',
        end: 'top 100%',
        scrub: 1,
        // markers: true,
      },
    });
    gsap.to('.scroll', {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.scroll',
        start: 'top 90%',
        end: 'top 100%',
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
        <div></div>
      </div>

      <div className={styles.content_two}>
        <MainSlide />
        <h1>아이팜은 농장의 융통성을 만듭니다.</h1>
      </div>

      <div className={styles.content_three}>
        <h1>아이팜만의 차별화된 시스템을 만나보세요.</h1>
        <img src={threeImg} />
      </div>
      {/* 아래 지도와 서비스 이용을 휴대폰 화면 안에 담아 총 3개의 휴대폰을 나열하는 것도 나쁘지 않을 듯 */}
      <div className={styles.service}>
        <section>
          <h3>스마트팜 이용현황</h3>
          <img src={mapImg} />
        </section>
        <section>
          <h3>서비스 이용</h3>
          <p>시뮬레이션</p>
          <div>네모박스</div>
          <p>견적 요청</p>
          <div>네모박스</div>
        </section>
      </div>

      <div className={styles.case_container}>
        <p>구축사례 만나보기</p>
        <div className={styles.case}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
