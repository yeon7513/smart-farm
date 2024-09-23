import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageBox from '../../../../../components/image-box/ImageBox';
import styles from './MemberListItem.module.scss';

function MemberListItem({ detail, handleEdit }) {
  const {
    address,
    complaneNum,
    email,
    farmAddress,
    name,
    nickname,
    number,
    photoUrl,
    createdAt,
  } = detail;

  const navigate = useNavigate();

  return (
    <div className={styles.detailInfo}>
      <ImageBox imgUrl={photoUrl} />
      <div className={styles.content}>
        <div className={styles.btns}>
          <button onClick={handleEdit}>정보수정</button>
          <button
            onClick={() =>
              navigate('/my-farm', {
                state: {
                  email: email,
                  name: name,
                },
              })
            }
          >
            스마트팜 관리
          </button>
        </div>
        <ul className={styles.info}>
          <li>
            <span className={styles.memberId}>[FM{createdAt}]</span>
          </li>
          <li>
            <span className={styles.nowrap}>이메일</span>
            <span className={styles.data}>{email}</span>
          </li>
          <li>
            <span className={styles.nowrap}>이름</span>
            <span className={styles.data}>{name}</span>
          </li>
          <li>
            <span className={styles.nowrap}>전화번호</span>
            <span className={styles.data}>{number}</span>
          </li>
          <li>
            <span className={styles.wrap}>주소</span>
            <span className={styles.data}>{address}</span>
          </li>
          <li>
            <span className={styles.nowrap}>닉네임</span>
            <span className={styles.data}>{nickname}</span>
          </li>
          <li>
            <div className={styles.farmList}>
              <span className={styles.wrap}>소유한 농장</span>
              {farmAddress.length === 0 ? (
                <span className={styles.data}>소유한 농장이 없습니다.</span>
              ) : (
                <div className={styles.farmAddr}>
                  {farmAddress.map((addr, idx) => (
                    <p key={idx}>{addr}</p>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li>
            <span className={styles.nowrap}>신고 누적 횟수</span>
            <span className={styles.data}>{complaneNum || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MemberListItem;
