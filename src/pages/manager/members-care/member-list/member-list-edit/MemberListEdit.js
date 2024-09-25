import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileInput from '../../../../../components/form/file-input/FileInput';
import { updateUserInfo } from '../../../../../store/user/UserSlice';
import styles from './MemberListEdit.module.scss';

function MemberListEdit({ detail, cancelEdit }) {
  const { email, name, nickname, photoUrl, createdAt, docId } = detail;
  const [values, setValues] = useState(detail);

  const { isLoading } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  console.log(detail);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      collectionName: 'users',
      docId: docId,
      updateObj: values,
      photoUrl: photoUrl,
    };

    try {
      await dispatch(updateUserInfo(params));

      if (isLoading === false) {
        cancelEdit(false);
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
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleInputChange}
          />
        </li>
      </ul>
      <div className={styles.btns}>
        <button type="submit" onClick={handleSubmit}>
          수정완료
        </button>
        <button type="button" onClick={() => cancelEdit(false)}>
          취소
        </button>
      </div>
    </form>
  );
}

export default MemberListEdit;
