import React from 'react';
import { deleteDatas } from '../../../api/firebase';
import { useComponentContext } from '../../../context/ComponentContext';
import styles from './sidebar.module.scss';
function Sidebar(props) {
  const { currComp, setCurrComp } = useComponentContext();
  const handleDelete = async (docId) => {
    // alert("정말 회원 탈퇴 하시겠습니까?");
    // localStorage에 저장되어 있는 회원 정보를 삭제합니다.
    localStorage.removeItem('user');
    // Firebase에 "users" 컬렉션에 저장되어 있는 회원 정보를 삭제합니다.
    const result = await deleteDatas('users', docId);

    if (!result) {
      alert('회원 정보가 없습니다. \n 관리자에게 문의하세요.');
      return false;
    }
  };
  return (
    <div className={styles.container}>
      <ul className={styles.items}>
        내 정보
        <li className={styles.item}>
          <button onClick={() => setCurrComp('Myinfo')}>내 정보 수정</button>
        </li>
        <li className={styles.itemmove}>
          <button onClick={() => setCurrComp('my-farm')}>내 농장 관리</button>
        </li>
      </ul>
      <ul className={styles.items}>
        견적 및 결제
        <li className={styles.item}>
          <button onClick={() => setCurrComp('Paymentinfo')}>견적 의뢰</button>
        </li>
        <li>
          <button onClick={() => setCurrComp('Paymentinfo')}>결제 내역</button>
        </li>
      </ul>
      <ul className={styles.items}>
        문의 내역
        <li className={styles.item}>
          <button onClick={() => setCurrComp('Chatbotinfo')}>챗봇 상담</button>
        </li>
        <li className={styles.item}>
          <button onClick={() => setCurrComp('Asinfo')}>A/S 문의</button>
        </li>
        <li className={styles.item}>
          <button onClick={() => setCurrComp('Myletter')}>내가 쓴 글</button>
        </li>
      </ul>
      <ul>
        <li className={styles.items}>
          <button
            className={styles.items}
            onClick={() => setCurrComp('Userout')}
          >
            회원 탈퇴
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
