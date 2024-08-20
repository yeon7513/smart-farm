import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/user/UserSlice";
import { getUserAuth } from "../../../api/firebase";
import Form from "../../../components/form/Form";

function SignIn(props) {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setFirebaseError("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };
  return (
    <Form
      title={"로그인"}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignIn;
