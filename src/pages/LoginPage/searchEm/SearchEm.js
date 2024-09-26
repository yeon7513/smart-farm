import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../../components/form/Form';
import Container from '../../../components/layout/container/Container';
import { fetchItems } from '../../../store/user/UserSlice';
import styles from './SearchEm.module.scss';

function SearchEm(props) {
  const [state, setState] = useState([new Set()]);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.userSlice);
  useEffect(() => {
    dispatch(fetchItems({ collectionName: 'users' }));
  }, [dispatch]);

  const handleInputNum = async (name, password) => {
    const resultData = items.filter((item) => {
      return item.name === name && item.password === password;
    });
    resultData.forEach((item) => {
      setState(item);
    });
  };
  return (
    <Container className={styles.container}>
      <div className={styles.title}>
        <h1>이메일 찾기</h1>
        <h3>
          소셜(Google, Kakao)이 아닌 <span>일반 회원가입</span>만 가능합니다.
        </h3>
      </div>
      <Form
        getDataForm={handleInputNum}
        title={'이메일 찾기'}
        inputName1={'이름'}
        inputName2={'비밀번호 입력'}
        type={'text'}
        type2={'password'}
      />
      <TextField
        className={styles.answer}
        disabled
        label={`회원님의 email은 : ${
          state.email === undefined ? 'email' : state.email
        } 입니다.`}
      />
    </Container>
  );
}

export default SearchEm;
