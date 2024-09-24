import React, { useEffect, useState } from 'react';
import { FiHome, FiSmartphone } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { MdModeEdit, MdReportGmailerrorred } from 'react-icons/md';
import { RiUser3Line } from 'react-icons/ri';
import Card from '../../../components/card/Card';
import ImageBox from '../../../components/image-box/ImageBox';
import { useComponentContext } from '../../../context/ComponentContext';
import styles from './IntroMyPage.module.scss';

function IntroMyPage() {
  const [info, setInfo] = useState(() =>
    JSON.parse(localStorage.getItem('user'))
  );

  const { setCurrComp } = useComponentContext();

  useEffect(() => {
    const handleStorageChange = () => {
      setInfo(JSON.parse(localStorage.getItem('user')));
    };

    // storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);

    // 최초 렌더링 후 로컬 스토리지에서 값 세팅
    setInfo(JSON.parse(localStorage.getItem('user')));

    return () => {
      // cleanup: 이벤트 리스너 해제
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.intro}>
      <button
        className={styles.editBtn}
        onClick={() => setCurrComp('InfoEdit')}
      >
        <ImageBox imgUrl={info.photoUrl} />
        <span className={styles.editIcon}>
          <MdModeEdit />
        </span>
      </button>
      <h3 className={styles.title}>
        {info.nickname}
        <span>{info.email}</span>
      </h3>
      <Card className={styles.content}>
        <ul className={styles.info}>
          <li>
            <span className={styles.icon}>
              <RiUser3Line />
            </span>
            <span>{info.name}</span>
          </li>
          <li>
            <span className={styles.icon}>
              <FiSmartphone />
            </span>
            <span>{info.number}</span>
          </li>
          <li>
            <span className={styles.icon}>
              <FiHome />
            </span>
            <span>{info.address}</span>
          </li>
          <li>
            <span className={styles.icon}>
              <MdReportGmailerrorred />
            </span>
            <span>{info.complaneNum || 0} 회</span>
          </li>
          <li className={styles.farmList}>
            <span className={styles.icon}>
              <GrLocation />
            </span>
            <ul>
              {info.farmAddress.length === 0 ? (
                <li>소유하신 농장이 없습니다.</li>
              ) : (
                info.farmAddress.map((list, idx) => <li key={idx}>{list}</li>)
              )}
            </ul>
          </li>
        </ul>
      </Card>
    </div>
  );
}

export default IntroMyPage;
