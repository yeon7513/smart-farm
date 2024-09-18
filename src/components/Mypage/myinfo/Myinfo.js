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
  const [inputValueSub, setInputValueSub] = useState("");
  const [itemBox, setItemBox] = useState("");
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
  const handleChangeSub = (event) => {
    setInputValueSub(event.target.value);
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
      SetnameState(false);
      const SameNameChange = items.find((item) => {
        return item.name == localChange.name;
      });
      const updateObj = {
        name: inputValue,
      };
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
  const handleNickNameChange = async () => {
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
  const handlePasswordChange = async () => {
    if (PasswordState === true) {
      SetPasswordnameState(false);
      const SameNameChange = items.find((item) => {
        return item.name == localChange.name;
      });
      const updateObj = {
        password: inputValue,
      };
      setItemBox(SameNameChange);
      const { docId } = SameNameChange;
      if (inputValueSub == SameNameChange.password) {
        await updateDatas("users", docId, updateObj);
      }
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
          <div className={style.title}>
            <span>이름</span>
            <div className={style.namePosition}>{localChange.name}</div>
          </div>
          {nameState === true ? (
            <button
              disabled={sameAlert}
              className={style.Change}
              onClick={handleNameChange}
            >
              변경 완료
            </button>
          ) : (
            <button onClick={handleNameChange}>변경</button>
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
          <div className={style.title}>
            <span>닉네임</span>
            <div className={style.namePosition}>{localChange.nick}</div>
          </div>
          {NicknameState === true ? (
            <button
              disabled={sameAlert}
              className={style.Change}
              onClick={handleNickNameChange}
            >
              변경 완료
            </button>
          ) : (
            <button onClick={handleNickNameChange}>변경</button>
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
            <div className={style.title}>
              <span>비밀번호</span>
              <div className={style.namePosition}>{itemBox.password}</div>
            </div>
            {PasswordState === true ? (
              <button onClick={handlePasswordChange}>수정 완료</button>
            ) : (
              <button onClick={handlePasswordChange}>변경</button>
            )}
          </div>
          {PasswordState === true ? (
            <div className={style.password}>
              <div>기존 비밀번호</div>
              <input onChange={handleChangeSub} type="text" />
              <div>변경할 비밀번호</div>
              <input onChange={handleChange} type="text" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={style.homeTitle}>집 주소</div>
        <div className={style.name}>
          <div className={style.title}>
            {addressState == false ? `${localChange.address}` : toManyState}
          </div>
          {addressState === true ? (
            <button className={style.Change} onClick={nickClick3}>
              변경 완료
            </button>
          ) : (
            <button onClick={nickClick3}>변경</button>
          )}
        </div>
        {addressState === true ? <SearchAddr getAddr={SetToManyState} /> : ""}
        <div className={style.homeTitle}>농장 주소</div>
        <div className={style.name}>
          <div className={style.title}>
            {addressState == false ? `${localChange.address}` : toManyState}
          </div>
          {addressState === true ? (
            <button className={style.Change} onClick={nickClick3}>
              변경 완료
            </button>
          ) : (
            <button onClick={nickClick3}>변경</button>
          )}
        </div>
        {addressState === true ? <SearchAddr getAddr={SetToManyState} /> : ""}
      </div>
    </Container>
  );
}

export default Myinfo;
