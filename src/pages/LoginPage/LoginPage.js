import { Avatar, Container, TextField } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as FcIcons from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { joinUser, LoginGetDatas } from "../../api/userPage";
import CustomModal from "../../components/modal/CustomModal";
import { setUser } from "../../store/user/UserSlice";
import Kakaoback from "./Kakaoback";
import styles from "./LoginPage.module.scss";
import SignIn from "./sign-in/SignIn";
import SearchAddr from "../../components/search-addr/SearchAddr";
import axios from "axios";
import { getUserAuth } from "./../../api/firebase";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const localInfoNum = async () => {
      const localInfo = localStorage.getItem("user");
      if (localInfo && localInfo.includes("email")) {
        // if(dashboard)
        navigate("/");
      }
    };
    localInfoNum();
  }, [navigate]);

  const { register, handleSubmit, watch } = useForm({
    mode: "onChange",
  });
  const [inputValue, setInputValue] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };
  const [myAddress, SetmyAddress] = useState();
  const auth = getUserAuth();
  const dispatch = useDispatch();
  const Info = auth.currentUser;
  const allValues = watch(); // input에 들어가는 내용을 실시간 확인 가능
  useEffect(() => {
    if (isModalOpen === true) {
      if (
        allValues.number &&
        allValues.number.length >= 13 &&
        allValues.name &&
        allValues.name.length >= 3 &&
        myAddress &&
        myAddress.length >= 15
      ) {
        setInputValue(false);
      } else if (allValues.number && allValues.number.length < 13) {
        setInputValue(true);
      }
    }
  }, [inputValue, allValues]);

  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (result) => {
      const userInfo = await LoginGetDatas("users");
      const Point = userInfo.filter((item) => item.email == result.user.email);
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
              email: result.user.email,
              token: result.user.refreshToken,
              uid: result.user.uid,
              nick: result.user.displayName,
              number: item.number,
              name: item.name,
              address: item.address,
            })
          );
        });
        navigate("/");
      }
    });
  };
  const password = "";
  const onSubmit = ({ name, number }) => {
    console.log({ ...register("number") });
    joinUser(Info.uid, Info.email, password, {
      number: number,
      address: myAddress,
      farmAddress: "",
      name: name,
      nickname: Info.displayName,
      deleteYn: "N",
    });
    dispatch(
      setUser({
        email: Info.email,
        token: Info.refreshToken,
        uid: Info.uid,
        nick: Info.displayName,
        number: number,
        name: name,
      })
    );
    closeModal();
    // if(dashboard){} else{}
    navigate("/");
  };

  // navigator.geolocation.getCurrentPosition((position) => {});

  return (
    <Container className={styles.container}>
      <div className={styles.h1box}>
        <h1>로그인</h1>
      </div>
      <div className={styles.avatar}>
        <Avatar
          sx={{ m: 0, background: "var(--common-color)" }}
          style={{
            width: 80,
            height: 80,
          }}
        />
      </div>
      <div>
        <SignIn />
      </div>
      <div className={styles.buttons}>
        <Kakaoback />
        <button
          className={styles.googleBt}
          type="submit"
          onClick={SignInWithGoogle}
        >
          <div>
            <FcIcons.FcGoogle style={{ width: 30, height: 30 }} />
          </div>
          <div>
            <h2 className={styles.h2}>Google 로그인</h2>
          </div>
        </button>
      </div>
      <div className={styles.searchText}>
        <div>
          <Link to="/searchEm">E-mail 찾기</Link>
        </div>
        <div>
          <Link to="/searchPw">비밀번호 찾기</Link>
        </div>
      </div>
      <div className={styles.searchText}>
        <div>아직 회원이 아니신가요?</div>
        <div>
          <Link to={"/register"}>회원가입</Link>
        </div>
      </div>
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
                type="text"
                label={"전화번호(- 포함한 13자리)"}
                autoComplete="off"
                {...register("number")}
              />
            </div>
            <div>
              <h3 className={styles.h3Text}>주소</h3>
              <SearchAddr getAddr={SetmyAddress} />
            </div>
          </div>
        </form>
      </CustomModal>
    </Container>
  );
}

export default LoginPage;

// const api =
//   "iv2U4%2BpsJ7CRlDQ2ukixg4slrgEMjbIL%2FB%2B9pefVtqqEHGHhSRX7tNubbe2Y%2FGpjV59et7GLPJwxAdVe7iXycA%3D%3D";
// const apiurl = `/bestfarm/envdatarqst?serviceKey=${api}&searchFrmhsCode=81&returnType=json`;

// axios
//   .get(apiurl)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error("There was an error!", error);
//   });

// const servicekey = "D2KH68BM8I140W4B";
// const pageNo = "12";
// const numOfRows = "30";

// API 호출을 위한 URL 생성
// const apiurl = `/desaster/V2/api/DSSP-IF-00247?serviceKey=D2KH68BM8I140W4B&pageNo=${pageNo}&numOfRows=${numOfRows}`;
// // API 호출
// useEffect(() => {
//   axios
//     .get(apiurl)
//     .then((response) => {
//       // console.log(response);
//       response.data.body.forEach((result) => {
//         console.log(result.DST_SE_NM);
//       }); // 응답 데이터 출력
//     })
//     .catch((error) => {
//       console.error("There was an error!", error); // 오류 처리
//     });
// }, []);

// 재난 유형
// 산사태,조수,지진,폭염,풍수해,감염병,다중밀집건축물붕괴대형사고,산불,
// 초미세먼지,해양선박사고
