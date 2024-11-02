import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImageBox from '../../../../../components/image-box/ImageBox';
import styles from './MemberListItem.module.scss';

function MemberListItem({ docId, handleEdit }) {
  const { items } = useSelector((state) => state.userSlice);

  const member = items.find((item) => item.docId === docId);

  const navigate = useNavigate();

  return (
    <div className={styles.detailInfo}>
      <ImageBox imgUrl={member.photoUrl} />
      <div className={styles.content}>
        <ul className={styles.info}>
          <li>
            <span className={styles.memberId}>[FM{member.createdAt}]</span>
          </li>
          <li>
            <span className={styles.label}>이메일</span>
            <span className={styles.data}>{member.email}</span>
          </li>
          <li>
            <span className={styles.label}>이름</span>
            <span className={styles.data}>{member.name}</span>
          </li>
          <li>
            <span className={styles.label}>전화번호</span>
            <span className={styles.data}>{member.number}</span>
          </li>
          <li>
            <span className={styles.label}>주소</span>
            <span className={styles.data}>{member.address}</span>
          </li>
          <li>
            <span className={styles.label}>닉네임</span>
            <span className={styles.data}>{member.nickname}</span>
          </li>
          <li>
            <span className={styles.label}>소유한 농장</span>
            <div className={styles.farmList}>
              {member.farmAddress.length === 0 ? (
                <span className={styles.data}>소유한 농장이 없습니다.</span>
              ) : (
                <>
                  {member.farmAddress.map((addr, idx) => (
                    <p key={idx}>{addr}</p>
                  ))}
                </>
              )}
            </div>
          </li>
          <li>
            <span className={styles.label}>신고 누적 횟수</span>
            <span className={styles.data}>{member.complaneNum || 0} 회</span>
          </li>
          <li>
            <span className={styles.label}>가입일</span>
            <span className={styles.data}>
              {new Date(member.createdAt).toLocaleDateString()}
            </span>
          </li>
        </ul>
        <div className={styles.btns}>
          <button onClick={handleEdit}>정보수정</button>
          <button
            onClick={() =>
              navigate('/my-farm', {
                state: {
                  email: member.email,
                  name: member.name,
                },
              })
            }
          >
            스마트팜 관리
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberListItem;
