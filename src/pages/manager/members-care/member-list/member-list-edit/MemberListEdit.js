import React, { useState } from 'react';
import { LiaRandomSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import FileInput from '../../../../../components/form/file-input/FileInput';
import { updateUserInfo } from '../../../../../store/user/UserSlice';
import { changingNickName } from '../../../../../utils/transformNick';
import styles from './MemberListEdit.module.scss';

function MemberListEdit({ docId, cancelEdit }) {
  const { items, isLoading } = useSelector((state) => state.userSlice);

  const member = items.find((item) => item.docId === docId);

  const [values, setValues] = useState({
    nickname: member.nickname,
    photoUrl: member.photoUrl,
  });
  const [newNickName, setNewNickName] = useState(member.nickname);

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
      updateObj: values,
      photoUrl: member.photoUrl,
    };

    try {
      dispatch(updateUserInfo(params));

      if (isLoading === false) {
        await cancelEdit();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.memberEdit} onSubmit={handleSubmit}>
      <FileInput
        className={styles.memberProfile}
        setFile={handleChange}
        name="photoUrl"
        value={values.photoUrl}
        initialPreview={member.photoUrl}
        selected={true}
      />
      <div className={styles.content}>
        <span className={styles.memberId}>[FM{member.createdAt}]</span>
        <ul className={styles.info}>
          <li>
            <span className={styles.label}>이메일</span>
            <span className={styles.data}>{member.email}</span>
          </li>
          <li>
            <span className={styles.label}>이름</span>
            <span className={styles.data}>{member.name}</span>
          </li>
          <li>
            <span className={styles.label}>닉네임</span>
            <div className={styles.nick}>
              <input type="text" name="nickname" value={newNickName} readOnly />
              <button
                type="button"
                className={styles.randomBtn}
                onClick={handleRandomNickName}
              >
                <LiaRandomSolid />
              </button>
            </div>
          </li>
        </ul>
        <div className={styles.btns}>
          <button type="submit">
            <span>수정완료</span>
          </button>
          <button className={styles.cancel} type="button" onClick={cancelEdit}>
            <span>취소</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default MemberListEdit;
