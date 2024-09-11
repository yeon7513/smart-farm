import { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";
import { setUser } from "../../store/user/UserSlice";
import { getDatas, joinUser, LoginGetDatas } from "../../api/firebase";
import CustomModal from "../../components/modal/CustomModal";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import SearchAddr from "../../components/search-addr/SearchAddr";
import styles from "./Kakaoback.module.scss";

const Kakaoback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  // const KakaoKey = localStorage.getItem(
  //   "kakao_5ae84fc20432f560ee6fc559f3353ede"
  // );
  const [state, setState] = useState({});
  const [myAddress, SetmyAddress] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const kakaoClientId = "ab4d55383cde6894b80a6f361124e20b";
  const kakaoOnSuccess = async (data) => {
    console.log("카카오 로그인 성공:", data);
    setState(data);
    const userInfo = await LoginGetDatas("users");
    const Point = userInfo?.filter(
      (item) => item.nickname == data.profile.properties.nickname
    );
    if (Point.length === 0) {
      openModal();
    }
    Point.forEach((item) => {
      dispatch(
        setUser({
          email: item.email,
          token: data.response.refresh_token,
          uid: data.response.id_token,
          name: item.name,
          nick: data.profile.properties.nickname,
          number: item.number,
        })
      );
    });

    // if(dashboard){

    // } else{}
    // navigate("/");
    const idToken = data.response.access_token;
    console.log("엑세스 토큰:", idToken);
  };

  const kakaoOnFailure = (error) => {
    console.error("카카오 로그인 실패:", error);
  };

  const password = "";
  const onSubmit = ({ email, name, number }) => {
    joinUser(state?.response.id_token, email, password, {
      number: number,
      address: myAddress,
      farmAddress: "",
      name: name,
      nickname: state.profile.properties.nickname,
      deleteYn: "N",
    });
    dispatch(
      setUser({
        email: email,
        token: state?.response.refresh_token,
        uid: state?.response.id_token,
        name: name,
        nick: state?.profile.properties.nickname,
        number: number,
      })
    );
  };
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#F7E700", // 버튼 배경색
              color: "#3E0C02", // 버튼 텍스트 색상
              border: "none", // 버튼 테두리
              borderRadius: "10px", // 버튼 모서리 둥글기
              cursor: "pointer", // 커서 모양
              fontSize: "15px", // 텍스트 크기
              fontWeight: "bold", // 텍스트 두께
              padding: "2.5% 4% 2.5% 4%",
              transition: "background-color 0.3s", // 호버 시 색상 변경을 부드럽게
              // boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15);",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1.0")}
          >
            <RiKakaoTalkFill style={{ width: 40, height: 40 }} />
            카카오 로그인
            {/* <img
              src="/img/kakao_login_medium_narrow.png" // 카카오 이미지 URL
              //   alt="Kakao Logo"
              style={{
                width: "100%", // 이미지 크기
                height: "100%", // 이미지 크기
                borderRadius: "5px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")} // 호버 시 배경색 변경
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1.0")} // 호버 해제 시 배경색 복원
            /> */}
          </button>
        )}
      />
      <CustomModal
        title={"추가 정보"}
        btnName={"확인"}
        isOpen={isModalOpen}
        handleClose={closeModal}
        btnHandler={handleSubmit(onSubmit)}
      >
        <form>
          <div className={styles.modaleContainer}>
            <h3>소셜 로그인 시에는 추가 정보가 필요합니다.</h3>
            <div>
              <TextField
                InputProps={{
                  sx: {
                    pl: 2,
                    pr: 2,
                  },
                }}
                type="text"
                label={"이름"}
                {...register("name")}
              />
            </div>
            <div>
              <TextField
                InputProps={{
                  sx: {
                    pl: 2,
                    pr: 2,
                  },
                }}
                type="email"
                label={"이메일"}
                {...register("email")}
              />
            </div>
            <div>
              <TextField
                InputProps={{
                  sx: {
                    pl: 2,
                    pr: 2,
                  },
                }}
                type="text"
                label={"전화번호"}
                {...register("number")}
              />
            </div>

            <div>
              <h3>주소</h3>
              <SearchAddr getAddr={SetmyAddress} />
            </div>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default Kakaoback;

// function KaKaoLogout(props) {
//   const navigate = useNavigate();
//   const KaKaoLogout = () => {
//     if (window.Kakao.Auth.getAccessToken()) {
//       console.log("로그아웃 중입니다.");
//       window.Kakao.Auth.logout(function () {
//         console.log("로그아웃 성공");
//         // 로그아웃 후 추가로 처리할 작업이 있다면 여기에 작성합니다.
//       });
//     } else {
//       console.log("로그인 상태가 아닙니다.");
//     }
//   };
//   const Box = `
//     color: "#3E0C02";
//     border: "none";
//     border-radius: "10px";
//     cursor: "pointer";
//     font-size: "12px";
//     font-weight: "bold";
//     transition: "background-color 0.3s";
//   `;

//   return (
//     <div>
//       <button onClick={KaKaoLogout}>로그아웃</button>
//     </div>
//   );
// }
