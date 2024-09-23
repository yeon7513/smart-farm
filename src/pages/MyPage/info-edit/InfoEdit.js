import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FileInput from '../../../components/form/file-input/FileInput';
import { updateUserInfo } from '../../../store/user/UserSlice';
import styles from './InfoEdit.module.scss';

function InfoEdit() {
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const [values, setValues] = useState(userInfo);

  const dispatch = useDispatch();

  console.log(userInfo);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
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
          initialPreview={userInfo.photoUrl}
          setFile={handleChange}
          name="photoUrl"
          value={values.photoUrl}
        />
      </div>
    </form>
  );
}

export default InfoEdit;
