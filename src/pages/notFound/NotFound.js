import React from 'react';
import { BiCommentError } from 'react-icons/bi';
import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1>
          <span className={styles.icon}>
            <TbError404 />
          </span>
          <span className={styles.error}>Error...</span>
        </h1>
        <div className={styles.desc}>
          <span className={styles.icon}>
            <BiCommentError />
          </span>
          <p>페이지를 찾을 수 없습니다.</p>
        </div>
      </div>
      <div className={styles.btns}>
        <button onClick={() => navigate(-1)}>뒤로 가기</button>
        <span>|</span>
        <button onClick={() => navigate('/')}>메인 페이지로 이동</button>
      </div>
    </div>
  );
}

export default NotFound;
