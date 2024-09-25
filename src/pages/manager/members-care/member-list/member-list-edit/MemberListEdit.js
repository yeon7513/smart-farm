import React, { useState } from 'react';
import FileInput from '../../../../../components/form/file-input/FileInput';
import styles from './MemberListEdit.module.scss';

function MemberListEdit({ detail, cancelEdit }) {
  const { email, name, nickname, photoUrl, createdAt, docId } = detail;
  const [values, setValues] = useState(detail);

  console.log(detail);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
