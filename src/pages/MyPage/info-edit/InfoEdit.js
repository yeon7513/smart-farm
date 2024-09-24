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
  const [homeAddr, setHomeAddr] = useState(userInfo.address);
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

    const params = {
      collectionName: 'users',
      docId: values.docId,
      updateObj: { address: homeAddr, ...values },
      photoUrl: values.photoUrl,
    };

    console.log(params);

    dispatch(updateUserInfo(params));
    localStorage.setItem('user', JSON.stringify(params.updateObj));
  };

  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  useEffect(() => {
    return () => setHomeAddr('');
  }, []);

  return (
    <form className={styles.myEdit} onSubmit={handleSubmit}>
      <div className={styles.profile}>
        <FileInput
          selected={true}
          className={styles.imgUpload}
          initialPreview={values.photoUrl}
          setFile={handleChange}
          name="photoUrl"
          value={values.photoUrl}
        />
      </div>
      <div className={styles.content}>
        <label>
          <span>이메일</span>
          <TextInput
            type="text"
            name="email"
            value={values.email}
            isDisabled={true}
          />
        </label>
        <label>
          <span>이름</span>
          <TextInput
            type="text"
            name="name"
            value={values.name}
            isDisabled={true}
          />
        </label>
        <label>
          <span>닉네임</span>
          <TextInput
            type="text"
            name="nickname"
            ref={nickRef}
            defaultValue={values.nickname}
            placeholder="새로운 닉네임"
          />
          <button type="button" onClick={handleNickNameCheckDuplication}>
            중복확인
          </button>
        </label>
        <label>
          <span>연락처</span>
          <TextInput
            type="text"
            name="number"
            value={values.number}
            placeholder="000-0000-0000"
            onChange={handleChangeValues}
          />
        </label>
        <label>
          <span>비밀번호</span>
          <TextInput
            type="password"
            name="pw"
            placeholder="새로운 비밀번호"
            onChange={handleChangeValues}
          />
        </label>
        <label>
          <span>비밀번호 확인</span>
          <TextInput
            type="password"
            name="pwck"
            placeholder="비밀번호 확인"
            onChange={handleChangeValues}
          />
        </label>
        <SearchAddr getAddr={setHomeAddr} className={styles.homeAddrSearch} />
      </div>
      <button type="submit">수정</button>
      <button type="button" onClick={() => setCurrComp('IntroMyPage')}>
        취소
      </button>
    </form>
  );
}

export default InfoEdit;
