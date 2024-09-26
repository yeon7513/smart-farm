import React from 'react';
import plant1 from '../../assets/abou/식2.png';
import plant2 from '../../assets/abou/식3.jpg';
import Title from '../../components/layout/title/Title';
import UpButton from '../../components/up-button/UpButton';
import { company } from '../../lib/intro';
import styles from './About.module.scss';

function About() {
  return (
    <div>
      <Title {...company} />
      <div className={styles.middle}>
        <div className={styles.vision}>
          <div className={styles.vision_title}>
            <h2>비전</h2>
            <h4>VISION</h4>
            <div className={styles.title}>
              아이팜은 혁신적인 기술과 솔루션으로 다양한 시장에서 가장 앞서가
              세계농업을 대표하는
              <span>NO.1</span> 기업으로 성장해나가겠습니다.
            </div>
          </div>
          <div className={styles.img}>
            <img src={plant1} alt="" />
          </div>
        </div>
        <div className={styles.mission}>
          <div className={styles.img}>
            <img src={plant2} alt="" />
          </div>
          <div className={styles.mission_title}>
            <h2>미션</h2>
            <h4>MISSION</h4>
            <div className={styles.title}>
              기후변화가 심해도 어디에서나 신선한 먹거리를 생산 할 수 있도록
              한다.
            </div>
          </div>
        </div>
      </div>
      <UpButton />
    </div>
  );
}

export default About;
