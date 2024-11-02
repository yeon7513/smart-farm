import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import Container from "../../../components/layout/container/Container";
import { fetchItems } from "../../../store/user/UserSlice";
import EmailButton from "./EmailButton";
import styles from "./SearchPw.module.scss";

function SearchPw(props) {
  const [state, setState] = useState([]);
  const [renderring, setRendering] = useState(false);
  const [isdisabled, setIsDisabled] = useState(false);
  const [temperPassword, setTemperPassword] = useState();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.userSlice);
  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, [dispatch]);
  const handleInputNum = async (name, password, email) => {
    const resultData = items.filter((item) => {
      return item.name === name && item.email === email;
    });
    resultData.forEach((item) => {
      setState(item);
      setTemperPassword(item.password.slice(0, 7));
    });
    setRendering(true);
  };

  return (
    <Container className={styles.container}>
      <div className={styles.title}>
        <h1>비밀번호 찾기</h1>
        <h3>
          소셜(Google, Kakao)이 아닌 <span>일반 회원가입</span>만 가능합니다.
        </h3>
      </div>
      <Form
        getDataForm={handleInputNum}
        title={"비밀번호 찾기"}
        inputName1={"이름"}
        inputName2={"이메일 입력"}
        type={"text"}
        type2={"email"}
        user={state}
      />
      <EmailButton
        getDataForm={temperPassword}
        user={state}
        renderring={renderring}
        setIsDisabled={setIsDisabled}
        isdisabled={isdisabled}
      />
      {/* {isdisabled && */}
      {/* <div>{decryptPassword(encryptedPassword)}</div> */}
      {/* } */}
    </Container>
  );
}

export default SearchPw;
