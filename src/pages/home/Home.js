import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import { RiScrollToBottomLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import backImg from "../../assets/main/content2.jpg";
import phoneImg1 from "../../assets/main/1231.png";
import phoneImg2 from "../../assets/main/1232.png";
import phoneImg3 from "../../assets/main/1233.png";
import HomeChart from "../../components/home-chart/HomeChart";
import CaseSlide from "../../components/slide/case/CaseSlide";
import MainSlide from "../../components/slide/main/MainSlide";
import { useComponentContext } from "../../context/ComponentContext";
import { cases } from "../../lib/case";
import { fetchBoardDatas } from "./../../store/board/boardSlice";
import styles from "./Home.module.scss";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { setCurrComp } = useComponentContext();

  const twoText = useRef();
  const imgRef = useRef([]);

  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.boardSlice);
  const [notice, setNotice] = useState();
  const [sharing, setSharing] = useState();

  // 데이터 로드
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [noticePosts, sharingPosts] = await Promise.all([
          dispatch(fetchBoardDatas("notice")).unwrap(),
          dispatch(fetchBoardDatas("sharing")).unwrap(),
        ]);

        // 3개씩만, 최신순
        setNotice([
          ...noticePosts
            .slice(0, 3)
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
        ]);
        setSharing([
          ...sharingPosts
            .slice(0, 3)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        ]);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  // posts가 업데이트되면 view도 업데이트
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      setNotice(posts);
      setSharing(posts);
    }
  }, [posts, isLoading]);

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
            src={phoneImg2}
            ref={(el) => (imgRef.current[0] = el)}
            alt=""
          />
          <img
            className={styles.big}
            src={phoneImg1}
            ref={(el) => (imgRef.current[1] = el)}
            alt=""
          />
          <img
            className={styles.small}
            src={phoneImg3}
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
              <ul>
                <Link to={"/community"} onClick={() => setCurrComp("notice")}>
                  <h2>공지사항</h2>
                </Link>
                {notice &&
                  notice.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/community/${item.collection}/${item.id}`}
                    >
                      <li>{item.title}</li>
                    </Link>
                  ))}
              </ul>
            </div>
            <div>
              <ul>
                <Link to={"/community"} onClick={() => setCurrComp("sharing")}>
                  <h2>정보 공유 게시판</h2>
                </Link>
                {sharing &&
                  sharing.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/community/${item.collection}/${item.id}`}
                    >
                      <li>{item.title}</li>
                    </Link>
                  ))}
              </ul>
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
