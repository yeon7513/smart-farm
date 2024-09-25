import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/text-input/TextInput';
import SearchAddr from '../../../components/search-addr/SearchAddr';
import { useComponentContext } from '../../../context/ComponentContext';
import { fetchItems, updateUserInfo } from '../../../store/user/UserSlice';
import FileInput from './../../../components/form/file-input/FileInput';
import styles from './InfoEdit.module.scss';

function InfoEdit() {
  const { setCurrComp } = useComponentContext();
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const { items, isLoading } = useSelector((state) => state.userSlice);

  const [values, setValues] = useState({ ...userInfo });
  const [homeAddr, setHomeAddr] = useState(userInfo?.address);

  const [checkNickName, setCheckNickName] = useState(false);
  const [checkPw, setCheckPw] = useState(false);

  const dispatch = useDispatch();

  // 업데이트용 객체 생성
  const handleChange = (name, value) => {
    console.log('handleChange: ', value);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // 텍스트용 핸들러
  const handleChangeValues = (e) => {
    let { name, value } = e.target;

    handleChange(name, value);
  };

  // 닉네임 중복 확인
  const handleNickNameCheckDuplication = (e) => {
    const { name, value } = e.target;

    const nickNameCheck = items.some((item) => item.nickname === value);

    if (value !== '' && !nickNameCheck) {
      // 중복이 없을 경우
      setCheckNickName(false);
      handleChange(name, value);
    } else if (value === '' || nickNameCheck) {
      // 중복이 있을 경우
      setCheckNickName(true);
      handleChange(name, value);
    }
  };

  // 기존 비밀번호 체크
  const handleCheckPw = (e) => {
    const pw = e.target.value;

    const pwCheck = items.some((item) => item.password === pw);
    // 일치하면 true, 불일치하면 false 나온다.

    if (pw === '' || !pwCheck) {
      // 비밀번호가 일치하지 않을 경우
      setCheckPw(true);
      console.log('비밀번호 불일치');
    } else if (pw !== '' && pwCheck) {
      // 비밀번호가 일치할 경우
      setCheckPw(false);
      console.log('비밀번호 일치');
    }
  };

  // 파이어베이스 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    const addr = homeAddr.trim() === '' ? userInfo.address : homeAddr;

    const params = {
      collectionName: 'users',
      docId: values.docId,
      updateObj: { ...values, address: addr },
      photoUrl: userInfo.photoUrl,
    };

    try {
      await dispatch(updateUserInfo(params));
      console.log(isLoading);

      if (isLoading === false) {
        setCurrComp('IntroMyPage');
      }
    } catch (error) {
      console.error('My Info Update Error: ', error);
    }
  };

  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  return (
    <form
      className={isLoading ? cn(styles.myEdit, styles.loading) : styles.myEdit}
      onSubmit={handleSubmit}
    >
      <FileInput
        selected={true}
        className={styles.imgUpload}
        initialPreview={values.photoUrl}
        setFile={handleChange}
        name="photoUrl"
        value={values.photoUrl}
      />
      <div className={styles.content}>
        <div className={cn(styles.disable, styles.inputContainer)}>
          <TextInput
            type="text"
            name="email"
            value={values.email}
            isDisabled={true}
          />
          <label>이메일</label>
        </div>
        <div className={cn(styles.disable, styles.inputContainer)}>
          <TextInput
            type="text"
            name="name"
            value={values.name}
            isDisabled={true}
          />
          <label>이름</label>
        </div>
        <div
          className={cn(
            styles.enable,
            styles.inputContainer,
            !checkNickName ? '' : styles.error
          )}
        >
          <TextInput
            type="text"
            name="nickname"
            value={values.nickname}
            placeholder="새로운 닉네임"
            onChange={handleNickNameCheckDuplication}
          />
          <label className={styles.enable}>닉네임</label>
          <span className={styles.highlight}></span>
        </div>
        <div className={cn(styles.enable, styles.inputContainer)}>
          <TextInput
            type="text"
            name="number"
            value={values.number}
            placeholder="000-0000-0000"
            onChange={handleChangeValues}
          />
          <label>연락처</label>
          <span className={styles.highlight}></span>
        </div>
        <div
          className={cn(
            styles.enable,
            styles.inputContainer,
            !checkPw ? '' : styles.error
          )}
        >
          <TextInput
            type="password"
            name="pw"
            placeholder="기존 비밀번호"
            onChange={handleCheckPw}
          />
          <label>기존 비밀번호</label>
          <span className={styles.highlight}></span>
        </div>
        <div className={cn(styles.enable, styles.inputContainer)}>
          <TextInput
            type="password"
            name="pwck"
            placeholder="새로운 비밀번호"
            isDisable={checkPw}
            onChange={handleChangeValues}
          />
          <label>새로운 비밀번호</label>
          <span className={styles.highlight}></span>
        </div>
        <SearchAddr getAddr={setHomeAddr} className={styles.homeAddrSearch} />
        <div className={styles.btns}>
          <button type="submit">수정</button>
          <button type="button" onClick={() => setCurrComp('IntroMyPage')}>
            취소
          </button>
        </div>
      </div>
    </form>
  );
}

export default InfoEdit;
