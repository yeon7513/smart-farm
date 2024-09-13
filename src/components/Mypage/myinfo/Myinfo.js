import React, { useEffect, useState } from "react";
import style from "./Myinfo.module.scss";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./../../../store/user/UserSlice";
import { updateDatas } from "../../../api/firebase";
import SearchAddr from "../../search-addr/SearchAddr";

function Myinfo(props) {
  const [NicknameState, SetnicknameState] = useState(false);
  const [nameState, SetnameState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [PasswordState, SetPasswordnameState] = useState(false);
  const [addressState, SetaddressState] = useState(false);
  const [sameAlert, SetsameAlert] = useState(false);
  const [toManyState, SetToManyState] = useState(false);
  const [localChange, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, [nameState]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSameNamethingConfirm = async () => {
    const SameName = items.filter((item) => {
      return item.name == inputValue;
    });
    console.log(SameName);
    if (SameName.length === 0) {
      SetsameAlert(false);
      alert("중복된게 없습니다.  테스트로 alert좀 썼어요!");
    } else {
      SetsameAlert(true);
      alert("중복된 이름입니다. 다시 입력해주세요. 테스트로 alert좀 썼어요!");
    }
  };
  const handleNameChange = async () => {
    if (nameState === true) {
      console.log(nameState);
      SetnameState(false);
      const SameNameChange = items.find((item) => {
        return item.name == localChange.name;
      });
      console.log(SameNameChange);
      const updateObj = {
        name: inputValue,
      };
      console.log(nameState);

      const { docId } = SameNameChange;
      await updateDatas("users", docId, updateObj);
      const updatedUser = { ...localChange, name: inputValue };
      setUser(updatedUser);
      // localChange.name = inputValue;
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      SetnameState(true);
    }
  };
  const handleSameNickNamethingConfirm = async () => {
    const SameName = items.filter((item) => {
      return item.nickname == inputValue;
    });
    if (SameName.length === 0) {
      SetsameAlert(false);
      alert("중복된게 없습니다.  테스트로 alert좀 썼어요!");
    } else {
      SetsameAlert(true);
      alert("중복된 이름입니다. 다시 입력해주세요. 테스트로 alert좀 썼어요!");
    }
  };
  const nickClick = async () => {
    if (NicknameState === true) {
      SetnicknameState(false);
      const SameNickNameChange = items.find((item) => {
        return item.nickname == localChange.nick;
      });
      const updateObj = {
        nickname: inputValue,
      };
      const { docId } = SameNickNameChange;
      await updateDatas("users", docId, updateObj);
      const updatedUser = { ...localChange, nick: inputValue };
      setUser(updatedUser);
      // localChange.nick = inputValue;
      localStorage.setItem("user", JSON.stringify(updatedUser));
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
          <div className={style.proTitle}>{localChange.nick} 님의 프로필</div>
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
          <div className={style.title}>{localChange.name}</div>
          {nameState === true ? (
            <button
              disabled={sameAlert}
              className={style.Change}
              onClick={handleNameChange}
            >
              변경 완료
            </button>
          ) : (
            <button onClick={handleNameChange}>이름 변경</button>
          )}
        </div>
        {nameState === true ? (
          <div className={style.double}>
            <input type="text" onChange={handleChange} />
            <button onClick={handleSameNamethingConfirm}>중복 확인</button>
          </div>
        ) : (
          ""
        )}
        <div className={style.name}>
          <div className={style.title}>{localChange.nick}</div>
          {NicknameState === true ? (
            <button
              disabled={sameAlert}
              className={style.Change}
              onClick={nickClick}
            >
              변경 완료
            </button>
          ) : (
            <button onClick={nickClick}>닉네임 변경</button>
          )}
        </div>
        {NicknameState === true ? (
          <div className={style.double}>
            <input onChange={handleChange} type="text" />
            <button onClick={handleSameNickNamethingConfirm}>중복 확인</button>
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
              <button onClick={nickClick2}>비밀번호 수정</button>
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
        <div className={style.homeTitle}>집 주소</div>
        <div className={style.name}>
          <div className={style.title}>{localChange.address}</div>
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
            <SearchAddr getAddr={SetToManyState} />{" "}
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
