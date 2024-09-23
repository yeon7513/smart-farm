import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './InfoEdit.module.scss';

function InfoEdit() {
  // const [NicknameState, SetnicknameState] = useState(false);
  // const [nameState, SetnameState] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  // const [inputValueSub, setInputValueSub] = useState('');
  // const [inputValueThird, setInputValueThird] = useState('');
  // const [passwordState, setPasswordState] = useState('');
  // const [passwordInfo, setPasswordInfoState] = useState('');
  // const [addressState, SetaddressState] = useState(false);
  // const [sameAlert, SetsameAlert] = useState(false);
  // const [toManyState, SetToManyState] = useState('');

  // const { items } = useSelector((state) => state.userSlice);
  // useEffect(() => {
  //   dispatch(fetchItems({ collectionName: 'users' }));
  //   const passwordSameThing = items.find((item) => {
  //     return item.email === localChange.email;
  //   });
  //   setPasswordInfoState(passwordSameThing?.password);
  // }, [nameState, NicknameState, items]);

  // const handleChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  // const handleChangeSub = (event) => {
  //   setInputValueSub(event.target.value);
  // };
  // const handleChangeThird = (event) => {
  //   setInputValueThird(event.target.value);
  // };

  // const handleSameNamethingConfirm = async () => {
  //   const SameName = items.filter((item) => {
  //     return item.name === inputValue;
  //   });
  //   if (SameName.length === 0) {
  //     SetsameAlert(false);
  //     alert('중복된게 없습니다.  테스트로 alert좀 썼어요!');
  //   } else {
  //     SetsameAlert(true);
  //     alert('중복된 이름입니다. 다시 입력해주세요. 테스트로 alert좀 썼어요!');
  //   }
  // };
  // const handleNameChange = async () => {
  //   if (nameState === true) {
  //     SetnameState(false);
  //     const SameNameChange = items.find((item) => {
  //       return item.name === localChange.name;
  //     });
  //     const updateObj = {
  //       name: inputValue,
  //     };
  //     const { docId } = SameNameChange;
  //     if (updateObj.name.length !== 0) {
  //       await updateDatas('users', docId, updateObj);
  //       const updatedUser = { ...localChange, name: inputValue };
  //       setUser(updatedUser);
  //       localStorage.setItem('user', JSON.stringify(updatedUser));
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     SetnameState(true);
  //   }
  // };
  // const handleSameNickNamethingConfirm = async () => {
  //   const SameName = items.filter((item) => {
  //     return item.nickname === inputValueSub;
  //   });
  //   console.log(SameName);
  //   if (SameName.length === 0) {
  //     SetsameAlert(false);
  //     alert('중복된게 없습니다.  테스트로 alert좀 썼어요!');
  //   } else {
  //     SetsameAlert(true);
  //     alert('중복된 이름입니다. 다시 입력해주세요. 테스트로 alert좀 썼어요!');
  //   }
  // };
  // const handleNickNameChange = async () => {
  //   if (NicknameState === true) {
  //     SetnicknameState(false);
  //     const SameNickNameChange = items.find((item) => {
  //       return item.nickname === localChange.nick;
  //     });
  //     const updateObj = {
  //       nickname: inputValueSub,
  //     };
  //     const { docId } = SameNickNameChange;
  //     if (updateObj.nickname.length !== 0) {
  //       await updateDatas('users', docId, updateObj);
  //       const updatedUser = { ...localChange, nick: inputValueSub };
  //       setUser(updatedUser);
  //       localStorage.setItem('user', JSON.stringify(updatedUser));
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     SetnicknameState(true);
  //   }
  // };

  // const handlePasswordChange = async () => {
  //   if (passwordState === true) {
  //     setPasswordState(false);
  //     const passwordChange = items.find((item) => {
  //       return item.name === localChange.name;
  //     });
  //     const updateObj = {
  //       ...passwordChange,
  //       password: inputValueThird,
  //     };
  //     const { docId } = passwordChange;
  //     if (updateObj.password.length !== 0) {
  //       if (inputValueThird !== passwordChange.password) {
  //         await updateDatas('users', docId, updateObj);
  //       } else {
  //         return false;
  //       }
  //     }
  //   } else {
  //     setPasswordState(true);
  //     SetsameAlert(false);
  //   }
  // };
  // const handlePasswordConfirm = async () => {
  //   const passwordSameThing = items.find((item) => {
  //     return item.name === localChange.name;
  //   });
  //   if (passwordSameThing.password === inputValueSub) {
  //     SetsameAlert(true);
  //   } else {
  //     alert('비밀번호가 틀립니다.');
  //   }
  // };
  // const handleAddressChange = async () => {
  //   if (addressState === true) {
  //     SetaddressState(false);
  //     const addressSameThing = items.find((item) => {
  //       return item.name === localChange.name;
  //     });
  //     const updateObj = {
  //       ...addressSameThing,
  //       address: toManyState,
  //     };

  //     const { docId } = addressSameThing;
  //     if (toManyState.length > 1) {
  //       if (addressSameThing.address !== toManyState) {
  //         await updateDatas('users', docId, updateObj);
  //         const updatedUser = { ...localChange, address: toManyState };
  //         setUser(updatedUser);
  //         localStorage.setItem('user', JSON.stringify(updatedUser));
  //       }
  //     } else if (toManyState.length <= 1) {
  //       return false;
  //     }
  //   } else {
  //     SetaddressState(true);
  //   }
  // };

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  console.log(userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return <div className={styles.myEdit}></div>;
}

export default InfoEdit;
