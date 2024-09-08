import { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { setUser } from "../../store/user/UserSlice";

const Kakaoback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const KakaoKey = localStorage.getItem(
    "kakao_5ae84fc20432f560ee6fc559f3353ede"
  );
  const [state, setState] = useState();
  const kakaoClientId = "ab4d55383cde6894b80a6f361124e20b";

  const kakaoOnSuccess = async (data) => {
    console.log("카카오 로그인 성공:", data);
    console.log(data.profile.properties);
    setState(KakaoKey);
    dispatch(
      setUser({
        email: "",
        token: data.response.refresh_token,
        uid: data.profile.id,
        nick: data.profile.properties.nickname,
        number: "",
        //     // name: item.name,
      })
    );
    navigate("/");
    const idToken = data.response.access_token;
    console.log("엑세스 토큰:", idToken);
  };

  const kakaoOnFailure = (error) => {
    console.error("카카오 로그인 실패:", error);
  };

  function KaKaoLogout(props) {
    const navigate = useNavigate();
    const KaKaoLogout = () => {
      if (window.Kakao.Auth.getAccessToken()) {
        console.log("로그아웃 중입니다.");
        window.Kakao.Auth.logout(function () {
          console.log("로그아웃 성공");
          navigate("/login");
          // 로그아웃 후 추가로 처리할 작업이 있다면 여기에 작성합니다.
        });
      } else {
        console.log("로그인 상태가 아닙니다.");
      }
    };
    const Box = `
      color: "#3E0C02";
      border: "none";
      border-radius: "10px";
      cursor: "pointer";
      font-size: "12px";
      font-weight: "bold";
      transition: "background-color 0.3s";
    `;

    return (
      <div>
        <button onClick={KaKaoLogout}>로그아웃</button>
      </div>
    );
  }

  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
        getProfile={true}
        render={({ onClick }) => (
          <button
            onClick={onClick}
            style={{
              //   backgroundColor: "#F7E700", // 버튼 배경색
              color: "#3E0C02", // 버튼 텍스트 색상
              border: "none", // 버튼 테두리
              borderRadius: "10px", // 버튼 모서리 둥글기
              cursor: "pointer", // 커서 모양
              fontSize: "12px", // 텍스트 크기
              fontWeight: "bold", // 텍스트 두께
              transition: "background-color 0.3s", // 호버 시 색상 변경을 부드럽게
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src="/img/kakao_login_medium_narrow.png" // 카카오 이미지 URL
              //   alt="Kakao Logo"
              style={{
                width: "100%", // 이미지 크기
                height: "100%", // 이미지 크기
                borderRadius: "5px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")} // 호버 시 배경색 변경
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1.0")} // 호버 해제 시 배경색 복원
            />
          </button>
        )}
      />
    </>
  );
};

export default Kakaoback;
