import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FileInput from '../../../components/form/file-input/FileInput';
import TextInput from '../../../components/form/text-input/TextInput';
import { useComponentContext } from '../../../context/ComponentContext';
import { updateUserInfo } from '../../../store/user/UserSlice';
import styles from './InfoEdit.module.scss';

function InfoEdit() {
  const { setCurrComp } = useComponentContext();
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const initialData = [
    {
      label: '이메일',
      name: 'email',
      value: userInfo.email,
      isDisabled: true,
    },
    {
      label: '이름',
      name: 'name',
      value: userInfo.name,
      isDisabled: true,
    },
    {
      label: '닉네임',
      name: 'nickname',
      value: userInfo.nick,
      isDisabled: false,
    },
    {
      label: '연락처',
      name: 'number',
      value: userInfo.number,
      isDisabled: false,
    },
  ];

  const [values, setValues] = useState(userInfo);

  const dispatch = useDispatch();

  console.log('values: ', values);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeValues = (e) => {
    let { name, value } = e.target;

    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      collectionName: 'users',
      docId: userInfo.docId,
      updateObj: { ...values },
      photoUrl: values.photoUrl,
    };

    dispatch(updateUserInfo(params));
  };

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
        {initialData.map((data, idx) => (
          <TextInput
            key={idx}
            name={data.name}
            value={data.value}
            label={data.label}
            isDisabled={data.isDisabled}
            onChange={handleChangeValues}
          />
        ))}
      </div>
      <button type="submit">수정</button>
      <button type="button" onClick={() => setCurrComp('IntroMyPage')}>
        취소
      </button>
    </form>
  );
}

export default InfoEdit;
