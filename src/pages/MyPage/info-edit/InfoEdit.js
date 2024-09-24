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
  const { items } = useSelector((state) => state.userSlice);

  const [values, setValues] = useState({ ...userInfo });
  const [homeAddr, setHomeAddr] = useState(userInfo?.address);

  const [checkNickName, setCheckNickName] = useState(false);
  const [checkPw, setCheckPw] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeValues = (e) => {
    let { name, value } = e.target;

    handleChange(name, value);
  };

  const handleNickNameCheckDuplication = (e) => {
    const { name, value } = e.target;

    const checkNickName = items.some((item) => item.nickname === value);

    if (checkNickName) {
      alert('중복된 닉네임');
    } else {
      handleChange(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addr = homeAddr.trim() === '' ? userInfo.address : homeAddr;

    const params = {
      collectionName: 'users',
      docId: values.docId,
      updateObj: { ...values, address: addr },
      photoUrl: userInfo.photoUrl,
    };

    dispatch(updateUserInfo(params));

    setCurrComp('IntroMyPage');
  };

  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  return (
    <form className={styles.myEdit} onSubmit={handleSubmit}>
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
        <div className={cn(styles.enable, styles.inputContainer)}>
          <TextInput
            type="text"
            name="nickname"
            value={values.nickname}
            placeholder="새로운 닉네임"
            onChange={handleNickNameCheckDuplication}
          />
          <label className={styles.enable}>닉네임</label>
          <span className={styles.highlight}></span>
          {/* <button type="button" onClick={handleNickNameCheckDuplication}>
            중복확인
          </button> */}
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
        <div className={cn(styles.enable, styles.inputContainer)}>
          <TextInput
            type="password"
            name="pw"
            placeholder="기존 비밀번호"
            onChange={handleChangeValues}
          />
          <label>기존 비밀번호</label>
          <span className={styles.highlight}></span>
        </div>
        <div className={cn(styles.enable, styles.inputContainer)}>
          <TextInput
            type="password"
            name="pwck"
            placeholder="새로운 비밀번호"
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
