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

  return (
    <div className={styles.detailInfo}>
      <span>[FM{createdAt}]</span>
      <img
        src={photoUrl.length === 0 ? './img/profile.webp' : photoUrl[0]}
        alt=""
      />
      <ul>
        <li>{email}</li>
        <li>{name}</li>
        <li>{number}</li>
        <li>{address}</li>
        <li>{nickname}</li>
        <li>
          <ul>
            {farmAddress.map((addr, idx) => (
              <li key={idx}>
                <span>{addr}</span>
              </li>
            ))}
          </ul>
        </li>
        <li>{complaneNum}</li>
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
