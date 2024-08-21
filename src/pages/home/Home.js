<<<<<<< HEAD
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { RiScrollToBottomLine } from "react-icons/ri";
import MainSlide from "./slide/MainSlide";
import phoneImg from "../../assets/main/phone.png";
import mapImg from "../../assets/main/map2.jpg";
// import caseImg from "../../assets/main/strawberry.jpg";
import chartImg from "../../assets/main/chart.png";
=======
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';
import { RiScrollToBottomLine } from 'react-icons/ri';
import threeImg from '../../assets/main/content0.png';
import mapImg from '../../assets/main/map.png';
import styles from './Home.module.scss';
import MainSlide from './slide/MainSlide';
>>>>>>> f7b53da58003449d3ee4d4cdcdf36d231db7df4a

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
        <h1>
          여러분의 농장에 <span>융통성</span>을 선물합니다 .
        </h1>
      </div>

      <div className={styles.content_three}>
        <h1>아이팜만의 차별화된 시스템을 만나보세요.</h1>
        <div>
          <img src={phoneImg} />
          <img className={styles.big} src={phoneImg} />
          <img src={phoneImg} />
          {/* 휴대폰 화면 안에 주요 서비스? 등을 넣어서 나타나게.. 하면.. */}
        </div>
      </div>

      <div className={styles.state}>
        <section>
          <h3>스마트팜 이용현황</h3>
          <img src={mapImg} />
        </section>
        <section>
          <img src={chartImg} />
          {/* 사용자의 현재 위치에 맞는 지역의 정보가 나타나게 .. */}
        </section>
      </div>

      {/* <div className={styles.case_community}>
        <section>
          <h3>우수 사례</h3>
          <div className={styles.case}>
            <img src={caseImg} />
            <h3>충남 공주 / 딸기</h3>
            <h4>박정훈님</h4>
            <p>
              "아이팜과 함께한 뒤로 삶이 훨씬 더 여유로워졌습니다. 예부터 농사는
              부지런해야 한다고들 하는데 이제는 집에서도 밖에서도 할 수 있으니
              얼마나 편해졌는지 모르겠습니다."
            </p>
          </div>
        </section>
        <section>
          <p>커뮤니티</p>
          <div className={styles.community}>
            <ul>
              <li>2박 3일 여행가는데...</li>
              <li>자기 전엔 다들...</li>
              <li>오늘 날씨 너무 덥네요</li>
            </ul>
          </div>
        </section>
      </div> */}

      <div className={styles.service}>
        <button>스마트팜 체험해보기</button>
        <button>스마트팜 견적 요청하기</button>
        <button>자주 묻는 질문</button>
      </div>
    </div>
  );
}

export default Home;
