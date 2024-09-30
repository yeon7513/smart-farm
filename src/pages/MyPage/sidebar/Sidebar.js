import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuth, updateDatas } from '../../../api/firebase';
import { useComponentContext } from '../../../context/ComponentContext';
import { fetchItems, removeUser } from '../../../store/user/UserSlice';
import CustomModal from '../../modal/CustomModal';
import styles from './sidebar.module.scss';

function Sidebar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const auth = getUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.userSlice);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const localInfoNum = async () => {
      const localInfo = localStorage.getItem('user');
      if (localInfo === null) {
        navigate(-1);
      }
    };
    localInfoNum();
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  const { setCurrComp } = useComponentContext();

  const localInfo = localStorage.getItem('user');
  if (!localInfo == null) {
    navigate('/');
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(removeUser());
      if (window.Kakao.Auth.getAccessToken()) {
        console.log('로그아웃 중입니다.');
        await new Promise((resolve) => {
          window.Kakao.Auth.logout(function () {
            console.log('로그아웃 성공');
            resolve();
          });
        });
      } else {
        console.log('로그인 상태가 아닙니다.');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserInfo = async () => {
    const deleteUser = items.find((item) => item.name === user.name);
    if (deleteUser) {
      const { docId } = deleteUser;
      const updateData = {
        deleteYn: 'Y',
      };
      await updateDatas('users', docId, updateData);
    } else {
      console.error('User not found in items');
    }
    closeModal();
    alert('탈퇴가 완료되었습니다.');
    handleLogout();
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <ul className={styles.items}>
        내 정보
        <li className={styles.item}>
          <button onClick={() => setCurrComp('Myinfo')}>내 정보 수정</button>
        </li>
        <li className={styles.itemmove}>
          <button onClick={() => navigate('/my-farm')}>내 농장 관리</button>
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
          <button onClick={() => setCurrComp('Chatroominfo')}>채팅 상담</button>
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
          <button className={styles.items} onClick={openModal}>
            회원 탈퇴
          </button>
        </li>
      </ul>
      <CustomModal
        title={'회원탈퇴'}
        btnName={'탈퇴하기'}
        isOpen={isModalOpen}
        handleClose={closeModal}
        btnHandler={deleteUserInfo}
      >
        <div className={styles.modalContent}>
          <div>
            <p>
              회원 탈퇴 시 <span>30일</span> 간 회원 가입이 <span>불가능</span>
              합니다.
            </p>
          </div>
          <div>
            <p>
              회원 탈퇴 시 회원님의 정보가 <span>삭제</span>됩니다.
            </p>
          </div>
          <div>
            <span>탈퇴</span>하시겠습니까?
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default Sidebar;
