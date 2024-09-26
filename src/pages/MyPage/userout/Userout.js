import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuth, updateDatas } from '../../../api/firebase';
import { fetchItems, removeUser } from '../../../store/user/UserSlice';
import Container from '../../layout/container/Container';
import CustomModal from '../../modal/CustomModal';
import style from './Userout.module.scss';

function Userout(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);
  const auth = getUserAuth();
  const navigate = useNavigate();
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
    // setMenuOpen(false);
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
    <Container className={style.container}>
      <div>
        <div>비밀번호</div>
        <input />
        <button onClick={openModal}>확인</button>
        <CustomModal
          title={'회원탈퇴'}
          btnName={'탈퇴하기'}
          isOpen={isModalOpen}
          handleClose={closeModal}
          btnHandler={deleteUserInfo}
        >
          <div>
            <p>회원 탈퇴시 회원님의 정보는 삭제됩니다.</p>
            <p>탈퇴하시겠습니까?</p>
            <input type="checkbox" />
            <span>주의사항을 확인했습니다.</span>
          </div>
        </CustomModal>
      </div>
    </Container>
  );
}
export default Userout;
