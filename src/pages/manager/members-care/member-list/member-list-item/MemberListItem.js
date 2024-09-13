import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MemberListItem.module.scss';

function MemberListItem({ detail }) {
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

  const [editedData, setEditedData] = useState();

  const navigate = useNavigate();

  console.log(farmAddress);

  return (
    <div className={styles.detailInfo}>
      <span>[FM{createdAt}]</span>
      <img
        src={photoUrl.length === 0 ? './img/profile.webp' : photoUrl[0]}
        alt=""
      />
      <ul>
        <li>이메일: {email}</li>
        <li>이름: {name}</li>
        <li>전화번호: {number}</li>
        <li>주소: {address}</li>
        <li>닉네임: {nickname}</li>
        <li>
          <ul>
            {farmAddress.length === 0 ? (
              <li>
                <span>소유한 농장이 없습니다.</span>
              </li>
            ) : (
              farmAddress.map((addr, idx) => (
                <li key={idx}>
                  <span>농장: {addr}</span>
                </li>
              ))
            )}
          </ul>
        </li>
        <li>신고 누적 횟수: {complaneNum}</li>
      </ul>
      <div className={styles.btns}>
        <button>정보수정</button>
        <button
          onClick={() =>
            navigate('/my-farm', { state: { email: email, name: name } })
          }
        >
          스마트팜 관리
        </button>
      </div>
    </div>
  );
}

export default MemberListItem;
