import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAuth, joinUser } from "../../../api/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Form from "./../../../components/form/Form";
import { setUser } from "../../../store/user/UserSlice";

function SingUp(props) {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignupAndLogin = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const { user } = userCredential;
      await joinUser(user.uid, user.email);
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
    <div>
      <Form
        title={"회원가입"}
        getDataForm={handleSignupAndLogin}
        firebaseError={firebaseError}
      />
    </div>
  );
}
export default SingUp;
