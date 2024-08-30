import { Container } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as FcIcons from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../api/firebase';
import { setUser } from '../../store/user/UserSlice';
import Kakaoback from './Kakaoback';
import styles from './LoginPage.module.scss';
import SignIn from './sign-in/SignIn';

function LoginPage(props) {
  // const api = "cbd181f0a2594233a01eed9b0b86a392"; // 여기에 실제 API 키를 넣으세요
  // const userIdArr = [];
  // const apiurl = `/api3/Agree_WS/webservices/ProvideRestService/getIdentityDataList/${api}`;
  // fetch(apiurl)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     result.forEach((item) => {
  //       userIdArr.push(item.userId);
  //     });
  //     console.log(userIdArr.slice(0, 100));
  //   });

  const auth = getUserAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = auth.currentUser;

  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((result) => {
      dispatch(setUser({ email: result.user.email }));
      navigate('/');
    });
  };

  useEffect(() => {}, [loading, user, navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate('/');
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });

  return (
    <Container className={styles.container}>
      <div className={styles.form}>
        <h1>로그인</h1>
        <SignIn />
        <button
          type="submit"
          sx={{ bgcolor: 'secondary.main' }}
          onClick={SignInWithGoogle}
        >
          <span>
            <FcIcons.FcGoogle />
            <b>Google</b>
          </span>
        </button>
        <Kakaoback />
        <p>
          <Link to="/searchEm">Email 찾기</Link>
          <Link to="/searchPw">비밀번호 찾기</Link>
        </p>
        <p>
          아직 회원이 아니신가요? <Link to={'/register'}>회원가입</Link>
        </p>
      </div>
    </Container>
  );
}

export default LoginPage;
