import React, { useEffect, useState } from "react";
import style from "./Myinfo.module.scss";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./../../../store/user/UserSlice";
import { updateDatas } from "../../../api/firebase";

function Myinfo(props) {
  const [NicknameState, SetnicknameState] = useState(false);
  const [nameState, SetnameState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [PasswordState, SetPasswordnameState] = useState(false);
  const [addressState, SetaddressState] = useState(false);
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, [user]);

  // 유저 정보 불러오기
  // let userUpdate = JSON.parse(localStorage.getItem("user"));

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSamethingConfirm = async (content) => {
    const SameName = items.filter((item) => {
      return item == inputValue;
    });
    console.log(SameName);
    if (SameName.length === 0) {
      alert("중복된게 없습니다.  테스트로 alert좀 썼어요!");
    } else {
      alert("중복된 이름입니다. 다시 입력해주세요. 테스트로 alert좀 썼어요!");
    }
  };

  const handleNameChange = async () => {
    if (nameState === true) {
      SetnameState(false);
      const SameNameChange = items.find((item) => {
        return item.name == user.name;
      });
      const updateObj = {
        name: inputValue,
      };
      const { docId } = SameNameChange;
      await updateDatas("users", docId, updateObj);
      user.name = inputValue;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      SetnameState(true);
    }
  };
  const nickClick = () => {
    if (NicknameState === true) {
      SetnicknameState(false);
    } else {
      SetnicknameState(true);
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
            <button className={style.Change} onClick={handleNameChange}>
              변경 완료
            </button>
          ) : (
            <button onClick={handleNameChange}>이름 변경</button>
          )}
        </div>
        {nameState === true ? (
          <div className={style.double}>
            <input type="text" onChange={handleChange} />
            <button onClick={handleSamethingConfirm}>중복 확인</button>
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
            <input onChange={handleChange} type="text" />
            <button onClick={handleSamethingConfirm}>중복 확인</button>
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
