// import { Container } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import { RiScrollToBottomLine } from "react-icons/ri";
import styles from "./Home.module.scss";
import MainSlide from "../../components/slide/main/MainSlide";
import phoneImg from "../../assets/main/phone.png";
// import Map from "../../components/map/Map";
import { Link } from "react-router-dom";
import CaseSlide from "../../components/slide/case/CaseSlide";
import { cases } from "../../lib/case";
// import Charts from "../../components/chart/Charts";
import backImg from "../../assets/main/content2.jpg";
import HomeChart from "../../components/home-chart/HomeChart";
import { useComponentContext } from "../../context/ComponentContext";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { currComp, setCurrComp } = useComponentContext();
  const [localName, setLocalName] = useState("");
  const mapRef = useRef(null);

  const twoText = useRef();
  const imgRef = useRef([]);

  useEffect(() => {
    gsap.to(".mainText", {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".mainText",
        start: "top 100px",
        end: "top 100%",
        scrub: 1,
        // markers: true,
      },
    });
    gsap.to(".scroll", {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".scroll",
        start: "top 90%",
        end: "top 100%",
        scrub: 1,
      },
    });
    gsap.fromTo(
      twoText.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 4,
        scrollTrigger: {
          trigger: twoText.current,
          start: "top 100%",
          end: "top 100%",
          toggleActions: "play none none reverse",
          scrub: 2,
          // once: true,
        },
      }
    );
    imgRef.current.forEach((img, index) => {
      gsap.fromTo(
        img,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: img,
            start: "top 100%",
            end: "top 90%",
            toggleActions: "play none none reverse",
            // scrub: 1,
            // once: true,
          },
        }
      );
      img.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.04, duration: 0.3 });
      });

      img.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.3 });
      });
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
        <div>
          <img src={backImg} alt="" />
        </div>
      </div>

      <div className={styles.content_two}>
        <MainSlide />
        <h1 ref={twoText}>
          여러분의 농장에 <span>융통성</span>을 선물합니다 .
        </h1>
      </div>

      <div className={styles.content_three}>
        <h1>아이팜만의 차별화된 시스템을 만나보세요.</h1>
        <div>
          <img
            className={styles.small}
            src={phoneImg}
            ref={(el) => (imgRef.current[0] = el)}
            alt=""
          />
          <img
            className={styles.big}
            src={phoneImg}
            ref={(el) => (imgRef.current[1] = el)}
            alt=""
          />
          <img
            className={styles.small}
            src={phoneImg}
            ref={(el) => (imgRef.current[2] = el)}
            alt=""
          />
        </div>
      </div>

      <div className={styles.state_commu}>
        <div className={styles.community}>
          <h1>커뮤니티</h1>
          <div className={styles.commu}>
            <div>
              <Link to={"/community"} onClick={() => setCurrComp("notice")}>
                <ul>
                  <h2>공지사항</h2>
                  <li>2024-08-23 / 신규 업데이트</li>
                  <li>2024-08-20 / 불편사항 신고 ...</li>
                  <li>2024-08-15 / 여름휴가 안내</li>
                </ul>
              </Link>
            </div>
            <div>
              <Link to={"/community"} onClick={() => setCurrComp("sharing")}>
                <ul>
                  <h2>정보 공유 게시판</h2>
                  <li>요즘 날씨 진짜 덥네요</li>
                  <li>회원님들은 어떤 시스템...</li>
                  <li>내일부터 2박3일 여행 가는데...</li>
                </ul>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.state}>
          <h1>스마트팜 이용현황</h1>
          <div className={styles.map_chart}>
            <div>
              <HomeChart />
            </div>
            <div className={styles.status}>
              <Link to={"/info"} onClick={() => setCurrComp("usageStatus")}>
                자세히 보기
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.case}>
        <div>
          <h1>I Farm X People </h1>
          <h4>- 아이팜의 우수한 사례들을 확인해보세요.</h4>
          <CaseSlide items={cases} />
        </div>
      </div>

      <div className={styles.service}>
        <Link to={"/info"} onClick={() => setCurrComp("simulation")}>
          <button>스마트팜 체험해보기</button>
        </Link>
        <Link to={"/request"}>
          <button>스마트팜 견적 요청하기</button>
        </Link>
        <Link to={"/community"} onClick={() => setCurrComp("faq")}>
          <button>자주 묻는 질문</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
