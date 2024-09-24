import React, { useEffect, useRef, useState } from 'react';
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
  const nickRef = useRef();

  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeValues = (e) => {
    let { name, value } = e.target;

    handleChange(name, value);
  };

  const handleNickNameCheckDuplication = () => {
    const { name, value } = nickRef.current;

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
        <div className={styles.disabled}>
          <TextInput
            type="text"
            name="email"
            value={values.email}
            isDisabled={true}
          />
          <label>이메일</label>
          <span className={styles.highlight}></span>
        </div>
        <div className={styles.disabled}>
          <TextInput
            type="text"
            name="name"
            value={values.name}
            isDisabled={true}
          />
          <label>이름</label>
          <span className={styles.highlight}></span>
        </div>
        <div className={styles.enable}>
          <TextInput
            type="text"
            name="nickname"
            ref={nickRef}
            defaultValue={values.nickname}
            placeholder="새로운 닉네임"
          />
          <label className={styles.enable}>닉네임</label>
          <button type="button" onClick={handleNickNameCheckDuplication}>
            중복확인
          </button>
          <span className={styles.highlight}></span>
        </div>
        <label className={styles.enable}>
          <span className={styles.highlight}>연락처</span>
          <TextInput
            type="text"
            name="number"
            value={values.number}
            placeholder="000-0000-0000"
            onChange={handleChangeValues}
          />
        </label>
        <label className={styles.enable}>
          <span className={styles.highlight}>비밀번호</span>
          <TextInput
            type="password"
            name="pw"
            placeholder="기존 비밀번호"
            onChange={handleChangeValues}
          />
        </label>
        <label className={styles.enable}>
          <span className={styles.highlight}>비밀번호</span>
          <TextInput
            type="password"
            name="pwck"
            placeholder="새로운 비밀번호"
            onChange={handleChangeValues}
          />
        </label>
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
