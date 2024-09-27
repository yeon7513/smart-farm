import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../../api/firebase';
import { LoginGetDatas } from '../../../api/userPage';
import Form from '../../../components/form/Form';
import { setUser } from '../../../store/user/UserSlice';

function SignIn(props) {
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password, name) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const userInfo = await LoginGetDatas('users');
      const userInfoConfirm = userInfo.filter(
        (item) => item.email === user.email
      );
      userInfoConfirm.forEach((item) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            uid: user.uid,
            docId: item.docId,
            name: item.name,
            nickname: item.nickname,
            number: item.number,
            address: item.address,
            farmAddress: item.farmAddress,
            photoUrl: item.photoUrl,
            complaneNum: item.complaneNum || 0,
          })
        );
      });
      navigate('/');
    } catch (error) {
      console.log('로그인 실패: ', error);
      setFirebaseError('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };
  return (
    <Form
      title={'로그인'}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
      inputName1={'이메일 입력'}
      inputName2={'비밀번호 입력'}
      type={'email'}
      type2={'password'}
    />
  );
}

export default SignIn;
