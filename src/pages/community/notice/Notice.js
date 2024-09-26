import React from 'react';
import { Outlet } from 'react-router-dom';
import Board from '../../../components/board/Board';
import styles from '../community.module.scss';

function Notice() {
  return (
    <div>
      <h2 className={styles.community}>공지사항</h2>
      <p>- 게시판 규칙, 업데이트 소식 등을 안내해드립니다.</p>
      <div>
        <Board category={'notice'} nopost={false} complain={false} />
        <Outlet />
      </div>
    </div>
  );
}

export default Notice;
