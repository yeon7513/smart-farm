import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAuth, updateDatas } from "../../../api/firebase";
import CustomModal from "../../../components/modal/CustomModal";
import { fetchItems, removeUser } from "../../../store/user/UserSlice";
import Container from "./../../../components/layout/container/Container";
import style from "./Userout.module.scss";
import Card from "../../../components/card/Card";

function Userout(props) {
  const [state, setState] = useState(false);
  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, [dispatch]);

  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleChangeInput = async (e) => {
    setState(e.target.checked);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(removeUser());
      if (window.Kakao.Auth.getAccessToken()) {
        console.log("로그아웃 중입니다.");
        await new Promise((resolve) => {
          window.Kakao.Auth.logout(function () {
            console.log("로그아웃 성공");
            resolve();
          });
        });
      } else {
        console.log("로그인 상태가 아닙니다.");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserInfo = async () => {
    const deleteUser = items.find((item) => item.name === user.name);
    if (deleteUser) {
      const { docId } = deleteUser;
      const updateData = {
        deleteYn: "Y",
      };
      await updateDatas("users", docId, updateData);
    } else {
      console.error("User not found in items");
    }
    alert("탈퇴가 완료되었습니다.");
    handleLogout();
    navigate("/");
  };

  return (
    <Container className={style.container}>
      <Card>
        <div>
          <span>탈퇴</span> 시 회원님의 IFarm 이용정보가 <span>삭제</span>되며
          복구가 불가능하오니 신중히 선택하시기 바랍니다
        </div>
        <br />
        <div>
          회원 <span>탈퇴</span>와 함께 IFarm 에 등록된 모든 개인정보는{" "}
          <span>삭제</span>,<span>폐기</span> 처리되며 복구되지 않습니다.
          <br />
          <br /> 회원탈퇴 시 <span>동일 아이디</span>(이메일)로 재가입하실 수
          없습니다.
          <br />
          <br /> 단, 상법 및 '전자상거래 등에서 소비자 보호에 관한 법률' 등 관련
          법령의 규정에 의하여 다음과 같이 ‘거래 관련 관리의무 관계 확인’ 등을
          이유로 보관됩니다.
          <br />
          <br />
          <div>- 계약 또는 청약 철회등에 관한 기록 : 5년</div>
          <div>- 대금결제 및 재화 등의 공급에 관한 기록 : 5년</div>
          <div>- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</div>
          <div>
            - 설문조사, 이벤트 등 일시적 목적을 위하여 수집한 경우 : 당해 설
            문조사, 이벤트 등의 종료 시까지
          </div>
        </div>
        <br />
        <div className={style.check}>
          <input type="checkbox" onChange={handleChangeInput} />
          <span>주의사항</span>을 확인했습니다.
        </div>
      </Card>
      <button
        disabled={!state}
        className={style.lastConfirm}
        onClick={deleteUserInfo}
      >
        <h1>탈퇴하기</h1>
      </button>
    </Container>
  );
}
export default Userout;
