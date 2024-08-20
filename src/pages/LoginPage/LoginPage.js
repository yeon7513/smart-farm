import React from "react";
import SignIn from "./sign-in/SignIn";
import Button from "@mui/material/Button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { cyan, purple, teal } from "@mui/material/colors";
import * as FcIcons from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { getUserAuth, joinUser } from "../../api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/UserSlice";

function LoginPage(props) {
  const auth = getUserAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = auth.currentUser;
  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((result) => {
      navigate("/");
    });
    dispatch(setUser({ email: users?.email }));
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate("/");
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <h1>로그인</h1>
        <SignIn />
        <button
          type="submit"
          sx={{ bgcolor: "secondary.main" }}
          onClick={SignInWithGoogle}
        >
          <FcIcons.FcGoogle />
          <span>
            <b>Google</b>
          </span>
        </button>
        <p>
          <Link>Email 찾기</Link>| <Link>비밀번호 찾기</Link>
        </p>
        <p>
          아직 회원이 아니신가요? <Link to={"/register"}>회원가입</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
