import React from 'react';
import Card from '../../../../components/card/Card';
import ImageBox from '../../../../components/image-box/ImageBox';
import styles from './MemberList.module.scss';

function MemberList({ data, setIsOpen, setUserDetail }) {
  const handleOpenDetail = () => {
    setIsOpen(true);
    setUserDetail(data);
  };

  return (
    <li onClick={handleOpenDetail}>
      <Card className={styles.card}>
        <h3 className={styles.id}>[FM{data.createdAt}]</h3>
        <div className={styles.content}>
          <div className={styles.profile}>
            <ImageBox imgUrl={data.photoUrl} />
          </div>
          <ul className={styles.info}>
            <li>
              <span className={styles.label}>이름</span>
              <span>{data.name}</span>
            </li>
            <li>
              <span className={styles.label}>이메일</span>
              <span>{data.email}</span>
            </li>
            <li>
              <span className={styles.label}>닉네임</span>
              <span>{data.nickname}</span>
            </li>
            <li>
              <span className={styles.label}>전화번호</span>
              <span>{data.number}</span>
            </li>
            <li>
              <span className={styles.label}>가입일</span>
              <span>{new Date(data.createdAt).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
      </Card>
    </li>
  );
}

export default MemberList;
