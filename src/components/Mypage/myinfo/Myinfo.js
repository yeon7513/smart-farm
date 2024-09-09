import React, { useState } from "react";
import style from "./Myinfo.module.scss";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Myinfo(props) {
  const [NicknameState, SetnicknameState] = useState(false);
  const [nameState, SetnameState] = useState(false);
  const [PasswordState, SetPasswordnameState] = useState(false);
  const [addressState, SetaddressState] = useState(false);
  const navigate = useNavigate();

  const nickClick = () => {
    if (NicknameState === true) {
      SetnicknameState(false);
    } else {
      SetnicknameState(true);
    }
  };

  const nickClick1 = () => {
    if (nameState === true) {
      SetnameState(false);
    } else {
      SetnameState(true);
    }
  };
  const nickClick2 = () => {
    if (PasswordState === true) {
      SetPasswordnameState(false);
    } else {
      SetPasswordnameState(true);
    }
  };
  const nickClick3 = () => {
    if (addressState === true) {
      SetaddressState(false);
    } else {
      SetaddressState(true);
    }
  };
  const CompleteButton = () => {
    navigate("/mypage");
  };

  // 유저 정보 불러오기
  const user = JSON.parse(localStorage.getItem("user")) || "";

  return (
    <Container className={style.container}>
      <div className={style.headers}>
        <div className={style.profile}>
          <div>프로필 사진</div>
          <Avatar
            sx={{
              m: 3,
              backgroundColor: "secondary.main",
              width: "70px",
              height: "70px",
              type: "file",
            }}
          />
          <button type="file" className={style.photo}>
            사진 변경
          </button>
        </div>
        <div className={style.name}>
          <div className={style.title}>{user.name}</div>
          {nameState === true ? (
            <button className={style.Change} onClick={nickClick1}>
              변경 완료
            </button>
          ) : (
            <button onClick={nickClick1}>이름 변경</button>
          )}
        </div>
        {nameState === true ? (
          <div className={style.double}>
            <input type="text" />
            <button>중복 확인</button>
          </div>
        ) : (
          ""
        )}
        <div className={style.name}>
          <div className={style.title}>{user.nick}</div>
          {NicknameState === true ? (
            <button className={style.Change} onClick={nickClick}>
              변경 완료
            </button>
          ) : (
            <button onClick={nickClick}>닉네임 변경</button>
          )}
        </div>
        {NicknameState === true ? (
          <div className={style.double}>
            <input type="text" />
            <button>중복 확인</button>
          </div>
        ) : (
          ""
        )}

        <div>
          <div className={style.name}>
            <div className={style.title}>비밀번호</div>
            {PasswordState === true ? (
              <button onClick={nickClick2}>수정 완료</button>
            ) : (
              <button onClick={nickClick2}>수정</button>
            )}
          </div>
          {PasswordState === true ? (
            <div className={style.password}>
              <div>기존 비밀번호</div>
              <input type="text" />
              <div>변경할 비밀번호</div>
              <input type="text" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={style.title}>집 주소</div>
        <div className={style.name}>
          <div className={style.title}>{user.address}</div>
          {addressState === true ? (
            <button className={style.Change} onClick={nickClick3}>
              변경 완료
            </button>
          ) : (
            <button onClick={nickClick3}>주소 변경</button>
          )}
        </div>
        {addressState === true ? (
          <div>
            <div>주소 API</div>
            <input className={style.header} type="text" />
          </div>
        ) : (
          ""
        )}
        <button className={style.complete} onClick={CompleteButton}>
          변경 완료
        </button>
      </div>
    </Container>
  );
}

export default Myinfo;
