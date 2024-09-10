import { Avatar, Container, TextField } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as FcIcons from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDatas, getUserAuth, joinUser } from "../../api/firebase";
import CustomModal from "../../components/modal/CustomModal";
import { setUser } from "../../store/user/UserSlice";
import Kakaoback from "./Kakaoback";
import styles from "./LoginPage.module.scss";
import SignIn from "./sign-in/SignIn";
import SearchAddr from "../../components/search-addr/SearchAddr";

function LoginPage() {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myAddress, SetmyAddress] = useState();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const auth = getUserAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Info = auth.currentUser;
  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (result) => {
      const userInfo = await getDatas("users");
      const Point = userInfo?.filter(
        (item) => item?.email == result.user?.email
      );
      if (Point.length === 0) {
        openModal();
      }
      Point.forEach((item) => {
        dispatch(
          setUser({
            email: result.user.email,
            token: result.user.refreshToken,
            uid: result.user.uid,
            nick: result.user.displayName,
            number: item.number,
            name: item.name,
          })
        );
      });
    });
  };
  //

  const password = "";
  const onSubmit = ({ name, number }) => {
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
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (user) {
  //   navigate("/");
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // navigator.geolocation.getCurrentPosition((position) => {});

  return (
    <Container className={styles.container}>
      <div>
        <h1>로그인</h1>
      </div>
      <div>
        <Avatar
          sx={{ mb: 4, background: "skyblue" }}
          style={{ width: 80, height: 80 }}
        />
      </div>
      <div>
        <SignIn />
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.googleBt}
          type="submit"
          onClick={SignInWithGoogle}
        >
          <div>
            <FcIcons.FcGoogle style={{ width: 40, height: 40 }} />
          </div>
          <div>
            <h2>Google</h2>
          </div>
        </button>

        <Kakaoback />
      </div>
      <div>
        <p className={styles.searchText}>
          <Link to="/searchEm">E-mail 찾기</Link>

          <Link to="/searchPw">비밀번호 찾기</Link>
        </p>
      </div>
      <div>
        <p>
          아직 회원이 아니신가요? &nbsp; <Link to={"/register"}>회원가입</Link>
        </p>
      </div>
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
                type="text"
                label={"전화번호"}
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
