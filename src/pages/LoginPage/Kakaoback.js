import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiKakaoTalkFill } from "react-icons/ri";
import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinUser, LoginGetDatas } from "../../api/userPage";
import CustomModal from "../../components/modal/CustomModal";
import SearchAddr from "../../components/search-addr/SearchAddr";
import { setUser } from "../../store/user/UserSlice";
import styles from "./Kakaoback.module.scss";

const Kakaoback = () => {
  const [inputValue, setInputValue] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm({
    mode: "onChange",
  });

  const [state, setState] = useState({});
  const [myAddress, SetmyAddress] = useState();
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_CLIENT_ID_KEY;
  const allValues = watch(); // input에 들어가는 내용을 실시간 확인 가능
  useEffect(() => {
    if (isModalOpen === true) {
      if (
        allValues.name &&
        allValues.name.length >= 3 &&
        allValues.email &&
        allValues.email.length >= 12 &&
        allValues.number &&
        allValues.number.length >= 13 &&
        myAddress &&
        myAddress.length >= 15
      ) {
        setInputValue(false);
      } else if (allValues.number && allValues.number.length < 13) {
        setInputValue(true);
      }
    }
  }, [inputValue, allValues]);

  const kakaoOnSuccess = async (data) => {
    console.log("카카오 로그인 성공:", data);
    setState(data);
    const userInfo = await LoginGetDatas("users");
    const Point = userInfo?.filter(
      (item) => item.nickname === data.profile.properties.nickname
    );
    if (Point.length === 0) {
      setModalOpen(true);
      openModal();
      if (modalOpen) {
        navigate("/");
      }
    } else {
      Point.forEach((item) => {
        dispatch(
          setUser({
            email: item.email,
            token: data.response.refresh_token,
            uid: data.response.id_token,
            name: item.name,
            nickname: data.profile.properties.nickname,
            number: item.number,
            address: item.address,
          })
        );
      });
      navigate("/");
    }
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
        nickname: state?.profile.properties.nickname,
        number: number,
      })
    );
    closeModal();
    navigate("/");
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
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#F7E700", // 버튼 배경색
              color: "#3E0C02", // 버튼 텍스트 색상
              border: "none", // 버튼 테두리
              borderRadius: "5px", // 버튼 모서리 둥글기
              cursor: "pointer", // 커서 모양
              fontSize: "15px", // 텍스트 크기
              fontWeight: "bold", // 텍스트 두께
              padding: "0.6% 0 0.6% 0",
              transition: "background-color 0.3s", // 호버 시 색상 변경을 부드럽게

              // boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15);",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1.0")}
          >
            <RiKakaoTalkFill style={{ width: 32, height: 32 }} />
            카카오 로그인
          </button>
        )}
      />
      <CustomModal
        title={"추가 정보"}
        btnName={"확인"}
        isOpen={isModalOpen}
        handleClose={closeModal}
        btnHandler={handleSubmit(onSubmit)}
        isDisabled={inputValue}
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
