import React from "react";
import prairie from "../../assets/abou/식1.jpg";
import plant from "../../assets/abou/식2.png";
import styles from "./About.module.scss";
function About() {
  return (
    <div>
      <div className={styles.main}>
        <img src={prairie} />
        <div className={styles.main_title}>
          <h1>아이팜</h1>
          <p>
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
          {/* <div className={styles.vision_img}> */}
          <img src={plant} />
          {/* </div> */}
        </div>
        <div className={styles.mission}>
          <img src={plant} />
          <div className={styles.mission_title}>
            <h2>미션</h2>
            <h4>MISSION</h4>
            <div>
              기후변화가 심해도 어디에서나 신선한 먹거리를 생산 할 수 있도록
              한다.
            </div>
          </div>
          {/* <div className={styles.vision_img}> */}
        </div>
      </div>
    </div>
  );
}

export default About;
