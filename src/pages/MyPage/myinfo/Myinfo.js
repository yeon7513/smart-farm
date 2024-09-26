import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDatas } from '../../../api/firebase';
import Container from '../../../components/layout/container/Container';
import SearchAddr from '../../../components/search-addr/SearchAddr';
import { fetchItems } from '../../../store/user/UserSlice';
import style from './Myinfo.module.scss';

function Myinfo(props) {
  const [NicknameState, SetnicknameState] = useState(false);
  const [nameState, SetnameState] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValueSub, setInputValueSub] = useState('');
  const [inputValueThird, setInputValueThird] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordInfo, setPasswordInfoState] = useState('');
  const [addressState, SetaddressState] = useState(false);
  const [sameAlert, SetsameAlert] = useState(false);
  const [toManyState, SetToManyState] = useState('');
  const [localChange, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );
  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
    const passwordSameThing = items.find((item) => {
      return item.email === localChange.email;
    });
    setPasswordInfoState(passwordSameThing?.password);
  }, [nameState, NicknameState, items]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleChangeSub = (event) => {
    setInputValueSub(event.target.value);
  };
  const handleChangeThird = (event) => {
    setInputValueThird(event.target.value);
  };

  const handleSameNamethingConfirm = async () => {
    const SameName = items.filter((item) => {
      return item.name === inputValue;
    });
    if (SameName.length === 0) {
      SetsameAlert(false);
      alert('중복된게 없습니다.  테스트로 alert좀 썼어요!');
    } else {
      SetsameAlert(true);
      alert('중복된 이름입니다. 다시 입력해주세요. 테스트로 alert좀 썼어요!');
    }
  };
  const handleNameChange = async () => {
    if (nameState === true) {
      SetnameState(false);
      const SameNameChange = items.find((item) => {
        return item.name === localChange.name;
      });
      const updateObj = {
        name: inputValue,
      };
      const { docId } = SameNameChange;
      if (updateObj.name.length !== 0) {
        await updateDatas('users', docId, updateObj);
        const updatedUser = { ...localChange, name: inputValue };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        return false;
      }
    } else {
      SetnameState(true);
    }
  };
  const handleSameNickNamethingConfirm = async () => {
    const SameName = items.filter((item) => {
      return item.nickname === inputValueSub;
    });
    console.log(SameName);
    if (SameName.length === 0) {
      SetsameAlert(false);
      alert('중복된게 없습니다.  테스트로 alert좀 썼어요!');
    } else {
      SetsameAlert(true);
      alert('중복된 이름입니다. 다시 입력해주세요. 테스트로 alert좀 썼어요!');
    }
  };
  const handleNickNameChange = async () => {
    if (NicknameState === true) {
      SetnicknameState(false);
      const SameNickNameChange = items.find((item) => {
        return item.nickname === localChange.nick;
      });
      const updateObj = {
        nickname: inputValueSub,
      };
      const { docId } = SameNickNameChange;
      if (updateObj.nickname.length !== 0) {
        await updateDatas('users', docId, updateObj);
        const updatedUser = { ...localChange, nick: inputValueSub };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        return false;
      }
    } else {
      SetnicknameState(true);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordState === true) {
      setPasswordState(false);
      const passwordChange = items.find((item) => {
        return item.name === localChange.name;
      });
      const updateObj = {
        ...passwordChange,
        password: inputValueThird,
      };
      const { docId } = passwordChange;
      if (updateObj.password.length !== 0) {
        if (inputValueThird !== passwordChange.password) {
          await updateDatas('users', docId, updateObj);
        } else {
          return false;
        }
      }
    } else {
      setPasswordState(true);
      SetsameAlert(false);
    }
  };
  const handlePasswordConfirm = async () => {
    const passwordSameThing = items.find((item) => {
      return item.name === localChange.name;
    });
    if (passwordSameThing.password === inputValueSub) {
      SetsameAlert(true);
    } else {
      alert('비밀번호가 틀립니다.');
    }
  };
  const handleAddressChange = async () => {
    if (addressState === true) {
      SetaddressState(false);
      const addressSameThing = items.find((item) => {
        return item.name === localChange.name;
      });
      const updateObj = {
        ...addressSameThing,
        address: toManyState,
      };

      const { docId } = addressSameThing;
      if (toManyState.length > 1) {
        if (addressSameThing.address !== toManyState) {
          await updateDatas('users', docId, updateObj);
          const updatedUser = { ...localChange, address: toManyState };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } else if (toManyState.length <= 1) {
        return false;
      }
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
              backgroundColor: 'secondary.main',
              width: '120px',
              height: '120px',
              type: 'file',
            }}
          />
          <button type="file" className={style.photo}>
            사진 변경
          </button>
        </div>
        <div className={style.name}>
          <div className={style.titleName}>
            <span>이름</span>
          </div>
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
            <button onClick={handleNameChange}>변경</button>
          )}
        </div>
        {nameState === true ? (
          <div className={style.double}>
            <input
              className={style.input}
              type="text"
              onChange={handleChange}
            />
            <button onClick={handleSameNamethingConfirm}>중복 확인</button>
          </div>
        ) : (
          ''
        )}
        <div className={style.name}>
          <div className={style.titleName}>
            <span>닉네임</span>
          </div>
          <div className={style.title}>{localChange.nick}</div>
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
            <input
              className={style.input}
              onChange={handleChangeSub}
              type="text"
            />
            <button onClick={handleSameNickNamethingConfirm}>중복 확인</button>
          </div>
        ) : (
          ''
        )}

        <div>
          <div className={style.name}>
            <div className={style.titleName}>
              <span>비밀번호</span>
            </div>
            <div className={style.title}>{passwordInfo}</div>
            {passwordState === true ? (
              <button onClick={handlePasswordChange}>수정 완료</button>
            ) : (
              <button onClick={handlePasswordChange}>변경</button>
            )}
          </div>
          {passwordState === true ? (
            <div className={style.password}>
              <p>기존 비밀번호</p>
              <div className={style.passwordInput}>
                <input
                  disabled={sameAlert}
                  className={style.input}
                  onChange={handleChangeSub}
                  type="password"
                />
                <button disabled={sameAlert} onClick={handlePasswordConfirm}>
                  확인
                </button>
              </div>
              <p>변경할 비밀번호</p>
              <div className={style.passwordInput}>
                <input
                  className={style.input}
                  onChange={handleChangeThird}
                  type="password"
                />
                <button className={style.secretButton}>확인</button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={style.name}>
          <div className={style.titleName}>
            <span>집</span>
          </div>
          <div className={style.title}>{localChange.address}</div>
          {addressState === true ? (
            <button className={style.Change} onClick={handleAddressChange}>
              변경 완료
            </button>
          ) : (
            <button onClick={handleAddressChange}>변경</button>
          )}
        </div>
        {addressState === true ? <SearchAddr getAddr={SetToManyState} /> : ''}
      </div>
    </Container>
  );
}

export default Myinfo;
