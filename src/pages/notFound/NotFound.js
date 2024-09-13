import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <h1>404 Error Not Found.....</h1>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <button onClick={() => navigate('/')}>메인 페이지로 이동</button>
    </div>
  );
}

export default NotFound;
