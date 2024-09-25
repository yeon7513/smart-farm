import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileInput from '../../../../../components/form/file-input/FileInput';
import { updateUserInfo } from '../../../../../store/user/UserSlice';
import { changingNickName } from '../../../../../utils/transformNick';
import styles from './MemberListEdit.module.scss';

function MemberListEdit({ detail, cancelEdit, setUserDetail }) {
  const { email, name, nickname, photoUrl, createdAt, docId } = detail;
  const [newNickName, setNewNickName] = useState(nickname);
  const [values, setValues] = useState({
    ...detail,
    nickname: newNickName || detail.nickname,
  });

  const { isLoading } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomNickName = () => {
    const newRandomNickName = changingNickName();
    setNewNickName(newRandomNickName);
    handleChange('nickname', newRandomNickName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      collectionName: 'users',
      docId: docId,
      updateObj: { nickname: values.nickname, photoUrl: values.photoUrl },
      photoUrl: photoUrl,
    };

    console.log(params);

    try {
      await dispatch(updateUserInfo(params));

      if (isLoading === false) {
        cancelEdit(false);
        setUserDetail(values);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.memberEdit} onSubmit={handleSubmit}>
      <span>[FM{createdAt}]</span>
      <FileInput
        className={styles.memberProfile}
        setFile={handleChange}
        name="photoUrl"
        value={photoUrl}
        initialPreview={photoUrl}
      />
      <ul>
        <li>이메일: {email}</li>
        <li>이름: {name}</li>
        <li>
          <span>닉네임: </span>
          <input type="text" name="nickname" value={newNickName} readOnly />
          <button type="button" onClick={handleRandomNickName}>
            랜덤
          </button>
        </li>
      </ul>
      <div className={styles.btns}>
        <button type="submit">수정완료</button>
        <button type="button" onClick={() => cancelEdit(false)}>
          취소
        </button>
      </div>
    </form>
  );
}

export default MemberListEdit;
