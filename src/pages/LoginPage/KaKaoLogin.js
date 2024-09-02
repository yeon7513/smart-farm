import React, { useEffect, useState } from "react";

const KaKaoLogin = () => {
  const Rest_api_key = "1354a30277487708a84242c8a1004646"; //REST API KEY
  const redirect_uri = "http://localhost:3000/oauth/kakao"; //Redirect URI
  const code = new URL(window.location.href).searchParams.get("code");
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
