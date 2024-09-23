import React from 'react';
import { FiHome, FiSmartphone } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { MdModeEdit, MdReportGmailerrorred } from 'react-icons/md';
import { RiUser3Line } from 'react-icons/ri';
import Card from '../../../components/card/Card';
import ImageBox from '../../../components/image-box/ImageBox';
import { useComponentContext } from '../../../context/ComponentContext';
import styles from './IntroMyPage.module.scss';

function IntroMyPage() {
  const {
    email,
    nick,
    name,
    address,
    number,
    farmAddress,
    photoUrl,
    complaneNum,
  } = JSON.parse(localStorage.getItem('user'));

  const { setCurrComp } = useComponentContext();

  return (
    <div className={styles.intro}>
      <button
        className={styles.editBtn}
        onClick={() => setCurrComp('InfoEdit')}
      >
        <ImageBox imgUrl={photoUrl} />
        <span className={styles.editIcon}>
          <MdModeEdit />
        </span>
      </button>
      <h3 className={styles.title}>
        {nick}
        <span>{email}</span>
      </h3>
      <Card className={styles.content}>
        <ul className={styles.info}>
          <li>
            <span className={styles.icon}>
              <RiUser3Line />
            </span>
            <span>{name}</span>
          </li>
          <li>
            <span className={styles.icon}>
              <FiSmartphone />
            </span>
            <span>{number}</span>
          </li>
          <li>
            <span className={styles.icon}>
              <FiHome />
            </span>
            <span>{address}</span>
          </li>
          <li>
            <span className={styles.icon}>
              <MdReportGmailerrorred />
            </span>
            <span>{complaneNum || 0} 회</span>
          </li>
          <li className={styles.farmList}>
            <span className={styles.icon}>
              <GrLocation />
            </span>
            <ul>
              {farmAddress.length === 0 ? (
                <li>소유하신 농장이 없습니다.</li>
              ) : (
                farmAddress.map((list, idx) => <li key={idx}>{list}</li>)
              )}
            </ul>
          </li>
        </ul>
      </Card>
    </div>
  );
}

export default IntroMyPage;
