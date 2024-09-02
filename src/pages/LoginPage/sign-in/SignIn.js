import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../../api/firebase';
import Form from '../../../components/form/Form';
import { setUser } from '../../../store/user/UserSlice';

function SignIn(props) {
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          uid: user.uid,
          name: user.name,
          nick: user.nickname,
        })
      );
      navigate('/');
    } catch (error) {
      console.log(error);
      setFirebaseError('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };
  return (
    <Form
      title={'로그인'}
      placeholder1={'Email'}
      placeholder2={'Password'}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignIn;
