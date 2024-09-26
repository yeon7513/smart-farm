import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../../api/firebase';
import { joinUser } from '../../../api/userPage';
import Forms from '../../../components/form/Forms';
import { setUser } from '../../../store/user/UserSlice';

function SingUp() {
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignupAndLogin = async (email, password, userInfo) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      await joinUser(user.uid, user.email, password, userInfo);
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          uid: user.uid,
          number: userInfo.number,
          name: userInfo.name,
          nickname: userInfo.nickname,
          address: userInfo.address,
          docId: user.uid,
        })
      );
      navigate('/');
    } catch (error) {
      console.log(error);
      setFirebaseError('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };
  return (
    <Forms
      title={'회원가입'}
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    />
  );
}
export default SingUp;
