import { Avatar, Container, styled } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as FcIcons from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDatas, getUserAuth } from "../../api/firebase";
import CustomModal from "../../components/modal/CustomModal";
import { setUser } from "../../store/user/UserSlice";
import Kakaoback from "./Kakaoback";
import styles from "./LoginPage.module.scss";
import SignIn from "./sign-in/SignIn";
import axios from "axios";

function LoginPage(props) {
  // const api = "D2KH68BM8I140W4B";
  // const apiurl = `/desaster?serviceKey=${api}/numOfRows=10/pageNo=10`;

  // axios
  //   .get(apiurl)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("There was an error!", error);
  //   });

  const servicekey = "D2KH68BM8I140W4B";
  const pageNo = "12";
  const numOfRows = "30";

  // API 호출을 위한 URL 생성
  const apiurl = `/desaster/V2/api/DSSP-IF-00247?serviceKey=D2KH68BM8I140W4B&pageNo=${pageNo}&numOfRows=${numOfRows}`;
  // API 호출
  useEffect(() => {
    axios
      .get(apiurl)
      .then((response) => {
        // console.log(response);
        response.data.body.forEach((result) => {
          console.log(result.DST_SE_NM);
        }); // 응답 데이터 출력
      })
      .catch((error) => {
        console.error("There was an error!", error); // 오류 처리
      });
  }, []);

  // 재난 유형
  // 산사태,조수,지진,폭염,풍수해,감염병,다중밀집건축물붕괴대형사고,산불,
  // 초미세먼지,해양선박사고
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // reset,
  } = useForm({
    mode: "onChange",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const auth = getUserAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userInfo = await getDatas("users");
    await signInWithPopup(auth, provider).then((result) => {
      // const userInfoConfirm = userInfo.filter(
      //   (item) => item.email == result.user.email
      // );
      // userInfoConfirm.forEach((item) => {
      navigate("/");
      dispatch(
        setUser({
          email: result.user.email,
          token: result.user.refreshToken,
          uid: result.user.uid,
          nick: result.user.displayName,
          number: result.user.number,
          // name: item.name,
        })
      );
      // });
      openModal();
    });
  };

  useEffect(() => {}, [loading, user, navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }
  // if (user) {
  //   navigate("/");
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });
  const getDataForm = async (userInfo) => {
    // await joinUser(u);
  };

  const onSubmit = ({ name, number, address }) => {
    getDataForm({
      name: name,
      number: number,
      address: address,
    });
  };

  return (
    <Container className={styles.container}>
      <div className={styles.form}>
        <h1>로그인</h1>
        <Avatar
          sx={{ mb: 4, background: "skyblue" }}
          style={{ width: 80, height: 80 }}
        />
        <SignIn />
        <div className={styles.buttons}>
          <div className={styles.button}>
            <button
              type="submit"
              sx={{ bgcolor: "secondary.main" }}
              onClick={SignInWithGoogle}
            >
              <div className={styles.googlebutton}>
                <FcIcons.FcGoogle />
                <b>Google</b>
              </div>
            </button>
          </div>
          <div className={styles.button}>
            <Kakaoback />
          </div>
        </div>
        <p>
          <Link to="/searchEm">Email 찾기</Link>
          <Link to="/searchPw">비밀번호 찾기</Link>
        </p>
        <p>
          아직 회원이 아니신가요? <Link to={"/register"}>회원가입</Link>
        </p>
      </div>
      <CustomModal
        title={"소셜 로그인 추가입력"}
        btnName={"확인하기"}
        isOpen={isModalOpen}
        handleClose={closeModal}
      >
        <div>
          <p>
            소셜 로그인시 추가적인 필수 입력 사항을 입력해주셔야 정상 이용
            가능합니다.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <input type="text" placeholder="이름" {...register("name")} />
              <input
                type="text"
                placeholder="전화번호"
                {...register("number")}
              />
              <input type="text" placeholder="주소" {...register("address")} />
            </div>
          </form>
          <input type="checkbox" />
          <span>주의사항을 확인했습니다.</span>
        </div>
      </CustomModal>
    </Container>
  );
}

export default LoginPage;
