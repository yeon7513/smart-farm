import React from 'react';

const KaKaoLogin = () => {
  const Rest_api_key = process.env.REACT_APP_KAKAO_LOGIN_REST_API_KEY; //REST API KEY
  const redirect_uri = 'http://localhost:3000/oauth/kakao'; //Redirect URI
  // const code = new URL(window.location.href).searchParams.get("code");
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = (event) => {
    event.preventDefault();
    window.location.href = kakaoURL;
  };
  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};
export default KaKaoLogin;
