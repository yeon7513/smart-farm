import KakaoLogin from "react-kakao-login";

const Kakaoback = () => {
  const kakaoClientId = "ab4d55383cde6894b80a6f361124e20b"; // 실제 키로 변경

  const kakaoOnSuccess = async (data) => {
    console.log("카카오 로그인 성공:", data);
    const idToken = data.response.access_token; // 엑세스 토큰
    console.log("엑세스 토큰:", idToken);
  };

  const kakaoOnFailure = (error) => {
    console.error("카카오 로그인 실패:", error);
  };

  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        getProfile={true} // 프로필 정보 가져오기 옵션 설정
      />
    </>
  );
};

export default Kakaoback;
